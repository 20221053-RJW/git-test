# 27 — vision.md 기능 추적 매트릭스

> **원본:** `vision.md` · **관련:** `02_current_state.md` · `for_human/26_vision_features_status.md`  
> **갱신:** 2026-05-20 vision 기반 점검

## 문제의식 → 플랫폼 (요약)

| vision 문제 | 대응 기능 | 문서 |
|---------------|-----------|------|
| 관계 형성 어려움 | 수강생 네트워크 | §1 |
| 피드백 비효율 | 워크스페이스·트러블슈팅·Q&A | §2 |
| 팀플 휘발성 | 히스토리·아카이브 | §2, §3 |
| 성장 이력 부재 | 마이페이지·AI 리포트 | §3 |

**데이터 열:** `Supabase` = `supabase-api.ts` · `—` = 미연동

---

## 0. vision 상단 추가요청사항 (신규)

| 요청 | 현재 | 추적 ID | 구현 방향 |
|------|------|---------|-----------|
| 워크스페이스 업로드 용량 제한 완화 + 링크 게시물 지원 | ✅ | T-024 | TeamDetail 파일 업로드 500MB + URL 게시물 등록/열기 |
| 교수(김교수)에게 학생용 팀플 리포트 노출 차단 | ✅ | T-025 | `MyPage` role 가드 + 교수 안내 블록 + E2E #14 |
| 수업 생성 코드 자동 생성(해시형) | ✅ | T-026 | `CC-XXXX-XXXX` 자동 생성 + 재생성 버튼 |
| 일정 입력 캘린더 선택 | ✅ | T-027 | `CoursesPage` 일정 입력 `type=\"date\"` 전환 |

---

## 완성도 점검 (vision 기준)

| 관점 | 점수(체감) | 메모 |
|------|------------|------|
| 기존 vision 3축 | ~75% | 핵심 흐름은 동작, RLS/배포는 인간 블로커 |
| 신규 추가요청 4건 | 100% | T-024~T-027 완료 |
| 전체 vision 기준 | ~63% | vision 상단 추가요청 반영 완료 |

---

## 1. 수강생 네트워크

| vision 기능 | 페이지/코드 | UI | 데이터 | 비고 |
|-------------|-------------|-----|--------|------|
| 전체 수강생 프로필 조회 | `StudentsNetworkPage` | ✅ | Supabase | |
| 기술 스택 태그 | 프로필·네트워크 | ✅ | Supabase | `saveProfile` |
| 상세 프로필 | `OtherStudentProfilePage` | ✅ | Supabase | |
| 1:1 채팅 | TeamDetail 모달 | ✅ | Supabase CRUD + Realtime | 팀 스코프; RLS T-011 |
| 내 정보 수정·저장 | 네트워크 모달 | ✅ | Supabase | |

**달성도:** UI ~80% · 읽기 ~55% · 쓰기 ~45%

---

## 2. 팀플 워크스페이스

| vision 기능 | 페이지/코드 | UI | 데이터 | 비고 |
|-------------|-------------|-----|--------|------|
| 중간 작업 결과 업로드 | TeamDetail | ✅ | Storage | `ai_team_deliverables` |
| 같은 수업 열람 | course scope | ✅ | Supabase | RLS 검증 필요 |
| 작업 히스토리 | Teams | ✅ | Supabase | `ai_team_activities` |
| 트러블슈팅 CRUD | TeamDetail | ✅ | CRUD | |
| Q&A CRUD | QnA pages | ✅ | CRUD | `answers` jsonb |
| 종료 수업 | `CoursesPage` filter | ✅ | archived | 읽기 전용 배너 |
| 팀 피드백 제출 | TeamDetail | ✅ | Supabase | `ai_team_detail_feedbacks` (H-007) |
| 동료평가 제출 | TeamDetail 모달 | ✅ | Supabase | `ai_team_detail_peer_reviews` (H-008) |
| 회고록 작성 | TeamDetail 모달 | ✅ | Supabase | `ai_team_detail_retrospectives` (H-009) |
| 교수 작업물·평가 | TeamDetail (교수) | ✅ | Supabase | 산출물·제출 현황·평가 DB (H-010) |

**달성도:** UI ~70% · 읽기 ~55% · 쓰기 ~50%

---

## 3. 마이페이지

| vision 기능 | 페이지/코드 | UI | 데이터 | AI |
|-------------|-------------|-----|--------|-----|
| 종료·진행 프로젝트 표시 | `MyPage` | ✅ | Supabase | 팀 집계·시드 |
| 리포트 3페이지 | `MyPage` | ✅ | `gatherContext` | DB |
| A4 인쇄 | `AiReportPrintView` | ✅ | draft | LLM ❌ |
| AI 문단 생성 | MyPage 버튼 | 🔶 | Edge draft 200 / LLM | deploy·H-002 |
| 교수 평가 → 리포트 | `gatherContext` | ✅ | 번들 v2 | 스니펫·건수 |
| 집계 새로고침 | MyPage 버튼 | ✅ | `resolveReportContext` | 캐시·강제 refresh |

**달성도:** UI ~78% · 읽기 ~62% · AI ~65% (DB·Edge 초안, LLM deploy 대기)

---

## 철학 4가지 — 구현 체크

| 철학 | 구현 방향 | 현재 |
|------|-----------|------|
| 과정 > 결과 | 트러블슈팅 | CRUD ✅ |
| 협업 기억 | DB 영구 저장 | ✅, RLS 강화 중 |
| 사람 중심 | 네트워크 | ✅ |
| 성장 데이터 | 리포트 | DB ✅, LLM 🔶 |

---

## 갱신 규칙

기능 완료 시: 표 갱신 → `02` · `05` · `for_human/26_vision_features_status.md`
