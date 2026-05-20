# 14 — 테스트

> **관련:** `13_devops.md` · `tests/e2e/` · `28_human_action_items.md` (H-003, H-004)

## 현재

- **Playwright** — `playwright.config.ts`, `tests/e2e/`
- **핵심 E2E:** `core-flows.spec.ts` — 23플로우 + 인증 가드 1건
- **단위 테스트:** 없음

## 실행

```bash
npm run test:e2e
npm run test:e2e:ui
```

`.env`:

```env
E2E_TEST_EMAIL=...
E2E_TEST_PASSWORD=...
```

미설정 시 로그인 11건 skip, #12는 `E2E_PROFESSOR_*` 없으면 skip. #9·#10은 번들 v2 후. #11은 회고록 테이블. #12는 **교수** 계정·번들 v2.

## 구현된 E2E 시나리오

1. 랜딩 로그인 → `/app/courses`
2. 과목 → 수강생 네트워크
3. 팀 목록 → 팀 상세
4. 마이페이지
5. 로그아웃 → 랜딩
6. 마이페이지 DB 리포트 미리보기 (A4) + 활동 집계 + `report-preview-close`로 overlay 닫기
7. 마이페이지 리포트 1→2→3 + PAGE02 (`mypage-team-card-db`) + PAGE01·03 testid
8. 팀 상세 채팅 메시지 전송
9. 팀 상세 피드백 제출 (`data-testid=team-feedback-submit`)
10. 팀 상세 동료평가 제출 (학생·`peer-review-submit-*`)
11. 팀 상세 회고록 저장 (학생·`retrospective-submit`)
12. 교수 팀 제출 현황·프로젝트 평가 (`E2E_PROFESSOR_*`, `professor-team-submissions`)
13. 마이페이지 AI 리포트 생성 (`ai-report-generate-button`, `ai-report-message`)
14. 교수 마이페이지 학생 리포트 비노출 (`mypage-professor-report-block`)
15. 팀 상세 배포 링크 등록 (URL 게시물)
16. 팀 상세 파일 업로드 (`team-deliverable-file-input`)
17. 팀 상세 배포 링크 삭제 (삭제 확인 다이얼로그 포함)
18. 팀 상세 잘못된 링크 입력 검증 (에러 다이얼로그)
19. 팀 상세 링크 프로토콜 자동보정 (`https://` 자동 추가)
20. 팀 상세 소스코드 파일 업로드 (`.ts`)
21. 팀 상세 금지 확장자 업로드 차단 (`.exe`)
22. 팀 상세 업로드 가이드 노출 (`team-deliverable-upload-guide`)
23. 팀 상세 링크 제목 fallback (URL 기반 자동 제목)

헬퍼: `tests/e2e/helpers/auth.ts`

## CI

- `.github/workflows/build.yml` — `npm run build` (시크릿 불필요)
- `.github/workflows/e2e.yml` — `VITE_*`, `E2E_TEST_*` 시크릿 (H-004)

## 다음

- [ ] 시드/테스트 전용 Supabase project
- [ ] RLS 회귀 테스트 (T-011 후)
- [ ] 대용량 파일 업로드(>50MB) 실환경 회귀 테스트 (기본 업로드 E2E #16 완료)
