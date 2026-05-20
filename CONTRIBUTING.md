# 기여 가이드

CampusConnect 프로젝트에 기여해주셔서 감사합니다!

## 시작하기 전에

1. 프로젝트 구조를 이해하기 위해 `PROJECT_STRUCTURE.md`를 읽어주세요
2. 코딩 규칙과 스타일 가이드를 확인해주세요
3. 기존 코드의 패턴을 따라주세요

## 개발 워크플로우

### 1. 브랜치 전략

```bash
main          # 프로덕션 브랜치
├── develop   # 개발 브랜치
    ├── feature/기능명
    ├── bugfix/버그명
    └── hotfix/핫픽스명
```

### 2. 브랜치 생성

```bash
# 기능 개발
git checkout -b feature/new-feature

# 버그 수정
git checkout -b bugfix/fix-issue

# 긴급 수정
git checkout -b hotfix/critical-fix
```

### 3. 커밋 메시지 규칙

```
타입: 간단한 설명

상세 설명 (선택사항)

관련 이슈: #123
```

**타입 종류:**
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가
- `chore`: 빌드 설정 등

**예시:**
```bash
git commit -m "feat: 프로젝트 상세 페이지 추가"
git commit -m "fix: 팀 생성 시 멤버 수 버그 수정"
git commit -m "docs: README에 설치 가이드 추가"
```

## 코드 작성 규칙

### 1. TypeScript

```tsx
// ✅ 좋은 예
interface UserProps {
  id: string;
  name: string;
  email: string;
}

export default function UserCard({ id, name, email }: UserProps) {
  // ...
}

// ❌ 나쁜 예
export default function UserCard(props: any) {
  // ...
}
```

### 2. 컴포넌트 구조

```tsx
// 1. Imports
import { useState, useEffect } from "react";
import { Link } from "react-router";
import type { MyType } from "../types";

// 2. Types/Interfaces
interface MyComponentProps {
  // ...
}

// 3. Component
export default function MyComponent({ prop }: MyComponentProps) {
  // 3-1. Hooks
  const [state, setState] = useState();
  
  // 3-2. Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 3-3. Handlers
  const handleClick = () => {
    // ...
  };
  
  // 3-4. Render
  return (
    <div>
      {/* ... */}
    </div>
  );
}
```

### 3. 스타일링

```tsx
// ✅ Tailwind 사용
<div className="bg-white rounded-lg shadow-md p-6">
  <h1 className="text-2xl font-bold text-gray-900">제목</h1>
</div>

// ✅ 조건부 클래스
<button 
  className={`px-4 py-2 rounded ${
    isActive ? 'bg-blue-600 text-white' : 'bg-gray-200'
  }`}
>
  버튼
</button>
```

### 4. 상태 관리

```tsx
// ✅ 타입이 명확한 초기값
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);

// ✅ API 호출 패턴
useEffect(() => {
  api.users.getById(id).then((data) => {
    setUser(data || null);
    setLoading(false);
  });
}, [id]);
```

## 새로운 기능 추가하기

### 1. 새로운 페이지

```bash
# 1. 페이지 컴포넌트 생성
src/app/pages/NewPage.tsx

# 2. 타입이 필요하면 추가
src/app/types/index.ts

# 3. 라우트 등록
src/app/routes.tsx

# 4. 네비게이션 추가 (필요시)
src/app/components/Navigation.tsx
```

### 2. 새로운 API

```bash
# Supabase API facade에 메서드 추가
src/app/api/supabase-api.ts
```

### 3. 새로운 커스텀 Hook

```bash
# Hook 생성
src/app/hooks/useMyHook.ts
```

## Pull Request 프로세스

### 1. PR 생성 전 체크리스트

- [ ] 코드가 정상적으로 실행되는가?
- [ ] TypeScript 에러가 없는가?
- [ ] 코딩 규칙을 따랐는가?
- [ ] 불필요한 console.log가 없는가?
- [ ] 주석이 필요한 부분에 추가했는가?

### 2. PR 제목

```
[타입] 간단한 설명

예:
[Feature] 프로젝트 상세 페이지 추가
[Bugfix] 팀 생성 버그 수정
[Refactor] API 호출 로직 개선
```

### 3. PR 설명 템플릿

```markdown
## 변경 사항
- 추가/수정/삭제된 내용

## 테스트 방법
1. 단계별 테스트 방법

## 스크린샷 (UI 변경 시)
[스크린샷 첨부]

## 관련 이슈
Closes #123
```

## 리뷰 프로세스

1. 최소 1명의 리뷰어 승인 필요
2. 모든 코멘트 해결
3. CI 통과 (추후 추가)
4. Squash and Merge

## 질문이 있으신가요?

- 이슈 생성: GitHub Issues
- 디스커션: GitHub Discussions
- 이메일: support@campusconnect.com

감사합니다! 🙏
