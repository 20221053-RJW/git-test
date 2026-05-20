# API 쉽게 이해하기

> **관련:** `doc/for_agent/11_api_spec.md`

**API** = 화면이 데이터를 주문하는 **메뉴판**.

## 우리 프로젝트

`src/app/api/supabase-api.ts` 안의 `api` 객체가 메뉴판입니다.

```ts
api.courses.getAll()      // 수업 목록
api.teamCards.getAll()  // 팀 카드
api.questions.getAll()  // Q&A
```

모든 `api.*` 호출은 **Supabase DB**(`ai_*` 테이블)에서 데이터를 가져옵니다.

## 흐름

```
화면 → api.courses.getAll() → Supabase ai_courses → 화면에 표시
```

## 추가 메뉴

- `api.questions.create` 등 **쓰기** CRUD
- `api.aiReport.gatherContext` — 리포트 집계
- `api.aiReport.generateReport` — Edge (키 필요)

명세: `doc/for_agent/11_api_spec.md`
