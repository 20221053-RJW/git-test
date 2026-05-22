# 08 — 프론트엔드

> **관련:** `19_folder_structure.md` · `12_design_system.md` · `src/app/routes.tsx` · `11_api_spec.md`

## 스택

React 18.3 · TypeScript · Vite 6 · React Router 7 · Tailwind 4 · Radix/Shadcn

## 진입점

- `src/main.tsx` → `App.tsx` → `RouterProvider(router)`
- `/app` → `ProtectedRoute` → `MainLayout` → `<Outlet />`

## 페이지 맵

| 경로 | 컴포넌트 | 데이터 |
|------|-----------|--------|
| `/` | LandingPage | static |
| `/signin` | SignInPage | Firebase |
| `/app/courses` | CoursesPage | Supabase, active/archived |
| `/app/courses/:id` | CourseDetailPage | Supabase |
| `/app/courses/:courseId/students` | StudentsNetworkPage | Supabase |
| `/app/courses/:courseId/teams` | TeamsPage | Supabase |
| `/app/courses/:courseId/teams/:teamId` | TeamDetailPage | Supabase CRUD |
| `/app/mypage` | MyPage | `resolveReportContext`(캐시), 리포트 3페이지, A4·집계 새로고침 |
| `/app/qna` | QnAPage | Supabase |
| `/app/qna/:questionId` | QnADetailPage | 답변 CRUD |
| `/app/teams`, `/app/students` | `CourseScopedRedirect` | |

## 주요 컴포넌트

- `Navigation.tsx` — `cc-app-shell` · 모바일 `md:hidden` 메뉴 · `data-testid="logout-button"`
- `Footer.tsx` — `cc-app-shell` (헤더와 동일 가로폭)
- `UserAvatar.tsx` — `imageUrl` / 이니셜 (네비·팀·프로필 모달)
- `layouts/MainLayout.tsx` — `cc-main-viewport` · `CourseSideNavigation` · `MyTeamSideNavGroup`
- `layouts/appShell.ts` — `getAppShellClassName(pathname)` (shell / wide)
- `layout/PageHeader.tsx`, `SectionCard.tsx`, `AppSideNav.tsx`, `SideNavItem.tsx`, `PageLoading.tsx`
- `courses/CourseListCard.tsx` — 수업 목록 카드
- `AiReportPrintView.tsx` — A4 인쇄
- `ProtectedRoute.tsx` — 인증 로딩 시 `PageLoading` fullscreen

## 프로필 이미지

- DB: `ai_users.image` (data URL)
- 타입: `BaseProfile.imageUrl`
- 저장: `api.myPage.updateAvatar` → `AuthContext.refreshProfile()`
- 표시: `UserAvatar`, `mapAiUserToNetworkStudent`, 팀 멤버 `imageUrl`

## 상태 관리

- **전역:** `AuthContext`
- **로컬:** `useState` / `useEffect`
- **데이터:** `api` → Supabase

## 완료됨

- [o] ProtectedRoute, course-scoped URL
- [o] 종료 수업 UI·읽기 전용 배너
- [o] MyPage DB 리포트·인쇄
- [o] `cc-app-shell` 상단·수업 레이아웃 가로 정렬 (C-260522-31)
- [o] 프로필 이미지 전역 연동 (C-260522-32)

## 다음

- [ ] React Query 검토
- [ ] 채팅 Realtime UI
