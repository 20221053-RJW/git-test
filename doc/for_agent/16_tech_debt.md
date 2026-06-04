# 16 — 기술 부채

> **관련:** `15_known_issues.md` · `05_todo.md`  
> **마지막 갱신:** 2026-05-20

| ID | 부채 | 영향 | 상환 계획 |
|----|------|------|-----------|
| TD-001 | ~~`mock-data.ts` 파일명 혼동~~ | — | **Resolved 2026-05-19** → `supabase-api.ts` |
| TD-002 | Figma imports | 번들·유지보수 | 페이지별 app으로 이전 |
| TD-003 | 페이지 내 거대 컴포넌트 | 테스트 어려움 | TeamsPage 등 분리 |
| TD-004 | ~~시크릿 하드코딩~~ | — | **Resolved 2026-05-19** (T-003) |
| TD-005 | 이중 Auth (Firebase+Supabase) | 복잡도 | ADR 검토 |
| TD-006 | 미사용 deps (express, swagger) | 번들 | 제거 검토 |
| TD-007 | 루트 README·PROJECT_STRUCTURE | doc 중복 | doc/ 우선, 루트 문서 정리 |

## 우선 상환

TD-005 (Auth 단일화 검토) · TD-002 (Figma imports) — RLS는 H-001/T-011

## 기록 규칙

상환 완료 시 **Resolved YYYY-MM-DD** 표기
