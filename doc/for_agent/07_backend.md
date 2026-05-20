# 07 — 백엔드

> **관련:** `09_database.md` · `11_api_spec.md` · `src/app/contexts/AuthContext.tsx`

## 현재 상태

| 구성요소 | 상태 |
|----------|------|
| Express + swagger-jsdoc | package.json에만 존재, 서버 미구현 |
| Firebase Auth | `src/app/firebase.ts` (`VITE_*`) |
| Supabase Client | `src/app/supabase.ts` |
| 데이터 facade | `supabase-api.ts`, `ai-report.ts` → Supabase `ai_*` |
| Edge Function | `generate-report` (501 스텁) |

## 인증 플로우 (구현됨)

```
Client → Firebase signIn/signUp
       → onAuthStateChanged(firebase uid)
       → Supabase ai_users … eq('firebase_uid', uid)
       → AuthContext profile
```

`/app/*` → `ProtectedRoute` → 미로그인 시 `/signin`

## API 레이어

**현재:** Supabase PostgREST 직접 호출 (facade 경유)  
**계획:** AI 리포트용 Edge Function 또는 Express BFF

## 다음 작업

1. RLS 검증·적용 (`22_security_notes.md`, H-001)
2. Edge `generate-report` LLM (H-002)
3. (선택) Express — AI 프록시만

## 주의

- LLM API 키는 클라이언트에 두지 말 것
- `.env`는 gitignore — `.env.example` 참고
