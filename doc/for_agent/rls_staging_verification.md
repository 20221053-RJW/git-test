# RLS Beta 스테이징 검증 (T-011) — AI·인간 공용

> **전제:** H-007 번들 v2 SQL 실행 완료 · **원격 RLS 마이그레이션은 H-001 승인 후에만**  
> **관련:** `rls_review_packet.md` · `supabase/migrations/20260519000000_rls_beta_draft.sql` · H-001 · H-033

AI는 **승인 없이** `20260519000000_rls_beta_draft.sql` 을 프로덕션/공유 Supabase에 적용하지 않습니다.  
이 문서는 **적용 전·스테이징**에서 확인할 항목입니다.

---

## 1. 번들 v2 후 (H-007)

| # | 확인 | 기대 |
|---|------|------|
| 1 | [35_smoke_test_after_bundle.md](../for_human/35_smoke_test_after_bundle.md) | 팀 피드백·회고·동료·교수 평가 저장 |
| 2 | [37_verify_ai_report.md](../for_human/37_verify_ai_report.md) | 마이페이지 집계·A4 |

---

## 2. RLS 초안 리뷰 (H-001)

| # | 확인 | 담당 |
|---|------|------|
| 1 | `rls_review_packet.md` 인간 체크리스트 | 인간 |
| 2 | [31_rls_beta_decision.md](../for_human/31_rls_beta_decision.md) GO/보류 | 인간 |
| 3 | 승인 시에만 `20260519000000_rls_beta_draft.sql` 스테이징 적용 | 인간 |

---

## 3. JWT 연동 후 (H-001 승인 + [33](../for_human/33_firebase_supabase_jwt_setup.md))

| # | 확인 | 기대 |
|---|------|------|
| 1 | `.env` `VITE_ENABLE_SUPABASE_FIREBASE_JWT=true` | 로그인·CRUD 정상 |
| 2 | `npm run test:e2e` | 13플로우 green (H-003) |
| 3 | 타 계정 데이터 비노출 spot check | RLS 차단 |

---

## 4. AI 회귀 체크 (코드만, SQL 미적용 시)

- [ ] `gatherAiReportContext` — 익명 키로 기존과 동일 집계
- [ ] 팀 상세 쓰기 — 피드백·회고·채팅 (번들 v2 후)
- [ ] 마이페이지 — PAGE 01~03·A4 미리보기

완료 시 `17_handoff.md` · `05_todo.md` T-011 상태 갱신.
