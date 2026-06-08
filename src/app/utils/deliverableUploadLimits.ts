/** 팀 산출물 단일 파일 업로드 한도 — Supabase Storage file_size_limit 와 동일 (500MB) */
export const TEAM_DELIVERABLE_MAX_BYTES = 500 * 1024 * 1024;

export const TEAM_DELIVERABLE_MAX_LABEL = "500MB";

export function isWithinTeamDeliverableLimit(bytes: number): boolean {
  return bytes > 0 && bytes <= TEAM_DELIVERABLE_MAX_BYTES;
}

export function teamDeliverableSizeError(fileName: string, bytes: number): string {
  return `"${fileName}"은(는) ${(bytes / (1024 * 1024)).toFixed(1)}MB입니다. 최대 ${TEAM_DELIVERABLE_MAX_LABEL} 이하로 올려 주세요.`;
}

function readUploadErrorStatus(error: unknown): number | null {
  if (typeof error !== "object" || error === null) return null;
  const record = error as { status?: unknown; statusCode?: unknown };
  const status = Number(record.status ?? record.statusCode);
  return Number.isFinite(status) ? status : null;
}

export function formatDeliverableStorageError(error: unknown): Error {
  const message = error instanceof Error ? error.message : String(error);
  const status = readUploadErrorStatus(error);

  if (/bucket|not found|404|Bucket/i.test(message)) {
    return new Error(
      "산출물 Storage 버킷(ai_team_deliverables)이 없습니다. Supabase에 마이그레이션을 적용해 주세요."
    );
  }

  if (
    status === 413 ||
    /413|payload too large|entity too large|file.?size|exceed.*limit|maximum.*size|too large|size limit/i.test(
      message
    )
  ) {
    return new Error(
      `파일 크기 한도에 걸렸습니다. Supabase 대시보드 → Storage → Settings → Global file size limit을 ${TEAM_DELIVERABLE_MAX_LABEL} 이상으로 설정해 주세요. (Free 플랜은 최대 50MB)`
    );
  }

  if (/network|failed to fetch|timeout|aborted/i.test(message)) {
    return new Error("업로드 중 네트워크 오류가 발생했습니다. 연결을 확인한 뒤 다시 시도해 주세요.");
  }

  return error instanceof Error ? error : new Error(message);
}
