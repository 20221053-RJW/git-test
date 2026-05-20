# 14 — 테스트

> **관련:** `13_devops.md` · `tests/e2e/` · `28_human_action_items.md` (H-003, H-004)

## 현재

- **Playwright** — `playwright.config.ts`, `tests/e2e/`
- **핵심 E2E:** `core-flows.spec.ts` — 7플로우 + 인증 가드 1건
- **단위 테스트:** 없음

## 실행

```bash
npm run test:e2e
npm run test:e2e:ui
```

`.env`:

```env
E2E_TEST_EMAIL=...
E2E_TEST_PASSWORD=...
```

미설정 시 로그인 7건 skip, 인증 가드 1건 항상 실행.

## 구현된 E2E 시나리오

1. 랜딩 로그인 → `/app/courses`
2. 과목 → 수강생 네트워크
3. 팀 목록 → 팀 상세
4. 마이페이지
5. 로그아웃 → 랜딩
6. 마이페이지 DB 리포트 미리보기 (A4)
7. 마이페이지 리포트 페이지 1→2→3

헬퍼: `tests/e2e/helpers/auth.ts`

## CI

`.github/workflows/e2e.yml` — `VITE_*`, `E2E_TEST_*` 시크릿 (H-004)

## 다음

- [ ] 시드/테스트 전용 Supabase project
- [ ] RLS 회귀 테스트 (T-011 후)
