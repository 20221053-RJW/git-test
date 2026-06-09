/**
 * Compaction Agent — 사용자·팀 AI 컨텍스트 증분 압축 (Gemini 또는 휴리스틱)
 */
import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { compactGeminiEnabled, readGeminiApiKey, readGeminiModelId } from "./gemini-env.ts";
import { tryReserveGeminiCall } from "./gemini-budget.ts";

const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";
const COMPACT_VERSION = 1;

export type AnalyzedSources = {
  troubleshooting_log_ids?: string[];
  feedback_team_ids?: string[];
  retrospective_team_ids?: string[];
  peer_review_submitted_ids?: string[];
  peer_review_received_ids?: string[];
  professor_eval_team_ids?: string[];
  deliverable_ids?: string[];
  course_context_keys?: string[];
};

export type AnalyzedActivityIds = {
  meeting_deliverable_ids?: string[];
  feedback_ids?: string[];
  troubleshooting_log_ids?: string[];
  chat_fingerprint?: string;
};

export type UserCompactResponse = {
  user_id: string;
  context_markdown: string;
  report_excerpt: string;
  model: string;
  updated_at: string;
  had_delta: boolean;
};

export type TeamCompactResponse = {
  team_id: string;
  workspace_excerpt: string;
  model: string;
  updated_at: string;
  had_delta: boolean;
};

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function parseSources(value: unknown): AnalyzedSources {
  if (!value || typeof value !== "object") return {};
  const r = value as Record<string, unknown>;
  return {
    troubleshooting_log_ids: asStringArray(r.troubleshooting_log_ids),
    feedback_team_ids: asStringArray(r.feedback_team_ids),
    retrospective_team_ids: asStringArray(r.retrospective_team_ids),
    peer_review_submitted_ids: asStringArray(r.peer_review_submitted_ids),
    peer_review_received_ids: asStringArray(r.peer_review_received_ids),
    professor_eval_team_ids: asStringArray(r.professor_eval_team_ids),
    deliverable_ids: asStringArray(r.deliverable_ids),
    course_context_keys: asStringArray(r.course_context_keys),
  };
}

function parseActivityIds(value: unknown): AnalyzedActivityIds {
  if (!value || typeof value !== "object") return {};
  const r = value as Record<string, unknown>;
  return {
    meeting_deliverable_ids: asStringArray(r.meeting_deliverable_ids),
    feedback_ids: asStringArray(r.feedback_ids),
    troubleshooting_log_ids: asStringArray(r.troubleshooting_log_ids),
    chat_fingerprint: typeof r.chat_fingerprint === "string" ? r.chat_fingerprint : undefined,
  };
}

function isMissingRelationError(error: { code?: string; message?: string }) {
  const message = error?.message ?? "";
  return (
    error?.code === "42P01" ||
    error?.code === "PGRST205" ||
    message.includes("does not exist") ||
    message.includes("Could not find the table")
  );
}

function truncateText(text: string, max: number): string {
  const t = text.trim();
  if (!t) return "";
  return t.length > max ? `${t.slice(0, max)}…` : t;
}

function idSet(ids: string[] | undefined): Set<string> {
  return new Set((ids ?? []).filter(Boolean));
}

function parseMeetingSummaries(description: string | null | undefined): string[] {
  if (!description?.trim()) return [];
  const lines = description.split("\n");
  const out: string[] = [];
  for (const line of lines) {
    const m = line.match(/^회의요약::([^:]+)::(.+)$/);
    if (m?.[2]?.trim()) out.push(truncateText(m[2].trim(), 200));
  }
  return out;
}

function isLowQualityExcerpt(text: string): boolean {
  const t = text.trim();
  if (t.length < 40) return true;
  if (/^\d+[\.\)]\s/m.test(t) && t.split("\n").length >= 3) return true;
  if (/^(트러블슈팅|산출물|피드백|회고)\s*\d+건/.test(t) && t.length < 120) return true;
  return false;
}

function mergeUniqueIds(existing: string[] | undefined, added: string[]): string[] {
  return Array.from(new Set([...(existing ?? []), ...added]));
}

// ─── User compaction ───────────────────────────────────────────────

async function loadUserContextRow(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("ai_user_ai_context")
    .select("context_markdown, report_excerpt, analyzed_sources, updated_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (error && !isMissingRelationError(error)) throw error;
  return data;
}

async function gatherUserDelta(
  supabase: SupabaseClient,
  userId: string,
  sources: AnalyzedSources
): Promise<{ deltaLines: string[]; nextSources: AnalyzedSources; hasNew: boolean }> {
  const knownLogs = idSet(sources.troubleshooting_log_ids);
  const knownFeedback = idSet(sources.feedback_team_ids);
  const knownRetro = idSet(sources.retrospective_team_ids);
  const knownPeerSub = idSet(sources.peer_review_submitted_ids);
  const knownPeerRecv = idSet(sources.peer_review_received_ids);
  const knownProf = idSet(sources.professor_eval_team_ids);
  const knownDeliverables = idSet(sources.deliverable_ids);
  const knownCourseKeys = idSet(sources.course_context_keys);

  const { data: memberships } = await supabase
    .from("ai_team_members")
    .select("team_id, role")
    .eq("user_id", userId);

  const teamIds = Array.from(
    new Set((memberships ?? []).map((m) => m.team_id).filter(Boolean))
  ) as string[];

  const deltaLines: string[] = [];
  const nextSources: AnalyzedSources = { ...sources };
  let hasNew = false;

  if (teamIds.length === 0) {
    return { deltaLines, nextSources, hasNew: false };
  }

  const roleByTeam = new Map(
    (memberships ?? []).map((m) => [m.team_id as string, (m.role as string) ?? "팀원"])
  );

  const [
    teamsResult,
    logsResult,
    feedbacksResult,
    retrosResult,
    peerSubResult,
    peerRecvResult,
    profResult,
    deliverablesResult,
  ] = await Promise.all([
    supabase.from("ai_teams").select("id, name, project_title, course_id").in("id", teamIds),
    supabase
      .from("ai_team_detail_troubleshooting_logs")
      .select("id, team_id, problem, plan, solution, status")
      .eq("author_user_id", userId)
      .in("team_id", teamIds),
    supabase
      .from("ai_team_detail_feedbacks")
      .select("team_id, selected_options, custom_text")
      .eq("author_user_id", userId)
      .in("team_id", teamIds),
    supabase
      .from("ai_team_detail_retrospectives")
      .select("team_id, sections")
      .eq("author_user_id", userId)
      .in("team_id", teamIds),
    supabase
      .from("ai_team_detail_peer_reviews")
      .select("id, team_id, good_keywords, bad_keywords, comment")
      .eq("reviewer_user_id", userId)
      .in("team_id", teamIds),
    supabase
      .from("ai_team_detail_peer_reviews")
      .select("id, team_id, good_keywords, bad_keywords, comment")
      .eq("teammate_id", userId)
      .in("team_id", teamIds),
    supabase
      .from("ai_team_detail_professor_student_evals")
      .select("team_id, comment")
      .eq("student_row_id", userId)
      .in("team_id", teamIds),
    supabase
      .from("ai_team_deliverables")
      .select("id, team_id, file_name")
      .in("team_id", teamIds)
      .eq("uploaded_by_user_id", userId),
  ]);

  const teamById = new Map((teamsResult.data ?? []).map((t) => [t.id as string, t]));

  for (const log of logsResult.data ?? []) {
    const id = log.id as string;
    if (knownLogs.has(id)) continue;
    hasNew = true;
    const team = teamById.get(log.team_id as string);
    const title = (team?.project_title ?? team?.name ?? "프로젝트") as string;
    const problem = truncateText(String(log.problem ?? ""), 120);
    const plan = truncateText(String(log.plan ?? ""), 80);
    const solution = truncateText(String(log.solution ?? ""), 80);
    deltaLines.push(
      `[${title}] 트러블슈팅: ${problem}${plan ? ` — 대응: ${plan}` : ""}${solution ? ` — 결과: ${solution}` : ""}`
    );
    nextSources.troubleshooting_log_ids = mergeUniqueIds(nextSources.troubleshooting_log_ids, [id]);
  }

  for (const row of feedbacksResult.error ? [] : (feedbacksResult.data ?? [])) {
    const tid = row.team_id as string;
    if (knownFeedback.has(tid)) continue;
    hasNew = true;
    const team = teamById.get(tid);
    const options = asStringArray(row.selected_options);
    const custom = String(row.custom_text ?? "").trim();
    const snippet = truncateText([...options, custom].filter(Boolean).join(", "), 120);
    if (snippet) {
      deltaLines.push(`[${team?.project_title ?? "팀"}] 팀 피드백: ${snippet}`);
    }
    nextSources.feedback_team_ids = mergeUniqueIds(nextSources.feedback_team_ids, [tid]);
  }

  for (const row of retrosResult.error ? [] : (retrosResult.data ?? [])) {
    const tid = row.team_id as string;
    if (knownRetro.has(tid)) continue;
    hasNew = true;
    const team = teamById.get(tid);
    const sections = row.sections;
    let snippet = "";
    if (sections && typeof sections === "object") {
      const parts: string[] = [];
      for (const key of ["role", "strengths", "regrets", "growth"]) {
        const sec = (sections as Record<string, unknown>)[key];
        if (sec && typeof sec === "object") {
          const c = sec as Record<string, unknown>;
          const text = String(c.custom ?? c.auto ?? "").trim();
          if (text) parts.push(text);
        }
      }
      snippet = truncateText(parts.join(" · "), 200);
    }
    if (snippet) {
      deltaLines.push(`[${team?.project_title ?? "팀"}] 회고: ${snippet}`);
    }
    nextSources.retrospective_team_ids = mergeUniqueIds(nextSources.retrospective_team_ids, [tid]);
  }

  for (const row of peerSubResult.error ? [] : (peerSubResult.data ?? [])) {
    const id = row.id as string;
    if (knownPeerSub.has(id)) continue;
    hasNew = true;
    const team = teamById.get(row.team_id as string);
    const good = asStringArray(row.good_keywords);
    const bad = asStringArray(row.bad_keywords);
    const comment = String(row.comment ?? "").trim();
    const parts = [
      good.length ? `강점:${good.join("/")}` : "",
      bad.length ? `보완:${bad.join("/")}` : "",
      comment,
    ].filter(Boolean);
    if (parts.length) {
      deltaLines.push(`[${team?.project_title ?? "팀"}] 동료평가(제출): ${truncateText(parts.join(" · "), 150)}`);
    }
    nextSources.peer_review_submitted_ids = mergeUniqueIds(nextSources.peer_review_submitted_ids, [id]);
  }

  for (const row of peerRecvResult.error ? [] : (peerRecvResult.data ?? [])) {
    const id = row.id as string;
    if (knownPeerRecv.has(id)) continue;
    hasNew = true;
    const team = teamById.get(row.team_id as string);
    const good = asStringArray(row.good_keywords);
    const comment = String(row.comment ?? "").trim();
    const parts = [good.length ? `받은 강점:${good.join("/")}` : "", comment].filter(Boolean);
    if (parts.length) {
      deltaLines.push(`[${team?.project_title ?? "팀"}] 동료평가(수신): ${truncateText(parts.join(" · "), 150)}`);
    }
    nextSources.peer_review_received_ids = mergeUniqueIds(nextSources.peer_review_received_ids, [id]);
  }

  for (const row of profResult.error ? [] : (profResult.data ?? [])) {
    const tid = row.team_id as string;
    if (knownProf.has(tid)) continue;
    const comment = String(row.comment ?? "").trim();
    if (!comment) continue;
    hasNew = true;
    const team = teamById.get(tid);
    deltaLines.push(`[${team?.project_title ?? "팀"}] 교수 평가: ${truncateText(comment, 200)}`);
    nextSources.professor_eval_team_ids = mergeUniqueIds(nextSources.professor_eval_team_ids, [tid]);
  }

  for (const row of deliverablesResult.error ? [] : (deliverablesResult.data ?? [])) {
    const id = row.id as string;
    if (knownDeliverables.has(id)) continue;
    hasNew = true;
    const team = teamById.get(row.team_id as string);
    const name = String(row.file_name ?? "").trim();
    if (name) {
      deltaLines.push(`[${team?.project_title ?? "팀"}] 산출물 업로드: ${name}`);
    }
    nextSources.deliverable_ids = mergeUniqueIds(nextSources.deliverable_ids, [id]);
  }

  // 수업 맥락 (Phase 4 — syllabus·공지 메타만)
  const courseIds = Array.from(
    new Set((teamsResult.data ?? []).map((t) => t.course_id).filter(Boolean))
  ) as string[];

  if (courseIds.length > 0) {
    const [coursesResult, announcementsResult, syllabiResult] = await Promise.all([
      supabase.from("ai_courses").select("id, name").in("id", courseIds),
      supabase
        .from("ai_announcements")
        .select("id, course_id, title, created_at")
        .in("course_id", courseIds)
        .order("created_at", { ascending: false })
        .limit(20),
      supabase
        .from("ai_course_syllabi")
        .select("course_id, title, updated_at")
        .in("course_id", courseIds),
    ]);

    for (const course of coursesResult.data ?? []) {
      const key = `course:${course.id}`;
      if (knownCourseKeys.has(key)) continue;
      hasNew = true;
      const roleTeams = teamIds
        .filter((tid) => {
          const t = teamById.get(tid);
          return t?.course_id === course.id;
        })
        .map((tid) => roleByTeam.get(tid) ?? "팀원");
      const roles = Array.from(new Set(roleTeams)).join(", ");
      deltaLines.push(`[${course.name}] 수업 참여 — 역할: ${roles || "팀원"}`);
      nextSources.course_context_keys = mergeUniqueIds(nextSources.course_context_keys, [key]);
    }

    for (const ann of announcementsResult.error ? [] : (announcementsResult.data ?? [])) {
      const key = `announcement:${ann.id}`;
      if (knownCourseKeys.has(key)) continue;
      hasNew = true;
      const course = (coursesResult.data ?? []).find((c) => c.id === ann.course_id);
      const title = truncateText(String(ann.title ?? ""), 80);
      if (title) {
        deltaLines.push(`[${course?.name ?? "수업"}] 공지: ${title}`);
      }
      nextSources.course_context_keys = mergeUniqueIds(nextSources.course_context_keys, [key]);
    }

    for (const syl of syllabiResult.error ? [] : (syllabiResult.data ?? [])) {
      const key = `syllabus:${syl.course_id}:${syl.updated_at ?? ""}`;
      if (knownCourseKeys.has(key)) continue;
      hasNew = true;
      const course = (coursesResult.data ?? []).find((c) => c.id === syl.course_id);
      const title = truncateText(String(syl.title ?? ""), 80);
      if (title) {
        deltaLines.push(`[${course?.name ?? "수업"}] 강의계획서: ${title}`);
      }
      nextSources.course_context_keys = mergeUniqueIds(nextSources.course_context_keys, [key]);
    }
  }

  // 첫 압축: 기존 소스 커서가 비어 있으면 팀 참여 요약을 delta로
  const noPrior =
    !sources.troubleshooting_log_ids?.length &&
    !sources.feedback_team_ids?.length &&
    !sources.retrospective_team_ids?.length;

  if (noPrior && teamIds.length > 0 && deltaLines.length === 0) {
    hasNew = true;
    for (const tid of teamIds) {
      const team = teamById.get(tid);
      if (!team) continue;
      deltaLines.push(
        `[${team.project_title ?? team.name}] ${roleByTeam.get(tid) ?? "팀원"} — 팀 프로젝트 참여`
      );
    }
  }

  return { deltaLines, nextSources, hasNew };
}

function buildHeuristicUserCompact(
  userName: string,
  existingMarkdown: string,
  existingExcerpt: string,
  deltaLines: string[],
  teamCount: number
): { context_markdown: string; report_excerpt: string } {
  const deltaBlock = deltaLines.length > 0 ? deltaLines.join("\n") : "";
  const statsLine =
    teamCount > 0
      ? `${userName}님은 ${teamCount}개 팀 프로젝트에 참여하며 협업·문제해결 활동을 기록했습니다.`
      : `${userName}님의 팀 활동 기록이 아직 없습니다.`;

  const growthSection = deltaBlock
    ? `## 협업·피드백\n${truncateText(deltaBlock, 1500)}`
    : "";

  const sections = [
    existingMarkdown.trim() || `## 성장 서사\n${statsLine}`,
    growthSection,
    deltaBlock ? `## 정성평가 핵심\n${truncateText(deltaBlock, 600)}` : "",
  ].filter(Boolean);

  const context_markdown = sections.join("\n\n").trim();
  const synthesized = deltaBlock
    ? `${statsLine} ${truncateText(deltaBlock.replace(/\n/g, " "), 500)}`
    : statsLine;

  const report_excerpt =
    !isLowQualityExcerpt(existingExcerpt) && !deltaBlock
      ? existingExcerpt
      : truncateText(synthesized, 1000);

  return { context_markdown, report_excerpt };
}

async function callGeminiUserCompact(
  apiKey: string,
  modelId: string,
  locale: "ko" | "en",
  userName: string,
  existingMarkdown: string,
  deltaText: string
): Promise<{ context_markdown: string; report_excerpt: string }> {
  const lang = locale === "en" ? "English" : "Korean";
  const systemPrompt = `You compress student activity into structured markdown for portfolio evaluation. Respond in ${lang}. Return ONLY valid JSON:
{"context_markdown": string, "report_excerpt": string}

context_markdown MUST use these sections (omit empty):
## 성장 서사
## 기술·역량 신호
## 문제해결 패턴
## 협업·피드백
## 교수 관점
## 정성평가 핵심

report_excerpt: 1-2 complete sentences (800-1200 chars max) for MyPage summary — synthesize, do NOT copy bullet lists or file names verbatim.
Use ONLY provided data. No invented facts.`;

  const userPayload = JSON.stringify({
    student_name: userName,
    existing_memory: truncateText(existingMarkdown, 3000),
    new_delta: truncateText(deltaText, 2000),
  });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelId)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: userPayload }] }],
      generationConfig: { temperature: 0.3, responseMimeType: "application/json" },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini compact error (${response.status}): ${errText.slice(0, 200)}`);
  }

  const completion = await response.json();
  const content = completion?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content || typeof content !== "string") {
    throw new Error("Gemini compact 응답이 비어 있습니다.");
  }

  const parsed = JSON.parse(content) as { context_markdown?: string; report_excerpt?: string };
  const context_markdown = String(parsed.context_markdown ?? "").trim();
  const report_excerpt = String(parsed.report_excerpt ?? "").trim();

  if (!context_markdown || isLowQualityExcerpt(report_excerpt)) {
    throw new Error("Gemini compact 품질 게이트 실패");
  }

  return { context_markdown, report_excerpt };
}

export async function compactUserContext(
  supabase: SupabaseClient,
  userId: string,
  locale: "ko" | "en" = "ko"
): Promise<UserCompactResponse> {
  const { data: user, error: userError } = await supabase
    .from("ai_users")
    .select("id, name")
    .eq("id", userId)
    .maybeSingle();
  if (userError) throw userError;
  if (!user) throw new Error("사용자를 찾을 수 없습니다.");

  const existing = await loadUserContextRow(supabase, userId);
  const sources = parseSources(existing?.analyzed_sources);
  const { deltaLines, nextSources, hasNew } = await gatherUserDelta(supabase, userId, sources);

  const { count: teamCount } = await supabase
    .from("ai_team_members")
    .select("team_id", { count: "exact", head: true })
    .eq("user_id", userId);

  const userName = String(user.name ?? "학생");
  const existingMarkdown = String(existing?.context_markdown ?? "");
  const existingExcerpt = String(existing?.report_excerpt ?? "");
  const deltaText = deltaLines.join("\n");

  let context_markdown: string;
  let report_excerpt: string;
  let model = "heuristic-compact";

  const geminiKey = readGeminiApiKey();
  if (geminiKey && compactGeminiEnabled() && (hasNew || !existing?.report_excerpt)) {
    const budget = await tryReserveGeminiCall(supabase);
    if (budget.allowed) {
      try {
        const modelId = readGeminiModelId(DEFAULT_GEMINI_MODEL);
        const merged = await callGeminiUserCompact(
          geminiKey,
          modelId,
          locale,
          userName,
          existingMarkdown,
          deltaText || existingMarkdown
        );
        context_markdown = merged.context_markdown;
        report_excerpt = merged.report_excerpt;
        model = modelId;
      } catch (geminiErr) {
        console.warn("[compact-user]", geminiErr);
        const heuristic = buildHeuristicUserCompact(
          userName,
          existingMarkdown,
          existingExcerpt,
          deltaLines,
          teamCount ?? 0
        );
        context_markdown = heuristic.context_markdown;
        report_excerpt = heuristic.report_excerpt;
        model = "heuristic-compact-fallback";
      }
    } else {
      const heuristic = buildHeuristicUserCompact(
        userName,
        existingMarkdown,
        existingExcerpt,
        deltaLines,
        teamCount ?? 0
      );
      context_markdown = heuristic.context_markdown;
      report_excerpt = heuristic.report_excerpt;
      model = "heuristic-compact-budget";
    }
  } else {
    const heuristic = buildHeuristicUserCompact(
      userName,
      existingMarkdown,
      existingExcerpt,
      deltaLines,
      teamCount ?? 0
    );
    context_markdown = heuristic.context_markdown;
    report_excerpt = heuristic.report_excerpt;
  }

  const now = new Date().toISOString();
  const { error: upsertError } = await supabase.from("ai_user_ai_context").upsert(
    {
      user_id: userId,
      context_markdown,
      report_excerpt,
      analyzed_sources: nextSources,
      last_compact_model: model,
      compact_version: COMPACT_VERSION,
      updated_at: now,
    },
    { onConflict: "user_id" }
  );
  if (upsertError && !isMissingRelationError(upsertError)) throw upsertError;

  return {
    user_id: userId,
    context_markdown,
    report_excerpt,
    model,
    updated_at: now,
    had_delta: hasNew,
  };
}

// ─── Team compaction ───────────────────────────────────────────────

async function gatherTeamActivityDelta(
  supabase: SupabaseClient,
  teamId: string,
  activityIds: AnalyzedActivityIds
): Promise<{ deltaLines: string[]; nextActivityIds: AnalyzedActivityIds; hasNew: boolean }> {
  const knownMeetings = idSet(activityIds.meeting_deliverable_ids);
  const knownFeedback = idSet(activityIds.feedback_ids);
  const knownLogs = idSet(activityIds.troubleshooting_log_ids);

  const deltaLines: string[] = [];
  const nextActivityIds: AnalyzedActivityIds = { ...activityIds };
  let hasNew = false;

  const [deliverablesResult, feedbackResult, logsResult, chatResult] = await Promise.all([
    supabase
      .from("ai_team_deliverables")
      .select("id, file_name, description")
      .eq("team_id", teamId),
    supabase.from("ai_team_detail_feedbacks").select("id, selected_options, custom_text").eq("team_id", teamId),
    supabase
      .from("ai_team_detail_troubleshooting_logs")
      .select("id, problem, status")
      .eq("team_id", teamId)
      .order("sort_order", { ascending: true }),
    supabase
      .from("ai_team_detail_chat_messages")
      .select("text, sender")
      .eq("team_id", teamId)
      .order("sort_order", { ascending: false })
      .limit(8),
  ]);

  for (const row of deliverablesResult.data ?? []) {
    const id = row.id as string;
    const summaries = parseMeetingSummaries(row.description as string | null);
    if (summaries.length === 0) continue;
    if (knownMeetings.has(id)) continue;
    hasNew = true;
    for (const s of summaries.slice(0, 2)) {
      deltaLines.push(`회의: ${s}`);
    }
    nextActivityIds.meeting_deliverable_ids = mergeUniqueIds(nextActivityIds.meeting_deliverable_ids, [id]);
  }

  for (const row of feedbackResult.error ? [] : (feedbackResult.data ?? [])) {
    const id = row.id as string;
    if (knownFeedback.has(id)) continue;
    hasNew = true;
    const options = asStringArray(row.selected_options);
    const custom = String(row.custom_text ?? "").trim();
    const snippet = truncateText([...options, custom].filter(Boolean).join(", "), 120);
    if (snippet) deltaLines.push(`팀 피드백: ${snippet}`);
    nextActivityIds.feedback_ids = mergeUniqueIds(nextActivityIds.feedback_ids, [id]);
  }

  for (const log of logsResult.error ? [] : (logsResult.data ?? [])) {
    const id = log.id as string;
    if (knownLogs.has(id)) continue;
    hasNew = true;
    const problem = truncateText(String(log.problem ?? ""), 100);
    const status = String(log.status ?? "");
    if (problem) {
      deltaLines.push(`트러블슈팅(${status}): ${problem}`);
    }
    nextActivityIds.troubleshooting_log_ids = mergeUniqueIds(nextActivityIds.troubleshooting_log_ids, [id]);
  }

  const chatRows = chatResult.error ? [] : (chatResult.data ?? []);
  const chatFingerprint = chatRows
    .map((m) => truncateText(`${m.sender}:${m.text}`, 60))
    .join("|");
  if (chatFingerprint && chatFingerprint !== activityIds.chat_fingerprint) {
    hasNew = true;
    const snippets = chatRows
      .slice(0, 3)
      .map((m) => truncateText(`${m.sender}: ${m.text}`, 80))
      .filter(Boolean);
    if (snippets.length) {
      deltaLines.push(`팀 채팅: ${snippets.join(" / ")}`);
    }
    nextActivityIds.chat_fingerprint = chatFingerprint;
  }

  return { deltaLines, nextActivityIds, hasNew };
}

function buildHeuristicTeamWorkspace(
  teamName: string,
  existingExcerpt: string,
  existingMarkdown: string,
  deltaLines: string[]
): { workspace_excerpt: string; memory_patch: string } {
  const delta = deltaLines.join(" ");
  const summaryMatch = existingMarkdown.match(/##\s*요약\s*\n([\s\S]*?)(?=\n##|\s*$)/);
  const priorSummary = summaryMatch?.[1]?.trim() ?? existingExcerpt;

  const workspace_excerpt = truncateText(
    delta
      ? `${priorSummary ? `${priorSummary} ` : ""}${truncateText(delta, 400)}`
      : priorSummary || `${teamName} 팀 워크스페이스 활동이 기록되어 있습니다.`,
    500
  );

  const memory_patch =
    deltaLines.length > 0
      ? `## 회의·의사결정\n${deltaLines.filter((l) => l.startsWith("회의:")).join("\n") || "(신규 회의 요약 없음)"}\n\n## 팀워크·역할\n${deltaLines.filter((l) => !l.startsWith("회의:")).join("\n") || "(활동 갱신)"}`
      : "";

  return { workspace_excerpt, memory_patch };
}

async function callGeminiTeamCompact(
  apiKey: string,
  modelId: string,
  locale: "ko" | "en",
  teamName: string,
  existingMarkdown: string,
  existingExcerpt: string,
  deltaText: string
): Promise<{ workspace_excerpt: string; memory_patch: string }> {
  const lang = locale === "en" ? "English" : "Korean";
  const systemPrompt = `You compress team workspace activity. Respond in ${lang}. Return ONLY valid JSON:
{"workspace_excerpt": string, "memory_patch": string}

workspace_excerpt: 2-3 sentences for team UI (max 500 chars).
memory_patch: markdown with sections ## 회의·의사결정 and ## 팀워크·역할 only.
Synthesize — do not copy raw lists. Use ONLY provided data.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelId)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: JSON.stringify({
                team_name: teamName,
                existing_memory: truncateText(existingMarkdown, 3000),
                existing_excerpt: truncateText(existingExcerpt, 500),
                new_delta: truncateText(deltaText, 2000),
              }),
            },
          ],
        },
      ],
      generationConfig: { temperature: 0.3, responseMimeType: "application/json" },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini team compact error (${response.status}): ${errText.slice(0, 200)}`);
  }

  const completion = await response.json();
  const content = completion?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content || typeof content !== "string") {
    throw new Error("Gemini team compact 응답이 비어 있습니다.");
  }

  const parsed = JSON.parse(content) as { workspace_excerpt?: string; memory_patch?: string };
  const workspace_excerpt = String(parsed.workspace_excerpt ?? "").trim();
  const memory_patch = String(parsed.memory_patch ?? "").trim();

  if (!workspace_excerpt || workspace_excerpt.length < 30) {
    throw new Error("Gemini team compact 품질 게이트 실패");
  }

  return { workspace_excerpt, memory_patch };
}

function mergeMemorySections(existing: string, patch: string): string {
  if (!patch.trim()) return existing;
  if (!existing.trim()) return patch.trim();

  const sectionsToReplace = ["회의·의사결정", "팀워크·역할", "통합 워크스페이스 요약"];
  let result = existing;
  for (const heading of sectionsToReplace) {
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`##\\s*${escaped}\\s*\\n[\\s\\S]*?(?=\\n##\\s|$)`, "i");
    result = result.replace(re, "").trim();
  }

  const patchSections = patch.match(/##\s*[^\n]+\n[\s\S]*/g) ?? [];
  return `${result}\n\n${patchSections.join("\n\n")}`.trim();
}

export async function compactTeamContext(
  supabase: SupabaseClient,
  teamId: string,
  locale: "ko" | "en" = "ko"
): Promise<TeamCompactResponse> {
  const { data: team, error: teamError } = await supabase
    .from("ai_teams")
    .select("id, name")
    .eq("id", teamId)
    .maybeSingle();
  if (teamError) throw teamError;
  if (!team) throw new Error("팀을 찾을 수 없습니다.");

  const { data: memoryRow, error: memError } = await supabase
    .from("ai_team_detail_ai_memory")
    .select("memory_markdown, workspace_excerpt, analyzed_activity_ids, analyzed_deliverable_ids")
    .eq("team_id", teamId)
    .maybeSingle();
  if (memError && !isMissingRelationError(memError)) throw memError;

  const activityIds = parseActivityIds(memoryRow?.analyzed_activity_ids);
  const { deltaLines, nextActivityIds, hasNew } = await gatherTeamActivityDelta(
    supabase,
    teamId,
    activityIds
  );

  const teamName = String(team.name ?? "팀");
  const existingMarkdown = String(memoryRow?.memory_markdown ?? "");
  const existingExcerpt = String(memoryRow?.workspace_excerpt ?? "");
  const deltaText = deltaLines.join("\n");

  let workspace_excerpt: string;
  let memory_patch: string;
  let model = "heuristic-compact";

  const geminiKey = readGeminiApiKey();
  if (geminiKey && compactGeminiEnabled() && (hasNew || !existingExcerpt)) {
    const budget = await tryReserveGeminiCall(supabase);
    if (budget.allowed) {
      try {
        const modelId = readGeminiModelId(DEFAULT_GEMINI_MODEL);
        const merged = await callGeminiTeamCompact(
          geminiKey,
          modelId,
          locale,
          teamName,
          existingMarkdown,
          existingExcerpt,
          deltaText || existingMarkdown
        );
        workspace_excerpt = merged.workspace_excerpt;
        memory_patch = merged.memory_patch;
        model = modelId;
      } catch (geminiErr) {
        console.warn("[compact-team]", geminiErr);
        const heuristic = buildHeuristicTeamWorkspace(
          teamName,
          existingExcerpt,
          existingMarkdown,
          deltaLines
        );
        workspace_excerpt = heuristic.workspace_excerpt;
        memory_patch = heuristic.memory_patch;
        model = "heuristic-compact-fallback";
      }
    } else {
      const heuristic = buildHeuristicTeamWorkspace(
        teamName,
        existingExcerpt,
        existingMarkdown,
        deltaLines
      );
      workspace_excerpt = heuristic.workspace_excerpt;
      memory_patch = heuristic.memory_patch;
      model = "heuristic-compact-budget";
    }
  } else {
    const heuristic = buildHeuristicTeamWorkspace(
      teamName,
      existingExcerpt,
      existingMarkdown,
      deltaLines
    );
    workspace_excerpt = heuristic.workspace_excerpt;
    memory_patch = heuristic.memory_patch;
  }

  const memory_markdown = mergeMemorySections(existingMarkdown, memory_patch);
  const now = new Date().toISOString();

  const upsertPayload: Record<string, unknown> = {
    team_id: teamId,
    memory_markdown: memory_markdown || "",
    workspace_excerpt,
    analyzed_activity_ids: nextActivityIds,
    analyzed_deliverable_ids: Array.isArray(memoryRow?.analyzed_deliverable_ids)
      ? memoryRow.analyzed_deliverable_ids
      : [],
    last_insight_summary: workspace_excerpt,
    compact_version: COMPACT_VERSION,
    updated_at: now,
  };

  const { error: upsertError } = await supabase
    .from("ai_team_detail_ai_memory")
    .upsert(upsertPayload, { onConflict: "team_id" });
  if (upsertError && !isMissingRelationError(upsertError)) throw upsertError;

  return {
    team_id: teamId,
    workspace_excerpt,
    model,
    updated_at: now,
    had_delta: hasNew,
  };
}
