# 왜 이렇게 설계했나요?

> **관련:** `doc/for_agent/01_architecture.md` · `doc/for_agent/06_decision_log.md`

## React + Vite

- **이유:** 화면을 부품처럼 나누기 쉽고, 개발 속도가 빠름  
- **대안:** Next.js — SEO·서버 렌더링이 더 필요할 때 검토  

## Tailwind + Shadcn

- **이유:** Figma 디자인을 빠르게 코드로 옮김, 일관된 UI  
- **대안:** CSS만 — 느리지만 단순  

## Firebase Auth + Supabase DB

- **이유:** 로그인은 Firebase가 익숙하고, 표 데이터·권한은 Supabase가 편함  
- **대안:** Supabase Auth 하나로 통일 — 나중에 단순화 가능 (기술 부채 TD-005)  

## Facade (supabase-api.ts)

- **이유:** DB 설계 전에 화면·UX 검증 → Supabase `ai_*` **읽기·쓰기 facade** (`supabase-api.ts`, `ai-report.ts`)  
- **비용:** 파일명이 “가짜”처럼 보여 혼동 (TD-001, K-009)  

## Course 단위 URL

- **이유:** vision — “같은 수업” 안에서 협업·공유  
- **예:** `/app/courses/abc123/teams`  

## 문서 이원화 (for_agent / for_human)

- **이유:** AI는 짧은 스캔, 사람은 긴 설명이 필요 (doit.md)  

## 멀티 에이전트 가정

- **이유:** 프론트·DB·AI를 **동시에** 다른 AI가 맡을 수 있게 문서로 경계  

심화: `doc/for_agent/01_architecture.md`, `06_decision_log.md`
