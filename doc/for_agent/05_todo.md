# 05 — TODO (우선순위)

> **관련:** `02_current_state.md` · `17_handoff.md` · `28_human_action_items.md`  
> **마지막 갱신:** 2026-05-20

## P0 — 즉시 (데이터 기반)

| ID | 작업 | 담당 | 상태 |
|----|------|------|------|
| T-001 | Supabase 스키마 설계·마이그레이션 | DB | done |
| T-002 | `supabase-api.ts` → Supabase courses 연동 | FE+DB | done |
| T-003 | 환경변수 분리 (`VITE_*`, `.env.example`) | Infra | done |
| T-004 | 라우트 통합: course-scoped teams only | FE | done |

## P1 — 인증·접근

| ID | 작업 | 상태 |
|----|------|------|
| T-010 | Protected routes | done |
| T-011 | RLS 정책 초안 + 인간 리뷰 | in_progress | `rls_review_packet.md`, `supabase/migrations/20260519000000_rls_beta_draft.sql` (미적용) |
| T-012 | 회원가입·수업 코드 멤버십 | done |

## P2 — 핵심 기능

| ID | 작업 | 상태 |
|----|------|------|
| T-020 | 트러블슈팅 CRUD | done |
| T-021 | 팀 산출물 Storage | done |
| T-022 | Q&A CRUD | done |
| T-023 | 수강생 네트워크 저장 | done |
| T-024 | 워크스페이스 대용량 업로드 + 링크 게시물 | done |
| T-025 | 교수 계정 학생용 리포트 비노출 | done |
| T-026 | 수업 코드 자동 생성(해시형) | done |
| T-027 | 일정 입력 캘린더 선택 UI | done |

### vision 점검 후 우선순위 (신규)

1. vision 추가요청 4건 완료 (T-024~T-027)

## P3 — AI·마이페이지

| ID | 작업 | 상태 | 비고 |
|----|------|------|------|
| T-030 | AI 리포트 | in_progress | DB·UI·Edge 코드 완료; deploy·OPENAI → H-002 |
| T-031 | A4 리포트 템플릿 | done | `AiReportPrintView`, MyPage 1–3페이지 DB |

## P4 — 품질·배포

| ID | 작업 | 상태 |
|----|------|------|
| T-040 | Playwright 핵심 플로우 | done | 13플로우 + 인증 가드 (`14_testing.md`) |
| T-041 | GitHub Actions CI | done | `.github/workflows/e2e.yml` |
| T-042 | 프로덕션 배포 | in_progress | `vercel.json` + `deploy_vercel_checklist.md`, 실행 H-005 |

## 완료됨 (최근)

- [o] T-024 안정화: 링크 제목 fallback E2E #23 (2026-05-20)
- [o] T-024 안정화: 업로드 가이드 노출 E2E #22 (2026-05-20)
- [o] T-024 안정화: 금지 확장자 업로드 차단 E2E #21 (.exe) (2026-05-20)
- [o] T-024 확장: 소스코드/압축 확장자 확대 + E2E #20 (.ts 업로드) (2026-05-20)
- [o] T-024 안정화: 링크 프로토콜 자동보정 E2E #19 (2026-05-20)
- [o] T-024 안정화: 잘못된 링크 입력 검증 E2E #18 (2026-05-20)
- [o] T-024 안정화: 링크 게시물 삭제 E2E #17 (2026-05-20)
- [o] T-024 안정화: 팀 산출물 파일 업로드 E2E #16 (2026-05-20)
- [o] T-024 대용량 업로드(500MB) + 링크 게시물 + E2E #15 (2026-05-20)
- [o] T-027 일정 입력 캘린더(`type="date"`) 적용 (2026-05-20)
- [o] T-026 수업 코드 자동 생성(`CC-XXXX-XXXX`) + 재생성 버튼 (2026-05-20)
- [o] T-025 교수 계정 학생용 리포트 비노출 + E2E #14 (2026-05-20)
- [o] 프로젝트 스캔 기반 doc 최신화 (`02`·`10`·`14`·`17`·`27`·`for_human/01`) (2026-05-20)
- [o] MyPage 집계 새로고침·A4 닫기 testid (2026-05-20)
- [o] MyPage resolveReportContext 캐시 (2026-05-20)
- [o] MyPage DEMO 지연·A4 overlay testid (2026-05-20)
- [o] mapReportContextToMyPageProjects + RLS 스테이징 가이드 (2026-05-20)
- [o] 마이페이지 프로젝트 카드·AI 생성 E2E #13 (2026-05-20)
- [o] Edge generate-report DB 초안 200 (OPENAI 없음) (2026-05-20)
- [o] 마이페이지 PAGE01 역량·활동 요약 DB 추정 (2026-05-20)
- [o] 마이페이지 PAGE01 카드·PAGE03 intro DB 집계 (2026-05-20)
- [o] 마이페이지 리포트 1·2페이지 DB 집계 동기화 (2026-05-20)
- [o] A4 팀별 상세 섹션(트러블슈팅·산출물) + E2E (2026-05-20)
- [o] A4 해결 문제·기술 역량 DB 초안 + E2E testid (2026-05-20)
- [o] A4 성장 회고 DB 초안 + README·상태 doc (2026-05-20)
- [o] AI 리포트 피드백·동료평가 스니펫 (클라·Edge) (2026-05-20)
- [o] AI 리포트 회고록 sections 스니펫 (클라·Edge) (2026-05-20)
- [o] 37 리포트 검증 가이드 + 런칭·배포 doc 동기화 (2026-05-20)
- [o] AI 리포트 교수 평가 집계 (클라·Edge·MyPage) (2026-05-20)
- [o] E2E #6 집계 요약 + 스모크·10_ai_system (2026-05-20)
- [o] Edge generate-report 집계 동기화 + MyPage 요약 (2026-05-20)
- [o] AI 리포트 집계(피드백·회고·동료평가) + 36 런칭 한 페이지 (2026-05-20)
- [o] 17_handoff·RLS·스모크 가이드 + 교수 동료평가 조회 (2026-05-20)
- [o] Firebase JWT 스캐폴드 + CI 시크릿 가이드 (2026-05-20)
- [o] 교수 제출 조회 + JWT 가이드 + E2E #12 (2026-05-20)
- [o] SQL 번들 v2 + 교수 평가 DB (2026-05-20)
- [o] 팀 회고록 DB + E2E #11 + H-009 (2026-05-20)
- [o] H-001 인간 RLS 결정 가이드 (31, starter, 22) (2026-05-20)
- [o] vision·개요 doc 동기화 (26, 00, 00_start_here) (2026-05-20)
- [o] H-002·런칭 순서 인간 가이드 + Realtime SQL (2026-05-20)
- [o] E2E #10 동료평가 + for_human/29 SQL 가이드 (2026-05-20)
- [o] E2E #9 팀 피드백 + 07_backend 갱신 (2026-05-20)
- [o] DB 마이그레이션 번들 + 11_api_spec + ADR-012 (2026-05-20)
- [o] 동료평가 DB 저장 + H-008 (2026-05-20)
- [o] T-042 배포 체크리스트 + CI build.yml (2026-05-20)
- [o] 팀 피드백 DB 저장 + 마이그레이션 H-007 (2026-05-20)
- [o] Edge `generate-report` 함수 구현 (2026-05-20)
- [o] E2E #8 팀 채팅 전송 (2026-05-20)
- [o] 팀 상세 채팅 DB 저장 + Realtime (2026-05-20)
- [o] 마이페이지 리포트 2·3페이지 DB, E2E #7 (2026-05-20)
- [o] 마이페이지 요약·Vercel 준비 (2026-05-20)
- [o] 김학생 종료 수업 시드 (2026-05-20)
- [o] T-040·T-041 E2E + CI (2026-05-19)
- [o] doc 전반 코드 대조 (2026-05-19)

## 작업 규칙

1. 착수 전 `02_current_state.md` 확인
2. 완료 시 이 파일 + `17_handoff.md` + (기능 시) `27` 갱신
3. 아키텍처 변경 시 `06_decision_log.md`
