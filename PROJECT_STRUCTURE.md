# CampusConnect - 프로젝트 구조

## 개요
CampusConnect는 학생들의 팀 프로젝트 협업을 위한 올인원 플랫폼입니다.

## 아키텍처

### 확장 가능한 설계 원칙
이 프로젝트는 향후 추가될 기능과 페이지를 쉽게 통합할 수 있도록 설계되었습니다.

### 디렉토리 구조

```
src/
├── app/
│   ├── App.tsx                    # 메인 앱 컴포넌트 (RouterProvider)
│   ├── routes.tsx                 # 라우팅 설정
│   ├── components/                # 재사용 가능한 컴포넌트
│   │   ├── Navigation.tsx         # 네비게이션 바
│   │   ├── ui/                    # UI 컴포넌트 라이브러리
│   │   └── figma/                 # Figma 관련 컴포넌트
│   ├── layouts/                   # 레이아웃 컴포넌트
│   │   └── MainLayout.tsx         # 메인 레이아웃 (Navigation + Outlet)
│   └── pages/                     # 페이지 컴포넌트
│       ├── LandingPage.tsx        # 랜딩 페이지
│       ├── CoursesPage.tsx        # 수강 과목 페이지
│       ├── StudentProfilePage.tsx # 학생 프로필 페이지
│       ├── ProfessorProfilePage.tsx # 교수 프로필 페이지
│       ├── RandomTeamPage.tsx     # 랜덤 팀 생성 페이지
│       ├── OtherStudentProfilePage.tsx # 다른 학생 프로필 페이지
│       └── NotFoundPage.tsx       # 404 페이지
├── imports/                       # Figma에서 가져온 컴포넌트
└── styles/                        # 전역 스타일
```

## 라우팅 구조

### 현재 라우트
- `/` - 랜딩 페이지
- `/app` - 메인 앱 레이아웃
  - `/app/courses` - 수강 과목 목록
  - `/app/courses/:id` - 과목 상세
  - `/app/profile` - 내 프로필
  - `/app/profile/professor` - 교수 프로필
  - `/app/teams` - 팀 목록 (신규)
  - `/app/teams/:id` - 팀 상세 (신규)
  - `/app/teams/random` - 랜덤 팀 생성
  - `/app/students/:id` - 다른 학생 프로필
  - `/app/projects` - 프로젝트 목록
  - `/app/qna` - Q&A 게시판
- `*` - 404 페이지

### 새로운 페이지 추가 방법

1. **페이지 컴포넌트 생성**
   ```tsx
   // src/app/pages/NewPage.tsx
   export default function NewPage() {
     return <div>새 페이지</div>;
   }
   ```

2. **라우트 추가**
   ```tsx
   // src/app/routes.tsx
   import NewPage from "./pages/NewPage";
   
   // children 배열에 추가
   {
     path: "new-page",
     Component: NewPage,
   }
   ```

3. **네비게이션 추가 (선택사항)**
   ```tsx
   // src/app/components/Navigation.tsx
   const navItems: NavItem[] = [
     // ...
     { label: "새 페이지", path: "/app/new-page" },
   ];
   ```

## 데이터 관리

### 현재 상태
- 모든 데이터는 Mock 데이터로 구현됨
- 각 페이지 컴포넌트 내부에서 useState로 관리

### 향후 확장 계획
1. **API 통합**
   - `src/api/` 디렉토리 생성
   - API 클라이언트 및 엔드포인트 정의
   
2. **상태 관리**
   - React Context API 또는 Zustand/Redux 도입
   - `src/store/` 또는 `src/contexts/` 디렉토리

3. **데이터 페칭**
   - React Query 또는 SWR 도입
   - 서버 상태와 클라이언트 상태 분리

## 추가 예정 기능

### 계획된 페이지
- `/app/projects` - 팀 프로젝트 목록
- `/app/projects/:id` - 프로젝트 상세
- `/app/qna` - Q&A 게시판
- `/app/qna/:id` - Q&A 상세
- `/app/notifications` - 알림
- `/app/settings` - 설정

### 계획된 기능
- 사용자 인증 (로그인/로그아웃)
- 실시간 채팅
- 파일 업로드
- 알림 시스템
- 검색 기능

## 기술 스택
- React 18.3.1
- React Router 7
- TypeScript
- Tailwind CSS 4
- Vite 6

## 개발 가이드라인

### 컴포넌트 작성 규칙
1. 함수형 컴포넌트 사용
2. TypeScript 타입 정의
3. Props는 interface로 정의
4. 재사용 가능한 컴포넌트는 `components/`에 배치

### 스타일링 규칙
1. Tailwind CSS 우선 사용
2. 커스텀 CSS는 필요한 경우에만 사용
3. 반응형 디자인 고려 (모바일 퍼스트)

### 파일 명명 규칙
- 컴포넌트: PascalCase (예: `StudentProfile.tsx`)
- 유틸리티: camelCase (예: `formatDate.ts`)
- 상수: UPPER_SNAKE_CASE (예: `API_ENDPOINTS.ts`)
