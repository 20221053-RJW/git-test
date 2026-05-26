/** In-memory cache for Supabase API hot paths (chat send, membership). Cleared on logout. */

export const API_SESSION_CACHE_MS = 5 * 60 * 1000;

let cachedFirebaseUid: string | null = null;
let cachedAccessibleCourseIds: string[] | null = null;

const courseStatusById = new Map<string, { status: string; at: number }>();
const teamCourseIdByTeam = new Map<string, { courseId: string; at: number }>();
const courseDmPeerIdsByCourse = new Map<string, { ids: Set<string>; at: number }>();
const directChatWarmKeys = new Set<string>();
const teamChatWarmTeamIds = new Set<string>();

export function isApiCacheFresh(at: number): boolean {
  return Date.now() - at < API_SESSION_CACHE_MS;
}

export function invalidateApiSessionCache(): void {
  cachedFirebaseUid = null;
  cachedAccessibleCourseIds = null;
  courseStatusById.clear();
  teamCourseIdByTeam.clear();
  courseDmPeerIdsByCourse.clear();
  directChatWarmKeys.clear();
  teamChatWarmTeamIds.clear();
}

export function getCachedAccessibleCourseIds(firebaseUid: string): string[] | null {
  if (cachedFirebaseUid !== firebaseUid || !cachedAccessibleCourseIds) return null;
  return cachedAccessibleCourseIds;
}

export function setCachedAccessibleCourseIds(firebaseUid: string, ids: string[]): void {
  cachedFirebaseUid = firebaseUid;
  cachedAccessibleCourseIds = ids;
}

export function getCachedCourseStatus(courseId: string): string | null {
  const entry = courseStatusById.get(courseId);
  if (!entry || !isApiCacheFresh(entry.at)) return null;
  return entry.status;
}

export function setCachedCourseStatus(courseId: string, status: string): void {
  courseStatusById.set(courseId, { status, at: Date.now() });
}

export function getCachedTeamCourseId(teamId: string): string | null {
  const entry = teamCourseIdByTeam.get(teamId);
  if (!entry || !isApiCacheFresh(entry.at)) return null;
  return entry.courseId;
}

export function setCachedTeamCourseId(teamId: string, courseId: string): void {
  teamCourseIdByTeam.set(teamId, { courseId, at: Date.now() });
}

export function getCachedCourseDmPeerIds(courseId: string): Set<string> | null {
  const entry = courseDmPeerIdsByCourse.get(courseId);
  if (!entry || !isApiCacheFresh(entry.at)) return null;
  return entry.ids;
}

export function setCachedCourseDmPeerIds(courseId: string, ids: Set<string>): void {
  courseDmPeerIdsByCourse.set(courseId, { ids, at: Date.now() });
}

export function markDirectChatWarm(courseId: string, peerUserId: string): void {
  directChatWarmKeys.add(`${courseId}:${peerUserId}`);
}

export function isDirectChatWarm(courseId: string, peerUserId: string): boolean {
  return directChatWarmKeys.has(`${courseId}:${peerUserId}`);
}

export function markTeamChatWarm(teamId: string): void {
  teamChatWarmTeamIds.add(teamId);
}

export function isTeamChatWarm(teamId: string): boolean {
  return teamChatWarmTeamIds.has(teamId);
}
