# 11 — API 명세

> **관련:** `src/app/api/supabase-api.ts` · `07_backend.md`  
> Supabase `ai_*` 테이블 조회 facade. 화면은 `api.*` 만 호출합니다.

## `api` 객체 (실제 export, 2026-05-19)

```ts
export const api = {
  navigation: { getPrimaryCourseId, getTeamCourseId },
  auth: { getPageSummary },
  courses: { getAll, getById, create, archive },
  students: { getAll, getById },
  professors: { getById },
  teamCards: { getAll },
  teamStages: { getAll, getByCourse },
  announcements: { getAll },
  studentNetwork: { getStudents, getExtras, getTeamKeywords, getEditForm, saveProfile },
  myPage: {
    getProjects,
    getProjectsForUser,
    getProfile,
    getSideNavItems,
    getReportStats,
    getReportHeader,
  },
  teamDetail: {
    getFeedbackOptions, getChatMessages, getPeerReviewStudents,
    getReviewKeywords, getTeammates, getTroubleshootingLogs,
    getDeliverables, uploadDeliverable, deleteDeliverable,
  },
  projects: { getAll },
  memberships: { joinByCode },
  teams: { saveRandomAssignment },
  questions: {
    getAll, getById, create, update, delete,
    createAnswer, updateAnswer, deleteAnswer, acceptAnswer,
  },
  aiReport: {
    gatherContext,
    buildDraftFromContext,
    generateReport,
  },
};
```

## `questions.create`

- 입력: `title`, `content`, `courseId?`, `tags?`
- 권한: `getAccessibleCourseIds()` 포함 수업만
- INSERT → `ai_questions`

## 데이터 소스

| 네임스페이스 | Supabase 테이블 (예) |
|--------------|----------------------|
| courses | `ai_courses`, `ai_course_stages`, `ai_course_memberships` |
| teamCards | `ai_teams`, `ai_team_members`, `ai_team_activities` |
| questions | `ai_questions` |
| studentNetwork | `ai_users`, `ai_user_learning_profiles`, … |
| teamDetail | `ai_team_detail_*`, `ai_team_deliverables`, Storage bucket |
| myPage | `ai_my_page_*` |

## `questions` 답변

- `answers` jsonb 배열에 저장 (별도 테이블 없음)
- `createAnswer` / `updateAnswer` / `deleteAnswer` / `acceptAnswer` (질문 작성자만 채택)

## `aiReport.gatherContext` · `buildDraftFromContext`

- **gatherContext(userId)** — 팀 스냅샷, `troubleshootingCases`(problem/plan/solution), 산출물 집계 → `AiReportContext`
- **buildDraftFromContext(context)** — LLM 없이 A4용 `AiReportGenerateResponse` 초안 (`model: draft-db-only`)
- UI: `MyPage` 「DB 활동 미리보기 (A4)」·`AiReportPrintView`

## `aiReport.generateReport`

- **호출:** `supabase.functions.invoke('generate-report', { body })`
- **요청:** `AiReportGenerateRequest` — `userId`, `projectIds?`, `locale?`
- **응답:** `AiReportGenerateResponse` (summary, problems_solved, technologies, …)
- **현재:** Edge 스텁 501 `NOT_IMPLEMENTED` — 배포 전 클라이언트는 안내 메시지 표시

## 미구현

- 기타 리소스 CRUD 일부
- Express `/api/v1/*`
- Edge Function LLM·집계 로직

## 인증

- Firebase Auth → `auth.currentUser.uid` → `ai_users.firebase_uid` 매칭
