# 로그인·인증 시스템

> **관련:** `doc/for_agent/22_security_notes.md` · `doc/for_human/19_security_basics.md`

## 무엇을 하나?

- 회원가입 / 로그인 / 로그아웃  
- “지금 누가 쓰고 있는지” 앱 전체에 알림  
- 학생 / 교수 / 관리자 구분  

## 어떻게?

1. **Firebase Authentication**  
   - 이메일 + 비밀번호로 가입  
   - 성공하면 고유 ID(uid) 발급  

2. **Supabase `ai_users` 테이블**  
   - uid와 같은 id로 이름, 전공, role 저장  

3. **AuthContext (React)**  
   - 로그인하면 `user` 객체가 생김  
   - 다른 페이지에서 `useAuth()`로 이름·역할 사용  

## 파일 위치

- `src/app/firebase.ts` — Firebase 연결  
- `src/app/supabase.ts` — DB 연결  
- `src/app/contexts/AuthContext.tsx` — 로직 전체  

## 보호 라우트

- `ProtectedRoute` — `/app` 이하는 로그인 없으면 로그인 화면으로 이동  
- `CourseScopedRedirect` — 수업 URL 정규화  

## 아직 부족한 점

- DB RLS 최종 적용 (H-001)  
- 비밀번호 찾기, 이메일 인증은 미구현일 수 있음  

## 당신이 할 일

Firebase 콘솔에서 프로젝트 만든 사람이 **관리자**입니다.  
AI가 “Firebase에서 Authentication 켜주세요”라고 하면 콘솔 → Build → Authentication → Sign-in method → 이메일 활성화.

보안: `19_security_basics.md`
