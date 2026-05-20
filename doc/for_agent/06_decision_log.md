# 06 — 의사결정 로그 (ADR)

> **관련:** `01_architecture.md` · `16_tech_debt.md`

형식: **날짜 | 결정 | 이유 | 대안 | 영향**

---

## ADR-001 — 2026-05-19 — 문서 시스템 이원화

**결정:** `doc/for_agent` + `doc/for_human` + `doc/starter.txt` 구조 채택  
**이유:** doit.md 지침, AI·인간 온보딩 요구 분리  
**대안:** README 단일 문서 — 확장성 부족  
**영향:** 모든 에이전트는 작업 후 관련 doc 갱신

---

## ADR-005 — 2026-05-19 — starter.txt 단일 위치

**결정:** `starter.txt` 는 `doc/starter.txt` 만 유지, 루트 복사본 삭제  
**이유:** 이중 경로 혼란 방지, doit 구조 `doc/` 하위 정렬  
**대안:** 루트·doc 동시 유지 — 어느 쪽이 정본인지 불명확  
**영향:** AI·인간 안내 문구를 `doc/starter.txt` 로 통일

---

## ADR-006 — 2026-05-19 — doc/README.md 제거

**결정:** `doc/README.md` 삭제; 구조·색인은 `starter.txt`, `00_project_overview`, `00_start_here`만 사용  
**이유:** starter · for_agent · for_human 3분할만 유지, 중복 파일 제거  
**영향:** doc/ 진입은 `starter.txt`(AI) 또는 `for_human/00_start_here.md`(사람)

---

## ADR-002 — (기존) Firebase Auth + Supabase DB

**결정:** 인증은 Firebase, 프로필·비즈니스 데이터는 Supabase  
**이유:** AuthContext 이미 구현, Supabase RLS·Postgres 활용  
**대안:** Supabase Auth 단일화 — 마이그레이션 비용  
**영향:** JWT ↔ Supabase 연동 패턴 문서화 필요 (`07_backend.md`)

---

## ADR-003 — (기존) Mock-first 개발

**결정:** UI는 `supabase-api.ts`로 먼저 완성 후 DB 교체  
**상태 (2026-05-19):** 읽기 경로 Supabase 전환 완료. 파일 rename → `supabase-api.ts` (ADR-007).
**이유:** Figma 기반 빠른 프로토타이핑  
**대안:** API-first — UI 지연  
**영향:** 읽기 Mock 제거 완료; 쓰기 CRUD·파일명 정리 잔여

---

## ADR-011 — 2026-05-19 — 인간 액션 대기 목록·미루고 계속

**결정:** 인간 전용 작업은 `for_human/28_human_action_items.md`에 기록; **세션 전체 중단 없이** 다른 작업 계속. 세션 시작·종료 시 28번 완료 여부 확인.  
**이유:** 사용자 요청 — 막혀도 진행률 유지; 인간 할 일은 한 문서에서 추적  
**대안:** 작업 중단만 (ADR-010) — 채택 안 함  
**영향:** `28_*`, `25`, `23`, `starter.txt` §0·§15

---

## ADR-010 — 2026-05-19 — 인간 협업 시 작업 중단·채팅 요청 (폐기)

**상태:** ADR-011로 대체 (중단 → 28번 기록 + 계속 진행)

---

## ADR-009 — 2026-05-19 — 세션 계획 파일 시분초·순번 명명

**결정:** 계획은 `plans/YYMMDD-N.md` 로 **세션마다 새 파일** 추가; 각 파일 상단에 `계획 생성 시각: YYYY-MM-DD HH:mm:ss`. `current_session_plan.md`는 인덱스만(덮어쓰기 금지).  
**이유:** 단일 파일 덮어쓰기 시 이전 계획 이력 소실; 시간순 추적·감사 필요  
**대안:** `archive/` 만 사용 — 인간이 최신 파일 찾기 어려움  
**영향:** `starter.txt` §0, `plans/README.md`, `_TEMPLATE.md`, ADR-008 보완

---

## ADR-008 — 2026-05-19 — 세션 계획을 문서로 제출

**결정:** 업무 계획은 `doc/for_agent/plans/` 마크다운에 작성; 채팅에는 경로·한 줄 요약만 (→ ADR-009로 `YYMMDD-N.md` 분리)  
**이유:** 채팅에 계획을 올리면 대화가 길어지며 계획이 위로 밀림; Plan 모드와 유사하게 에디터 탭에 고정  
**대안:** 채팅 전문 출력 — 유지보수·승인 UX 나쁨  
**영향:** `starter.txt` §0, `23_agent_operating_rules.md`, `plans/` 폴더

---

## ADR-007 — 2026-05-19 — `mock-data.ts` → `supabase-api.ts`

**결정:** 데이터 facade 파일명을 `supabase-api.ts`로 변경  
**이유:** Mock이 아닌 Supabase 연동임을 코드·온보딩에서 명확히 (K-009, TD-001)  
**영향:** `src/app/api/*` import 11곳, doc 전체, README

---

## ADR-004 — 2026-05-19 — Course-scoped 라우팅 통합 ✅

**결정:** 팀·학생 경로는 `/app/courses/:courseId/...` 로 통일  
**이유:** vision.md 수업 단위 협업, 중복 라우트 제거  
**구현:** `CourseScopedRedirect`, `routes.tsx` (T-004 done)

---

## 템플릿 (새 ADR 추가 시)

```
## ADR-NNN — YYYY-MM-DD — 제목
**결정:**
**이유:**
**대안:**
**영향:**
```
