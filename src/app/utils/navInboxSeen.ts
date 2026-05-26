const STORAGE_PREFIX = "cc-nav-inbox-seen";

export const NAV_INBOX_REFRESH_EVENT = "cc-nav-inbox-refresh";

export type NavInboxSeenState = {
  /** courseId → 마지막으로 확인한 공지 sort_order */
  announcements: Record<string, number>;
  /** `${courseId}:${peerUserId}` → 마지막으로 확인한 상대 메시지 ISO 시각 */
  directMessages: Record<string, string>;
};

function storageKey(userId: string) {
  return `${STORAGE_PREFIX}:${userId}`;
}

function dmKey(courseId: string, peerUserId: string) {
  return `${courseId}:${peerUserId}`;
}

export function sameNavInboxUserId(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b) return false;
  return String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
}

export function readNavInboxSeen(userId: string): NavInboxSeenState {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return { announcements: {}, directMessages: {} };
    const parsed = JSON.parse(raw) as Partial<NavInboxSeenState>;
    return {
      announcements:
        parsed?.announcements && typeof parsed.announcements === "object"
          ? parsed.announcements
          : {},
      directMessages:
        parsed?.directMessages && typeof parsed.directMessages === "object"
          ? parsed.directMessages
          : {},
    };
  } catch {
    return { announcements: {}, directMessages: {} };
  }
}

function writeNavInboxSeen(userId: string, state: NavInboxSeenState): void {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(state));
    window.dispatchEvent(new CustomEvent(NAV_INBOX_REFRESH_EVENT));
  } catch {
    /* ignore quota */
  }
}

export function markCourseAnnouncementsSeen(
  userId: string,
  courseId: string,
  maxSortOrder: number
): void {
  const state = readNavInboxSeen(userId);
  const prev = state.announcements[courseId] ?? 0;
  if (maxSortOrder <= prev) return;
  state.announcements[courseId] = maxSortOrder;
  writeNavInboxSeen(userId, state);
}

export function markDirectMessageThreadSeen(
  userId: string,
  courseId: string,
  peerUserId: string,
  lastAtIso: string
): void {
  const state = readNavInboxSeen(userId);
  const key = dmKey(courseId, peerUserId);
  const prev = state.directMessages[key];
  if (prev && prev >= lastAtIso) return;
  state.directMessages[key] = lastAtIso;
  writeNavInboxSeen(userId, state);
}

/** 상단 인박스 목록에 넣을 공지인지 (본인 작성 제외) */
export function shouldShowAnnouncementInNavInbox(
  authorUserId: string | null | undefined,
  viewerUserId: string
): boolean {
  if (!authorUserId) return true;
  return !sameNavInboxUserId(authorUserId, viewerUserId);
}

/** 상단 인박스 목록에 넣을 DM 스레드인지 (마지막 메시지가 본인 발신이면 제외) */
export function shouldShowDirectMessageInNavInbox(
  lastSenderUserId: string,
  viewerUserId: string
): boolean {
  return !sameNavInboxUserId(lastSenderUserId, viewerUserId);
}

export function isAnnouncementUnread(
  userId: string,
  courseId: string,
  sortOrder: number,
  authorUserId?: string | null
): boolean {
  if (authorUserId && sameNavInboxUserId(authorUserId, userId)) return false;
  const seen = readNavInboxSeen(userId).announcements[courseId] ?? 0;
  return sortOrder > seen;
}

export function isDirectMessageThreadUnread(
  userId: string,
  courseId: string,
  peerUserId: string,
  lastAtIso: string,
  lastSenderUserId: string,
  currentUserId: string
): boolean {
  if (sameNavInboxUserId(lastSenderUserId, currentUserId)) return false;
  const seen = readNavInboxSeen(userId).directMessages[dmKey(courseId, peerUserId)];
  if (!seen) return true;
  return lastAtIso > seen;
}

/** 본인이 보낸 메시지 직후 인박스 갱신용 */
export function markDirectMessageSentBySelf(
  userId: string,
  courseId: string,
  peerUserId: string,
  sentAtIso: string
): void {
  markDirectMessageThreadSeen(userId, courseId, peerUserId, sentAtIso);
}
