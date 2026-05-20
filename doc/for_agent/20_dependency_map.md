# 20 — 의존성 맵

> **관련:** `01_architecture.md` · `19_folder_structure.md`

```
pages/*
  → components/ui/*, AiReportPrintView
  → types/index.ts, types/ai-report.ts
  → api/supabase-api.ts, api/ai-report.ts
  → contexts/AuthContext (일부)

AuthContext
  → firebase/auth
  → supabase (ai_users)
  → types

routes.tsx
  → pages/*, MainLayout
  → Navigation (MainLayout)

MainLayout
  → Navigation, Outlet
```

## 외부 서비스

| 패키지 | 용도 |
|--------|------|
| firebase | Auth |
| @supabase/supabase-js | DB |
| react-router | 라우팅 |
| @radix-ui/* | UI primitives |
| lucide-react | 아이콘 |

## 미연결 / 레거시

- express, swagger-ui-express — 미사용
- firebase/analytics — 초기화만

## 변경 영향 가이드

| 변경 | 영향 |
|------|------|
| types/index.ts | 전 페이지 |
| AuthContext | 로그인·프로필·역할 UI |
| routes.tsx | 전체 URL·북마크 |
| supabase-api.ts | Supabase facade — 대부분 페이지 |
