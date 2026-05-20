# 17 — 인수인계

> **관련:** `02_current_state.md` · `05_todo.md` · `28_human_action_items.md` · `25_ai_work_log.md`  
> **마지막 갱신:** 2026-05-20

## 지금 여기까지

- Alpha: Supabase 읽기·쓰기 (`supabase-api.ts`, `ai-report.ts`)
- Firebase + ProtectedRoute + E2E·CI (7플로우)
- 마이페이지: `getProjectsForUser`, 리포트 1–3페이지 `gatherContext`, A4 인쇄
- 종료 수업: UI 필터 + 시드 `supabase/seed/archived_courses_kim_student.sql`
- `vercel.json` (배포 H-005)
- T-011: RLS 패키지·SQL 미적용
- T-030: DB·UI 완료, Edge LLM H-002

## 바로 이어서

1. **인간:** `28` H-001~006
2. **T-030:** Edge LLM (H-002 후)
3. **T-042:** Vercel + `VITE_*` (H-005)
4. E2E green (H-003, H-004)

## 건드리지 말 것

- `vision.md`, `doit.md`
- `src/imports/` 대량 삭제
- RLS SQL 무승인 원격 적용

## 참고

| 주제 | 문서·코드 |
|------|-----------|
| RLS | `rls_review_packet.md`, `22_security_notes.md` |
| AI | `10_ai_system.md`, `ai-report.ts`, `functions/generate-report/` |
| E2E | `14_testing.md`, `tests/e2e/` |
| 배포 | `13_devops.md`, `vercel.json` |
| 시드 | `supabase/seed/archived_courses_kim_student.sql` |

## 세션 종료 체크리스트

`23_agent_operating_rules.md` — `02`, `05`, `17`, `27`, `for_human/01`, `26`, `25_ai_work_log`
