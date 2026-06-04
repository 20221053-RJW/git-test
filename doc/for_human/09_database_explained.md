# 데이터베이스 쉽게 이해하기

> **관련:** `doc/for_agent/09_database.md` · `supabase/seed/`

**데이터베이스(DB)** = 데이터 창고. 우리는 **Supabase**(PostgreSQL)를 씁니다.

## 테이블 = 시트 (실제 이름)

| 테이블 | 내용 |
|--------|------|
| ai_users | 사용자 (Firebase uid는 `firebase_uid` 열) |
| ai_courses | 수업 |
| ai_course_memberships | 누가 어떤 수업을 듣는지 |
| ai_teams | 1조, 2조… |
| ai_questions | Q&A |
| ai_team_detail_troubleshooting_logs | 팀별 트러블슈팅 기록 |

앱은 위 **`ai_`로 시작하는 표**를 주로 씁니다.

## 로그인과 DB

- Firebase: 출입증
- Supabase: 프로필·수업·팀 표
- 연결: Firebase uid = `ai_users.firebase_uid`

## RLS

“남의 수업 데이터는 못 본다” 같은 규칙. 켜져 있으나 **세부 검증은 진행 중**(T-011).

## supabase-api.ts · ai-report.ts

- `supabase-api.ts` — 수업·팀·Q&A CRUD  
- `ai-report.ts` — 마이페이지 리포트 집계  

기술: `doc/for_agent/09_database.md`
