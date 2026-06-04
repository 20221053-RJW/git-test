# 프론트엔드 쉽게 이해하기

> **관련:** `doc/for_agent/08_frontend.md` · `doc/for_human/06_folder_structure.md`

**프론트엔드** = 사용자가 보는 **웹 화면 전부**.

## 쓰는 기술 (이름만 알아두기)

| 이름 | 역할 | 비유 |
|------|------|------|
| React | 화면을 조각(컴포넌트)으로 조립 | 레고 |
| TypeScript | 실수 줄이는 JavaScript | 맞춤 설명서 있는 레고 |
| Vite | 개발할 때 빠르게 보여 주는 도구 | 공사 현장 가설 |
| Tailwind | 디자인 클래스 이름 | 인테리어 스티커 |
| React Router | 주소별 다른 화면 | 건물 안내 표지판 |

## 페이지 예시

- `LandingPage.tsx` — 첫 화면  
- `CoursesPage.tsx` — 수업 목록  
- `TeamsPage.tsx` — 팀 목록  
- `MyPage.tsx` — 마이페이지  

## `components/ui/` 란?

버튼, 입력창, 다이얼로그 같은 **공통 부품 창고**입니다. Shadcn UI라는 유명한 부품 세트를 씁니다.

## 읽기 vs 쓰기

화면(프론트)은 **창문**, Supabase는 **창고**입니다.  
**목록·등록**은 `supabase-api.ts`·`ai-report.ts`로 Supabase와 연결됩니다.  
**마이페이지 리포트**는 `AiReportPrintView.tsx`로 A4 인쇄까지 지원합니다.

## 실행

```bash
pnpm dev
```

코드 한 줄 예시 (버튼 누르면 화면 바뀜):

```tsx
function Hello() {
  return <h1>안녕하세요</h1>;
}
```

`return` 안의 HTML 비슷한 것을 **JSX**라고 부릅니다.

더 보기: `doc/for_agent/08_frontend.md`
