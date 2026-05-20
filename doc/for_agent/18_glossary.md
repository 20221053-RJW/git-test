# 18 — 용어집

> **관련:** `doc/for_human/23_beginner_glossary.md`

| 용어 | 정의 |
|------|------|
| CampusConnect | 본 프로젝트 서비스명 |
| supabase-api.ts | Supabase `ai_*` CRUD facade (`export const api`) |
| ai-report.ts | 마이페이지 리포트 `gatherContext`·Edge 호출 |
| ai_* | Supabase 앱 테이블 접두사 (`ai_courses`, `ai_teams`, …) |
| firebase_uid | Firebase Auth uid ↔ `ai_users` 연결 컬럼 |
| Course | 수업 (`ai_courses`) |
| Team | 과목 내 팀 (`ai_teams`) |
| ProtectedRoute | `/app` 로그인 필수 가드 |
| CourseScopedRedirect | `/app/teams` 등 → `/app/courses/:id/...` |
| Alpha→Beta | UI + Supabase 읽기·쓰기 대부분; RLS·LLM·배포 미완 |
| RLS | Row Level Security |
| UserRole | `student` \| `professor` \| `admin` |
