# 자주 하는 실수

> **관련:** `doc/for_agent/15_known_issues.md` · `doc/for_human/28_human_action_items.md`

## 1. API 키를 카톡·깃허브에 올림

- **위험:** 다른 사람이 내 계정으로 API 사용 → 요금 폭탄  
- **올바름:** `.env` 파일만 로컬에, 또는 비밀 관리 메뉴  

## 2. vision.md를 AI에게 수정시킴

- vision.md는 **사람만** 수정합니다 (철학 문서).

## 3. “배포됐다”고 생각하는데 localhost만 열림

- `pnpm dev`는 **내 컴퓨터 전용**입니다.

## 4. DB에 데이터가 없는데 “버그”라고 생각함

`supabase-api.ts`는 Supabase를 호출합니다. 빈 화면이면 **row 없음**·RLS·`.env` 를 확인하세요.

## 5. src/imports에 새 기능 추가

- Figma 자동 생성물이라 유지보수가 어렵습니다.  
- 새 화면은 `src/app/pages/`.

## 6. 로그인 없이 /app 주소 공유

- `ProtectedRoute`로 `/app`은 로그인 필요. RLS는 H-001 적용 전까지 DB 직접 접근에 주의.

## 7. 문서 안 읽고 “다 됐다”고 생각

- UI ~75% ≠ 서비스 완성 (~52%).  
- `01_project_status.md`·`28_human_action_items.md`를 확인하세요.

## 8. AI에게 애매하게 “다 해줘”

- “T-002 courses Supabase 연동해줘, doc 갱신해줘”처럼 **구체적으로**.
