# 데이터가 흐르는 전체 그림

> **관련:** `doc/for_agent/20_dependency_map.md` · `doc/for_human/05_how_this_system_works.md`

## 시나리오: 팀 목록 보기 (현재 — Supabase)

```
[사용자] 수업 선택 → 사이드 "팀" 클릭
    ↓
[React Router] /app/courses/:courseId/teams
    ↓
[TeamsPage] 마운트
    ↓
[supabase-api.ts] api.teamCards.getAll(courseId) 등
    ↓
[Supabase] ai_teams, ai_team_members …
    ↓
[화면] 팀 카드 렌더링
```

## 시나리오: 로그인

```
[SignInPage] 이메일·비밀번호
    ↓
[Firebase] signInWithEmailAndPassword
    ↓
[AuthContext] uid
    ↓
[Supabase] ai_users WHERE firebase_uid = uid
    ↓
[전역 state] user = { name, role, ... }
    ↓
[ProtectedRoute] /app 허용
```

## 시나리오: 질문 새로 쓰기 (현재)

```
[QnAPage] 작성 폼 → api.questions.create()
    ↓
[Supabase] INSERT ai_questions
    ↓
[RLS] 수강생만 허용 (정책 적용은 H-001)
```

## 시나리오: AI 리포트 (부분 완료)

```
[MyPage] 리포트 탭
    ↓
[ai-report.ts] gatherContext → 팀·트러블슈팅·프로젝트 집계
    ↓
[AiReportPrintView] A4 인쇄 (PAGE 01~03)
    ↓
(선택) generateReport → Edge LLM — 키 필요 (H-002)
```

## 한 줄 요약

**화면 → api facade → Supabase → 화면** (쓰기·리포트 집계 대부분 연결됨)
