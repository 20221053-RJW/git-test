# 02 — 현재 상태 (항상 최신 유지)

> **관련:** `05_todo.md` · `17_handoff.md` · `27_vision_feature_matrix.md` · `28_human_action_items.md`  
> **마지막 갱신:** 2026-05-20 · **단계:** Alpha → Beta 진입 중 · **전체 진행률:** ~63%

## 스냅샷

| 영역 | % | 상태 |
|------|---|------|
| 프론트엔드 UI | 83 | 마이페이지 리포트·권한 분리·수업 생성 UX·링크 게시물 |
| 데이터 연동 (읽기) | 60 | `supabase-api.ts` → Supabase `ai_*` |
| 데이터 연동 (쓰기) | 54 | Q&A·트러블슈팅·채팅·피드백·회고록·네트워크·산출물 |
| 인증 | 58 | Firebase + `ai_users` + JWT 스캐폴드(기본 off) + ProtectedRoute |
| DB / RLS | 45 | 리뷰 패키지·Beta 초안 SQL (T-011, 미적용) |
| DevOps | 35 | CI build + E2E, `vercel.json`, `deploy_vercel_checklist.md` (H-005) |
| AI 리포트 | 65 | DB·A4·마이페이지 집계; Edge 초안(OPENAI 없음) + LLM deploy H-002 |
| E2E 테스트 | 73 | Playwright 23플로우 + 인증 가드, GH Actions |

## vision 기반 이해도 점검 (2026-05-20)

| 항목 | 점검 결과 | 근거 |
|------|-----------|------|
| 핵심 3축(네트워크·워크스페이스·마이페이지) | 구현 이해도 높음 | 각 축의 핵심 화면·API·DB 흐름 연결 확인 |
| 추가요청 1: 대용량+링크 게시물 | 구현 | 업로드 500MB + 링크(URL) 등록/조회/삭제 지원 |
| 추가요청 2: 교수에게 학생용 리포트 비노출 | 구현 | `MyPage` role 가드 + 교수 전용 안내 블록 |
| 추가요청 3: 수업 코드 자동 생성 | 구현 | `CoursesPage`에서 `CC-XXXX-XXXX` 자동 생성 + 재생성 버튼 |
| 추가요청 4: 일정 캘린더 입력 | 구현 | `CoursesPage` 일정 입력을 `type="date"`로 전환 |

## 구현 완료 (기능)

- [o] 랜딩·로그인 UI (`/`, `/signin`)
- [o] 과목 목록 **현재/종료** 필터, 생성·보관 (교수)
- [o] 과목·팀·Q&A·네트워크·팀 상세 — Supabase 읽기·쓰기 (대부분)
- [o] `AuthContext` + Firebase + `ai_users` (`firebase_uid`)
- [o] Protected routes, course-scoped URL, 레거시 리다이렉트
- [o] 멤버십·수업 코드·랜덤 팀 (T-012)
- [o] Q&A·트러블슈팅·네트워크 프로필·팀 산출물 Storage (T-020~023)
- [o] 팀 상세 채팅 DB 저장 + Supabase Realtime (`sendChatMessage`, TeamDetailPage)
- [o] 팀 상세 피드백 DB 저장 (`submitFeedback`, H-007 SQL)
- [o] 팀 동료평가 DB 저장 (`submitPeerReview`, H-008 SQL)
- [o] 팀 회고록 DB 저장 (`submitRetrospective`, 트러블슈팅 자동연동, H-009 SQL)
- [o] 교수 팀 평가 DB·제출 현황 조회·AI 진행 요약 (H-010, 번들 v2)
- [o] AI 리포트 DB 집계·A4 인쇄·마이페이지 실데이터 (T-030/031, LLM 제외)
- [o] Playwright E2E + GitHub Actions (T-040, T-041)
- [o] 종료 수업 시드 (김학생 등) — `supabase/seed/archived_courses_kim_student.sql`
- [o] `supabase-api.ts` rename (TD-001)

## 미완료 / 진행 중

- [ ] RLS 정책 검증·강화·원격 적용 (T-011, H-001)
- [ ] Edge `generate-report` **배포**·OPENAI Secret (T-030, H-002) — 코드는 `supabase/functions/`
- [ ] 프로덕션 배포 실행 (T-042, H-005)
- [ ] E2E 전체 green (H-003, H-004 시크릿)
- [ ] vision 추가요청 구현 완료 (T-024~T-027)

## 최근 검증 (2026-05-20)

- doc 전반 코드·DB 대조 갱신
- 종료 수업 2건(SWE/OOP 2025) Supabase 반영
- 프로젝트 스캔: `CoursesPage`(수업코드 자동생성·일정 캘린더), `TeamDetailPage`(업로드 500MB·링크 게시물), `MyPage`(교수 비노출)
- T-025 완료: 교수 `MyPage`에서 학생 리포트 비노출 + E2E #14 추가
- T-026 완료: `CoursesPage` 수업 코드 자동 생성(`CC-XXXX-XXXX`) + 재생성 버튼
- T-027 완료: `CoursesPage` 일정 입력 캘린더(`type="date"`) 적용
- T-024 완료: `TeamDetailPage` 링크 등록 + 파일 업로드 500MB + E2E #15 추가
- T-024 안정화: 파일 업로드 E2E #16 추가(`team-deliverable-file-input`)
- T-024 안정화: 링크 삭제 E2E #17 추가(삭제 다이얼로그 수락 포함)
- T-024 안정화: 잘못된 링크 입력 검증 E2E #18 추가
- T-024 안정화: 링크 `https://` 자동보정 E2E #19 추가
- T-024 확장: 소스코드/압축 확장자 확대 + E2E #20(`.ts`) 추가
- T-024 안정화: 금지 확장자(`.exe`) 업로드 차단 E2E #21 추가
- T-024 안정화: 업로드 가이드 노출 E2E #22 + 허용 확장자 안내 문구 추가
- T-024 안정화: 링크 제목 fallback(E2E #23) 추가

## 알려진 블로커

1. **RLS:** enabled, 정책 강화 미적용 (T-011 / H-001)
2. **Figma imports:** `src/imports/` 레거시 유지
3. **인간:** `28_human_action_items.md` H-001~006

## 다음 즉시 액션

→ AI 선행: vision 추가요청 4건 완료 유지, 안정화/회귀 테스트  
→ 인간 블로커: T-011(H-001) · T-030 deploy(H-002) · T-042(H-005)
