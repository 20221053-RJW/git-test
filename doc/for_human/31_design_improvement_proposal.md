# CampusConnect UI 디자인 개선안 (제출)

> **작성:** 프로덕트 디자인 담당 (`doc/for_agent/18_product_design.md`)  
> **일자:** 2026-05-22  
> **기술 상세:** `doc/for_agent/12_design_system.md`

인간이 읽기 쉬운 요약입니다. 코드 반영은 2026-05-22 1차 적용 완료.

---

## 1. 벤치마크한 상용 서비스

| 서비스 | 참고한 점 | CampusConnect에 적용 |
|--------|-----------|----------------------|
| [Linear](https://linear.app) | 밝은 네비, 얇은 보더, Primary만 강조 | 상단 바 라이트화, 사이드 네비 카드화 유지 |
| [Notion](https://notion.so) | 여백·회색 단계·제목 계층 | PageHeader(제목+부제), 섹션 카드 |
| [Stripe Dashboard](https://dashboard.stripe.com) | 타이포 중심 계층, 절제된 색 | 본문 slate 톤, 데이터 카드 흰 배경 |
| [Slack](https://slack.com) | 채널/팀 맥락이 헤더에 명확 | 팀 워크스페이스에 팀명·프로젝트명 표시 |

출처: [How Stripe, Linear, and Vercel Ship Premium UI](https://mantlr.com/blog/stripe-linear-vercel-premium-ui), B2B 대시보드 레이아웃 연구(정보 계층·Z패턴).

---

## 2. 현재 문제 (AS-IS)

1. **색이 여러 개** — `#155dfc`, `#3676ff`, `blue-600`, `bg-black` 네비가 한 화면에 섞임  
2. **페이지마다 배경이 다름** — `gray-50`, `#f0f0f0`, `#f3f4f6` 혼재  
3. **제목 스타일 불일치** — 어떤 화면은 team id, 어떤 화면은 한글 팀명  
4. **카드 테두리·그림자 제각각** — 가독성은 되나 “한 제품” 느낌이 약함  

---

## 3. 개선 방향 (TO-BE)

### 3.1 디자인 토큰 (전역)

- Primary: `#155dfc`  
- 페이지 배경: 연한 slate (`#f1f5f9`)  
- 카드: 흰색 + `1px` border + 약한 shadow  
- 텍스트: 제목 `#0f172a`, 본문 `#475569`, 보조 `#64748b`  

→ `src/styles/campus-connect-tokens.css` 에 정의

### 3.2 상단 네비게이션

- **Before:** 검정 바 + 두꺼운 파란 하단선  
- **After:** 흰 배경 + 하단 보더, 로고·사용자 영역만 유지 (SaaS 일반형)

### 3.3 페이지 헤더 패턴

모든 주요 화면 공통:

1. 뒤로가기(선택)  
2. **페이지 제목** (24~30px, bold)  
3. **한 줄 설명** (프로젝트명·수업명)  
4. 오른쪽 **주요 버튼 1~2개**  

→ `PageHeader` 컴포넌트, 팀 워크스페이스에 1차 적용

### 3.4 섹션 카드

트러블슈팅·산출물 등 블록을 `SectionCard`로 감싸 제목·설명·본문 구분.

---

## 4. 1차 구현 완료 항목 (코드)

| 항목 | 파일 |
|------|------|
| 디자인 토큰 | `src/styles/campus-connect-tokens.css` |
| 페이지 헤더 | `src/app/components/layout/PageHeader.tsx` |
| 섹션 카드 | `src/app/components/layout/SectionCard.tsx` |
| 네비 라이트 | `src/app/components/Navigation.tsx` |
| 레이아웃 배경 | `src/app/layouts/MainLayout.tsx` |
| 팀 워크스페이스 | `src/app/pages/TeamDetailPage.tsx` |
| 디자인 담당 문서 | `doc/for_agent/18_product_design.md` |

---

## 5. 2차 제안 (인간 검토 후)

| 우선순위 | 내용 |
|----------|------|
| 높음 | 수업 목록·강의 개요·수강자 네트워크에 PageHeader 적용 |
| 높음 | 버튼 색 `blue-600` → 토큰 Primary 일괄 변경 |
| 중간 | 팀 카드 그라데이션 헤더 유지하되 본문만 토큰 정렬 |
| 중간 | 포커스·disabled·loading 상태 shadcn 통일 |
| 낮음 | 다크 모드 (보류) |

---

## 6. 확인 방법

1. `npm run dev`  
2. 로그인 → 수업 → 팀 → **입장하기**  
3. 상단: **팀 이름·프로젝트 제목** / 네비: **흰색 상단 바** / 배경: **연한 회색 통일**  

---

## 7. 에이전트 담당자

`doc/for_agent/24_multi_agent_roles.md` 에 **디자인** 역할이 있으며, 상세 운영은 **`18_product_design.md`** (신규)를 정본으로 합니다.
