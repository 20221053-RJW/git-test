# 성능 — 빠르게 느끼게 하기

> **관련:** `doc/for_agent/02_current_state.md` (Beta 이후 항목)

## 지금 단계에서 우선순위

성능 최적화는 **Beta 이후**가 일반적입니다.  
지금은 기능·DB 연결이 먼저입니다.

## 이미 도움이 되는 것

- **Vite** — 개발 시 빠른 새로고침  
- **React** — 바뀐 부분만 다시 그림  

## 나중에 할 일

| 기법 | 효과 |
|------|------|
| 이미지 압축 | 로딩 빠름 |
| 코드 분할 (lazy load) | 첫 화면만 먼저 |
| React Query 캐시 | 같은 API 반복 호출 감소 |
| Supabase 인덱스 | DB 조회 빠름 |

## Figma imports 주의

`src/imports/` 파일이 많으면 **앱이 무거워질 수 있음** → 점진 정리 (기술 부채).

## 측정

배포 후 Lighthouse (Chrome 개발자 도구)로 점수 확인.  
목표 수치는 Launch 전에 팀이 정합니다.
