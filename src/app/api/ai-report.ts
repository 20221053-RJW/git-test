import { auth } from "../firebase";
import { supabase } from "../supabase";
import type {
  AiReportContext,
  AiReportGenerateRequest,
  AiReportGenerateResponse,
  AiReportNotReadyError,
  AiReportTeamSnapshot,
  AiReportTroubleshootingCase,
} from "../types/ai-report";

const FUNCTION_NAME = "generate-report";

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

async function getAiUserById(userId: string) {
  const { data, error } = await supabase
    .from("ai_users")
    .select("id, name, email, major, skills, firebase_uid")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function assertCurrentUser(userId: string) {
  const firebaseUid = auth.currentUser?.uid;
  if (!firebaseUid) throw new Error("로그인이 필요합니다.");
  const user = await getAiUserById(userId);
  if (!user) throw new Error("사용자를 찾을 수 없습니다.");
  if (user.firebase_uid !== firebaseUid) {
    throw new Error("본인 리포트만 조회할 수 있습니다.");
  }
  return user;
}

/**
 * 팀·트러블슈팅·산출물 메타를 Supabase에서 집계 (LLM 없음).
 */
export async function gatherAiReportContext(userId: string): Promise<AiReportContext> {
  const user = await assertCurrentUser(userId);

  const { data: memberships, error: memError } = await supabase
    .from("ai_team_members")
    .select("team_id, role")
    .eq("user_id", userId);
  if (memError) throw memError;

  const teamIds = Array.from(
    new Set((memberships ?? []).map((m) => m.team_id).filter(Boolean))
  ) as string[];

  if (teamIds.length === 0) {
    return {
      userId,
      userName: user.name,
      email: user.email,
      major: user.major ?? undefined,
      skills: asArray<string>(user.skills),
      generatedAt: new Date().toISOString(),
      teams: [],
      troubleshootingCases: [],
      totalTroubleshootingLogs: 0,
      totalDeliverables: 0,
    };
  }

  const [teamsResult, logsResult, deliverablesResult] = await Promise.all([
    supabase
      .from("ai_teams")
      .select("id, name, project_title, progress, course_id")
      .in("id", teamIds),
    supabase
      .from("ai_team_detail_troubleshooting_logs")
      .select("id, team_id, problem, plan, solution, status, sort_order")
      .in("team_id", teamIds)
      .order("sort_order", { ascending: true }),
    supabase
      .from("ai_team_deliverables")
      .select("team_id")
      .in("team_id", teamIds),
  ]);

  if (teamsResult.error) throw teamsResult.error;
  if (logsResult.error) throw logsResult.error;
  if (deliverablesResult.error) throw deliverablesResult.error;

  const courseIds = Array.from(
    new Set((teamsResult.data ?? []).map((t) => t.course_id).filter(Boolean))
  ) as string[];

  let courseNameById = new Map<string, string>();
  if (courseIds.length > 0) {
    const { data: courses, error: courseError } = await supabase
      .from("ai_courses")
      .select("id, name")
      .in("id", courseIds);
    if (courseError) throw courseError;
    courseNameById = new Map((courses ?? []).map((c) => [c.id, c.name]));
  }

  const logs = logsResult.data ?? [];
  const deliverables = deliverablesResult.data ?? [];
  const roleByTeam = new Map(
    (memberships ?? []).map((m) => [m.team_id, m.role ?? "팀원"])
  );

  const teamRows = teamsResult.data ?? [];
  const teamById = new Map(teamRows.map((team) => [team.id, team]));

  const troubleshootingCases: AiReportTroubleshootingCase[] = logs
    .filter((log) => Boolean(log.problem?.trim()))
    .map((log) => {
      const team = teamById.get(log.team_id);
      const problem = log.problem.trim();
      const plan = log.plan?.trim();
      const solution = log.solution?.trim();
      const status = log.status ?? "in-progress";
      return {
        logId: log.id,
        teamId: log.team_id,
        teamName: team?.name ?? "팀",
        projectTitle: team?.project_title ?? team?.name ?? "프로젝트",
        courseName: team ? (courseNameById.get(team.course_id) ?? "수업") : "수업",
        title: problem.length > 48 ? `${problem.slice(0, 48)}…` : problem,
        problem,
        action: plan || "(대응 계획 미기록)",
        result:
          solution ||
          (status === "resolved" ? "해결 완료 (상세 미기록)" : "진행 중"),
        impact:
          status === "resolved"
            ? "해결 완료로 팀 기록에 반영됨"
            : "진행 중인 이슈로 팀 워크스페이스에서 추적 중",
        status,
      };
    })
    .slice(0, 8);

  const teams: AiReportTeamSnapshot[] = teamRows.map((team) => {
    const teamLogs = logs.filter((l) => l.team_id === team.id);
    const problems = teamLogs
      .map((l) => l.problem)
      .filter((p): p is string => Boolean(p))
      .slice(0, 3);

    return {
      teamId: team.id,
      teamName: team.name,
      projectTitle: team.project_title ?? team.name,
      courseName: courseNameById.get(team.course_id) ?? "수업",
      memberRole: roleByTeam.get(team.id) ?? "팀원",
      progress: team.progress ?? 0,
      troubleshootingCount: teamLogs.length,
      deliverableCount: deliverables.filter((d) => d.team_id === team.id).length,
      sampleProblems: problems,
    };
  });

  return {
    userId,
    userName: user.name,
    email: user.email,
    major: user.major ?? undefined,
    skills: asArray<string>(user.skills),
    generatedAt: new Date().toISOString(),
    teams,
    troubleshootingCases,
    totalTroubleshootingLogs: logs.length,
    totalDeliverables: deliverables.length,
  };
}

/** LLM 없이 DB 맥락만으로 A4용 초안 JSON 생성 */
export function buildDraftReportFromContext(
  context: AiReportContext
): AiReportGenerateResponse {
  const teamLines = context.teams.map(
    (t) =>
      `${t.courseName} · ${t.projectTitle} (${t.memberRole}, 진행 ${t.progress}%, 트러블슈팅 ${t.troubleshootingCount}건)`
  );

  const problems =
    context.troubleshootingCases.length > 0
      ? context.troubleshootingCases.map((c) => c.problem)
      : context.teams.flatMap((t) => t.sampleProblems).slice(0, 8);

  return {
    summary:
      context.teams.length > 0
        ? `${context.userName}님은 ${context.teams.length}개 팀 프로젝트에 참여했습니다. 트러블슈팅 ${context.totalTroubleshootingLogs}건, 산출물 ${context.totalDeliverables}건이 기록되어 있습니다.`
        : `${context.userName}님의 팀 활동 기록이 아직 없습니다. 팀에 배정된 뒤 다시 생성해 보세요.`,
    problems_solved:
      problems.length > 0
        ? problems
        : ["등록된 트러블슈팅 로그가 없습니다."],
    technologies:
      context.skills.length > 0 ? context.skills : ["(프로필에 기술 스택을 추가해 주세요)"],
    role_description:
      teamLines.length > 0
        ? teamLines.join("\n")
        : "참여한 팀 프로젝트가 없습니다.",
    growth_reflection:
      "본 초안은 DB 활동 데이터를 집계한 것입니다. OpenAI 연동 후 AI가 성장 회고 문단을 생성합니다.",
    sections: context.teams.map((t) => ({
      title: `${t.projectTitle}`,
      body: [
        `수업: ${t.courseName}`,
        `역할: ${t.memberRole}`,
        `트러블슈팅 ${t.troubleshootingCount}건 · 산출물 ${t.deliverableCount}건`,
        t.sampleProblems.length > 0
          ? `주요 이슈: ${t.sampleProblems.join(" / ")}`
          : "",
      ]
        .filter(Boolean)
        .join("\n"),
    })),
    generated_at: context.generatedAt,
    model: "draft-db-only",
  };
}

/**
 * POST /functions/v1/generate-report
 */
export async function generateAiReport(
  request: AiReportGenerateRequest
): Promise<AiReportGenerateResponse> {
  const { data, error } = await supabase.functions.invoke(FUNCTION_NAME, {
    body: request,
  });

  if (error) {
    const message = error.message ?? "AI 리포트 생성 요청에 실패했습니다.";
    if (message.includes("Failed to send") || message.includes("404")) {
      throw notReady(
        "Edge Function이 아직 배포되지 않았습니다. 「DB 활동 미리보기」를 이용하세요."
      );
    }
    throw new Error(message);
  }

  const payload = data as AiReportGenerateResponse | AiReportNotReadyError | null;

  if (payload && "code" in payload && payload.code === "NOT_IMPLEMENTED") {
    throw notReady(payload.message);
  }

  if (!payload || typeof payload !== "object" || !("summary" in payload)) {
    throw notReady("응답 형식이 올바르지 않습니다.");
  }

  return payload;
}

function notReady(message: string): Error {
  const err = new Error(message);
  err.name = "AiReportNotReady";
  return err;
}
