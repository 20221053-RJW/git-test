# 17 — 인수인계

> **관련:** `02_current_state.md` · `05_todo.md` · `28_human_action_items.md` · `25_ai_work_log.md`  
> **마지막 갱신:** 2026-05-20

## 지금 여기까지

- **단계:** Alpha → Beta 진입 (~63%)
- **API:** `supabase-api.ts` — 과목·팀·Q&A·네트워크·Storage·팀 상세 쓰기 전반
- **인증:** Firebase + `ai_users` + ProtectedRoute + JWT 스캐폴드 (`VITE_ENABLE_SUPABASE_FIREBASE_JWT`, **기본 off**)
- **팀 상세:** 채팅·Realtime, 피드백·동료평가·회고록 DB, 교수 평가·제출 현황 패널, AI 진행 요약(실데이터)
- **마이페이지:** 리포트 3페이지 DB 집계 + A4 + Edge `generate-report` (배포 후 OPENAI 없으면도 DB 초안 200)
- **E2E:** 23플로우 + 인증 가드 · CI `build.yml` + `e2e.yml`
- **RLS:** `rls_review_packet.md` + `20260519000000_rls_beta_draft.sql` — **미적용** (H-001)
- **DB 마이그레이션(로컬 DRAFT):** 번들 v2 `20260520102000_team_detail_writes_bundle_v2.sql` — **인간 실행 필요**
- **스캔 확인:** `CoursesPage` 수업코드 자동생성(T-026)·일정 캘린더(T-027) 완료, `TeamDetailPage` 업로드 500MB·링크 게시물(T-024) 완료 + 코드/압축 확장자 확대, `MyPage` 교수 비노출(T-025) 완료

## 바로 이어서 (인간 우선)

→ [`for_human/00_pre_launch_order.md`](../for_human/00_pre_launch_order.md)

1. **H-007** — 번들 v2 SQL → [35](../for_human/35_smoke_test_after_bundle.md) · 리포트 집계 [37](../for_human/37_verify_ai_report.md)
2. **H-003 / H-004** — 로컬 E2E · GitHub Secrets ([34](../for_human/34_github_ci_secrets.md))
3. **H-002** — Edge `generate-report` + OPENAI ([30](../for_human/30_edge_ai_report.md))
4. **H-001** — RLS 승인 ([31](../for_human/31_rls_beta_decision.md)) → JWT ([33](../for_human/33_firebase_supabase_jwt_setup.md))
5. **H-005** — Vercel 배포 (`deploy_vercel_checklist.md`)

## AI가 다음에 할 수 있는 것 (H-001 승인 후)

- RLS Beta SQL 스테이징 검증 → `rls_staging_verification.md`
- `VITE_ENABLE_SUPABASE_FIREBASE_JWT=true` 회귀 테스트
- [o] `gatherAiReportContext` 교수 평가 집계 (2026-05-20, 260520-23)
- [o] vision 추가요청 4건 완료 (T-024~T-027) — `27_vision_feature_matrix.md`

## AI가 다음에 할 수 있는 것 (인간 승인 없이 가능)

1. T-024 대용량 업로드·링크 게시물 회귀 테스트

## 건드리지 말 것

- `vision.md`, `doit.md`
- `vision_snapshot.md`는 원본 대조용으로만 갱신 (원본 대체 금지)
- `src/imports/` 대량 삭제
- RLS SQL **무승인** 원격 적용

## 참고

| 주제 | 문서·코드 |
|------|-----------|
| SQL 번들 | `supabase/migrations/20260520102000_team_detail_writes_bundle_v2.sql`, [29](../for_human/29_supabase_bundle_sql.md) |
| RLS | `rls_review_packet.md`, ADR-012·013 |
| AI | `10_ai_system.md`, `ai-report.ts`, `functions/generate-report/` |
| E2E | `14_testing.md`, `tests/e2e/core-flows.spec.ts` |
| 배포 | `13_devops.md`, `vercel.json`, `deploy_vercel_checklist.md` |

## 세션 종료 체크리스트

`23_agent_operating_rules.md` — `02`, `05`, `17`, `27`, `for_human/01`, `26`, `25_ai_work_log`
