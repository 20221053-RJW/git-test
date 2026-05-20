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
| `/app/mypage` | MyPage | `gatherContext`, 리포트 3페이지 |
| `/app/qna` | QnAPage | Supabase |
| `/app/qna/:questionId` | QnADetailPage | 답변 CRUD |
| `/app/teams`, `/app/students` | `CourseScopedRedirect` | |

## 주요 컴포넌트

- `Navigation.tsx` — 로그아웃 `data-testid="logout-button"`
- `AiReportPrintView.tsx` — A4 인쇄
- `ProtectedRoute.tsx`, `CourseScopedRedirect.tsx`

## 상태 관리

- **전역:** `AuthContext`
- **로컬:** `useState` / `useEffect`
- **데이터:** `api` → Supabase

## 완료됨

- [o] ProtectedRoute, course-scoped URL
- [o] 종료 수업 UI·읽기 전용 배너
- [o] MyPage DB 리포트·인쇄

## 다음

- [ ] React Query 검토
- [ ] 채팅 Realtime UI
