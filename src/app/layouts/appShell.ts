/** 상단 네비·수업 사이드+메인 콘텐츠가 공유하는 가로 정렬 폭 */
export function isWideCourseTeamsListPath(pathname: string): boolean {
  return /^\/app\/courses\/[^/]+\/teams\/?$/.test(pathname);
}

/** 좌측 사이드 네비 + 메인 2열 — 시각적 중앙 보정용 */
export function hasSideNavLayout(pathname: string): boolean {
  return (
    /^\/app\/courses\/[^/]+/.test(pathname) ||
    pathname.startsWith("/app/students") ||
    pathname.startsWith("/app/teams") ||
    pathname.startsWith("/app/mypage")
  );
}

export function getAppShellClassName(pathname: string): string {
  const wide = isWideCourseTeamsListPath(pathname);
  const optical = hasSideNavLayout(pathname);
  const parts = ["cc-app-shell", wide && "cc-app-shell--wide", optical && "cc-app-shell--optical"].filter(
    Boolean
  );
  return parts.join(" ");
}
