# 05 — TODO (우선순위)

> **관련:** `02_current_state.md` · `17_handoff.md` · `28_human_action_items.md`  
> **마지막 갱신:** 2026-05-20

## P0 — 즉시 (데이터 기반)

| ID | 작업 | 담당 | 상태 |
|----|------|------|------|
| T-001 | Supabase 스키마 설계·마이그레이션 | DB | done |
| T-002 | `supabase-api.ts` → Supabase courses 연동 | FE+DB | done |
| T-003 | 환경변수 분리 (`VITE_*`, `.env.example`) | Infra | done |
| T-004 | 라우트 통합: course-scoped teams only | FE | done |

## P1 — 인증·접근

| ID | 작업 | 상태 |
|----|------|------|
| T-010 | Protected routes | done |
| T-011 | RLS 정책 초안 + 인간 리뷰 | in_progress | `rls_review_packet.md`, `supabase/migrations/20260519000000_rls_beta_draft.sql` (미적용) |
| T-012 | 회원가입·수업 코드 멤버십 | done |

## P2 — 핵심 기능

| ID | 작업 | 상태 |
|----|------|------|
| T-020 | 트러블슈팅 CRUD | done |
| T-021 | 팀 산출물 Storage | done |
| T-022 | Q&A CRUD | done |
| T-023 | 수강생 네트워크 저장 | done |

## P3 — AI·마이페이지

| ID | 작업 | 상태 | 비고 |
|----|------|------|------|
| T-030 | AI 리포트 | in_progress | DB·UI 완료; Edge LLM → H-002 |
| T-031 | A4 리포트 템플릿 | done | `AiReportPrintView`, MyPage 1–3페이지 DB |

## P4 — 품질·배포

| ID | 작업 | 상태 |
|----|------|------|
| T-040 | Playwright 핵심 플로우 | done | 7플로우 + 인증 가드 (`14_testing.md`) |
| T-041 | GitHub Actions CI | done | `.github/workflows/e2e.yml` |
| T-042 | 프로덕션 배포 | pending | `vercel.json` 준비, H-005 |

## 완료됨 (최근)

- [o] 마이페이지 리포트 2·3페이지 DB, E2E #7 (2026-05-20)
- [o] 마이페이지 요약·Vercel 준비 (2026-05-20)
- [o] 김학생 종료 수업 시드 (2026-05-20)
- [o] T-040·T-041 E2E + CI (2026-05-19)
- [o] doc 전반 코드 대조 (2026-05-19)

## 작업 규칙

1. 착수 전 `02_current_state.md` 확인
2. 완료 시 이 파일 + `17_handoff.md` + (기능 시) `27` 갱신
3. 아키텍처 변경 시 `06_decision_log.md`
