# 백엔드 쉽게 이해하기

> **관련:** `doc/for_agent/07_backend.md`

**백엔드** = 사용자 눈에 안 보이지만, **로그인·저장·규칙**을 처리하는 뒷부분.

## 우리 프로젝트의 뒷부분 구성

| 서비스 | 하는 일 |
|--------|---------|
| **Firebase** | 이메일/비밀번호 로그인 |
| **Supabase** | 프로필·수업·팀 데이터 저장 (PostgreSQL) |
| **(나중) Express** | 복잡한 API·AI 호출 중계 (아직 거의 없음) |

## 비유: 아파트 경비 + 우편함

- Firebase = 출입 카드 발급  
- Supabase = 각 집(사용자) 우편함 + 공용 게시판 DB  

## supabase-api.ts란?

**Supabase 메뉴판**입니다.  
`api.courses.getAll()` 같은 호출이 `ai_courses` 등을 조회합니다.

## 아직 부족한 부분

- DB 보안(RLS) 최종 적용
- AI 문단 생성(Edge + OpenAI 키)
- 채팅 실시간

## Express / Swagger는?

package.json에 이름만 있고 **아직 서버 프로그램은 안 돌아갑니다**.  
AI 요약처럼 비밀 키가 필요한 일은 나중에 여기서 처리할 수 있습니다.

기술 상세: `doc/for_agent/07_backend.md`
