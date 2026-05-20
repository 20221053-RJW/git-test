# 12 — 디자인 시스템

> **관련:** `08_frontend.md` · `default_shadcn_theme.css` · `src/styles/`

## 기반

- **Shadcn UI** + **Radix** primitives (`src/app/components/ui/`)
- **Tailwind CSS 4**
- **Figma** — 초기 화면 import (`src/imports/`, 점진 제거)

## 색상 (현재 코드 기준)

| 토큰 | 값 | 용도 |
|------|-----|------|
| Primary Blue | `#3676ff`, `#155dfc` | CTA, active nav |
| Nav background | `bg-black` | Navigation |
| Page background | `bg-gray-50` | 본문 |
| Card | `bg-white` | 카드 |

## 타이포·간격

- Tailwind 유틸리티 우선
- 카드: `rounded-xl`, `shadow-2xl` (모달)
- 진행률 바: `h-2` / `h-3`

## 컴포넌트

- `Button`, `Card`, `Dialog`, `Avatar`, `Badge`, `Progress` 등 — ui 폴더
- 페이지별 커스텀: Teams 카드 그라데이션 헤더 등

## 반응형

- 그리드: `grid-cols-1 md:grid-cols-2 lg:grid-cols-5` (팀 목록 5열)

## 디자인 결정 필요 (인간)

- 최종 브랜드 컬러·로고
- 다크모드 여부 (`next-themes` 의존성 존재)
- A4 리포트 인쇄 스타일

## 규칙

- 새 UI는 Shadcn 패턴 따르기
- 인라인 hex 남발 지양 → CSS 변수화 (향후)
