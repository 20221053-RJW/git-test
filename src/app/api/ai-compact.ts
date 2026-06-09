import { supabase } from "../supabase";
import type { AiReportContext } from "../types/ai-report";

const FUNCTION_NAME = "recommend-troubleshooting";
const DEBOUNCE_MS = 15 * 60 * 1000;
const USER_STALE_MS = 24 * 60 * 60 * 1000;
const TEAM_STALE_MS = 24 * 60 * 60 * 1000;

function edgeFunctionHeaders(): Record<string, string> | undefined {
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!key || typeof key !== "string") return undefined;
  return {
    Authorization: `Bearer ${key}`,
    apikey: key,
  };
}

function debounceKey(scope: string, id: string): string {
  return `ai-compact:${scope}:${id}`;
}

function isDebounced(scope: string, id: string): boolean {
  try {
    const raw = sessionStorage.getItem(debounceKey(scope, id));
    if (!raw) return false;
    const ts = Number.parseInt(raw, 10);
    return Number.isFinite(ts) && Date.now() - ts < DEBOUNCE_MS;
  } catch {
    return false;
  }
}

function markDebounced(scope: string, id: string): void {
  try {
    sessionStorage.setItem(debounceKey(scope, id), String(Date.now()));
  } catch {
    // ignore
  }
}

/** 활동 지문 — 컨텍스트가 바뀌었는지 빠르게 판별 */
export function buildUserActivityFingerprint(context: AiReportContext): string {
  return [
    context.teams.length,
    context.totalTroubleshootingLogs,
    context.totalDeliverables,
    context.totalFeedbacksSubmitted,
    context.totalRetrospectivesSubmitted,
    context.totalPeerReviewsSubmitted,
    context.totalProfessorStudentEvalsReceived,
  ].join(":");
}

export function isUserContextStale(context: AiReportContext): boolean {
  if (!context.userContextExcerpt?.trim()) return true;
  if (!context.userContextUpdatedAt) return true;
  const updated = new Date(context.userContextUpdatedAt).getTime();
  if (!updated || Date.now() - updated > USER_STALE_MS) return true;

  try {
    const fpKey = `ai-compact:user-fp:${context.userId}`;
    const prev = sessionStorage.getItem(fpKey);
    const next = buildUserActivityFingerprint(context);
    if (prev && prev !== next) return true;
  } catch {
    // ignore
  }

  return false;
}

export function rememberUserActivityFingerprint(context: AiReportContext): void {
  try {
    sessionStorage.setItem(
      `ai-compact:user-fp:${context.userId}`,
      buildUserActivityFingerprint(context)
    );
  } catch {
    // ignore
  }
}

export async function compactUserContextIfStale(
  context: AiReportContext,
  locale: "ko" | "en" = "ko"
): Promise<boolean> {
  if (!isUserContextStale(context)) return false;
  if (isDebounced("user", context.userId)) return false;

  markDebounced("user", context.userId);

  const { data, error } = await supabase.functions.invoke(FUNCTION_NAME, {
    body: { intent: "compact-user-context", userId: context.userId, locale },
    headers: edgeFunctionHeaders(),
  });

  if (error) {
    console.warn("[compact-user-context]", error.message);
    return false;
  }

  if (data && typeof data === "object" && "error" in data) {
    console.warn("[compact-user-context]", (data as { error?: string }).error);
    return false;
  }

  rememberUserActivityFingerprint(context);
  return true;
}

export async function compactTeamContextIfStale(
  teamId: string,
  opts?: { workspaceExcerpt?: string | null; updatedAt?: string | null }
): Promise<boolean> {
  if (opts?.workspaceExcerpt?.trim() && opts.updatedAt) {
    const updated = new Date(opts.updatedAt).getTime();
    if (updated && Date.now() - updated <= TEAM_STALE_MS) {
      return false;
    }
  }
  if (isDebounced("team", teamId)) return false;

  markDebounced("team", teamId);

  const { data, error } = await supabase.functions.invoke(FUNCTION_NAME, {
    body: { intent: "compact-team-context", teamId, locale: "ko" },
    headers: edgeFunctionHeaders(),
  });

  if (error) {
    console.warn("[compact-team-context]", error.message);
    return false;
  }

  if (data && typeof data === "object" && "error" in data) {
    console.warn("[compact-team-context]", (data as { error?: string }).error);
    return false;
  }

  return true;
}
