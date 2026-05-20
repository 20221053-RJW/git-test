# 19 — 폴더 구조

> **관련:** `20_dependency_map.md` · `08_frontend.md` · `01_architecture.md`

```
git-test/
├── vision.md
├── doit.md
├── vercel.json              # SPA 배포 설정 (미연결)
├── doc/
│   ├── starter.txt
│   ├── for_agent/           # 00~28, plans/, rls_review_packet.md
│   └── for_human/           # 00~28
├── supabase/
│   ├── migrations/          # RLS Beta 초안 (미적용)
│   ├── functions/generate-report/
│   └── seed/                # archived_courses_kim_student.sql 등
├── .github/workflows/e2e.yml
├── src/app/
│   ├── api/supabase-api.ts, ai-report.ts
│   ├── components/          # Navigation, AiReportPrintView, ui/
│   ├── contexts/AuthContext.tsx
│   ├── pages/
│   ├── routes.tsx
│   ├── firebase.ts, supabase.ts
│   └── types/ai-report.ts
├── tests/e2e/
├── playwright.config.ts
└── package.json
```

## 수정 빈도 높은 경로

| 작업 | 경로 |
|------|------|
| 새 페이지 | `pages/` + `routes.tsx` |
| 데이터 | `api/supabase-api.ts` |
| AI 리포트 | `api/ai-report.ts`, `types/ai-report.ts` |
| 인증 | `contexts/AuthContext.tsx` |
| E2E | `tests/e2e/` |
| 세션 계획 | `doc/for_agent/plans/YYMMDD-N.md` |
| 인간 할 일 | `doc/for_human/28_human_action_items.md` |
