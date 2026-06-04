# 문제가 생겼을 때 — 디버깅 가이드

> **관련:** `doc/for_agent/14_testing.md` · `doc/for_agent/15_known_issues.md`

## 1. 화면이 안 뜬다

```bash
pnpm install
pnpm dev
```

- 터미널에 빨간 에러가 있는지 확인  
- 브라우저 주소가 `http://localhost:5173` 인지 확인  

## 2. 로그인이 안 된다

- 이메일 형식 맞는지  
- Firebase 콘솔에서 해당 사용자가 있는지  
- Supabase `ai_users`에 같은 id 행이 있는지 (Table Editor)  

## 3. 데이터가 새로고침하면 사라진다

→ DB 테이블에 **row가 없으면** 빈 화면일 수 있습니다. `.env`·RLS·로그인도 확인하세요.

## 4. 브라우저 개발자 도구

- **F12** → Console 탭: 빨간 에러 메시지  
- Network 탭: API 요청이 실패(빨간 줄)했는지  

스크린샷을 AI에게 주면 원인 파악이 빨라집니다.

## 5. AI에게 부탁할 때 포함할 것

- 무엇을 했는지 (클릭 순서)  
- 기대한 결과 vs 실제 결과  
- Console 에러 전문  
- `doc/for_agent/02_current_state.md` 읽고 작업해달라고 하기  

## 6. 테스트 자동화

```bash
pnpm exec playwright test
```

E2E 테스트가 실패하면 `tests/` 폴더와 리포트를 확인합니다.
