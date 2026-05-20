# 01 — 아키텍처

> **관련:** `19_folder_structure.md` · `20_dependency_map.md` · `08_frontend.md` · `07_backend.md` · `11_api_spec.md`

## 시스템 구성

```
[Browser]
    │
    ▼
[React SPA (Vite)] ── Firebase Auth
    │
    ├── Supabase PostgREST (ai_*)
    ├── api/supabase-api.ts + api/ai-report.ts
    └── Supabase Edge generate-report (스텁)
```

## 현재 vs 목표

| 레이어 | 현재 | 목표 |
|--------|------|------|
| UI | React SPA | 동일 |
| Auth | Firebase + `ai_users` + ProtectedRoute | RLS 강화 |
| API | Supabase facade, CRUD 대부분 | 동일 |
| Realtime | 없음 | 채팅 |
| AI | DB 집계 + A4; Edge LLM 대기 | 서버 LLM |

## 프론트엔드 레이어

```
App → AuthProvider → RouterProvider
  ProtectedRoute (/app)
    MainLayout → pages/*
  api/supabase-api.ts → Supabase
  api/ai-report.ts → gatherContext / Edge
```

## 데이터 흐름 (인증)

1. Firebase `signIn` / `onAuthStateChanged`
2. `ai_users` where `firebase_uid` = uid
3. `ai_course_memberships` 로 수업 범위

## 배포 (준비)

- `vercel.json` — SPA rewrite, `dist` (실행 H-005)
