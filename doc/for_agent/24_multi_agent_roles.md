# 24 — 멀티 에이전트 역할 매트릭스

> **관련:** `23_agent_operating_rules.md` · `05_todo.md` · `17_handoff.md`  
> **원본:** `doit.md` §멀티 에이전트 · 병렬 작업 시 충돌 방지용

## 역할별 담당 문서·코드

각 역할은 다음을 문서에 유지한다: 담당 업무 · 진행 상태 · 기술 결정 · 다음 작업 · 문제 · 기술 부채 · 인수인계 · 의존 · 주의.

| 역할 | 주 담당 doc | 주 담당 코드 | 현재 상태 |
|------|-------------|--------------|-----------|
| CTO / 테크 리드 | 01, 06, 03 | — | ADR·로드맵 검토 |
| 프로젝트 매니저 | 05, 02, 17 | — | TODO 우선순위 |
| 프론트엔드 | 08, 12, 27 | `src/app/pages/`, `components/` | UI ~75%, MyPage 리포트 |
| 백엔드 | 07, 11 | `supabase-api.ts`, `ai-report.ts` | CRUD facade; RLS·Edge 대기 |
| 데이터 | 09, 22 | Supabase migrations, seed | 스키마·시드 운영 중 |
| AI 시스템 | 10 | `ai-report.ts`, Edge `generate-report` | 집계·A4 ~35%; LLM H-002 |
| 인프라 / DevOps | 13, 04 | `vercel.json`, `.github/workflows` | E2E CI; 배포 H-005 |
| 디자인 | **18**, 12 | `campus-connect-tokens.css`, `layout/PageHeader` | 토큰·네비·팀 WS 1차 (~40%) |
| QA | 14, 15 | `tests/e2e/` | E2E 7플로우 + auth guard |
| 문서화 | 26, 23, 00 | `doc/` | 시스템 구축됨 |
| 리서치 | 27, vision | — | 기능-구현 매핑 |

## 병렬 작업 규칙

1. 착수 전 `05_todo.md`에서 ID 클레임 (같은 파일 동시 수정 금지)
2. 담당 영역 doc만 우선 수정, 타 영역은 `17_handoff.md`에 요청
3. 끝날 때 `23_agent_operating_rules.md` 체크리스트 수행

## 역할별 다음 작업 (스냅샷 2026-05-20)

| 역할 | 다음 작업 |
|------|-----------|
| 데이터 | H-001 RLS 적용, 시드 유지보수 |
| 프론트 | 종료 수업 UX, 리포트 PAGE 2 polish |
| 백엔드 | T-011 RLS, Edge LLM (H-002) |
| 인프라 | H-005 Vercel 연결, H-003/H-004 E2E 시크릿 |
| QA | E2E CI 그린, 신규 플로우 추가 |
| AI | `generate-report` 배포·연동 |
| 문서화 | `02`·`27`·`25` 동기화 |

## 의존 관계

```
데이터(스키마) → 백엔드/API → 프론트(연동)
인프라(.env) → 백엔드·프론트(배포)
디자인(브랜드) → 12_design_system
AI(키 발급) → 10_ai_system
```

## 역할 템플릿 (새 에이전트가 역할 맡을 때)

```markdown
## [역할명] — YYYY-MM-DD

### 담당 업무
### 현재 진행 상태 (%)
### 기술 결정 이유
### 다음 작업
### 문제점
### 기술 부채
### 인수인계
### 의존 관계
### 주의사항
```

→ 내용은 `17_handoff.md` 또는 이 파일 해당 행에 반영
