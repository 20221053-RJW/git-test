# 03 — 개발 로드맵

> **관련:** `04_service_launch_flow.md` · `05_todo.md` · `02_current_state.md` · `for_human/02_development_roadmap.md`

## 단계 정의

| 단계 | 목표 | 예상 완료 기준 |
|------|------|----------------|
| **MVP** | 핵심 3화면 | ✅ |
| **Alpha** | UI + Supabase 읽기 + 인증 | ✅ |
| **Beta** (현재) | CRUD·RLS·E2E·AI DB 리포트 | 진행 중 ~52% |
| **Launch** | 배포·모니터링 | H-005 |
| **Operate** | 피드백·성능·AI LLM | H-002 |

## 로드맵 타임라인

### Phase 1 — 데이터·인증

- [o] Supabase `ai_*` + `supabase-api.ts`
- [o] 환경변수·ProtectedRoute·course URL
- [o] 멤버십·수업 코드 (T-012)
- [ ] RLS 강화 적용 (T-011, H-001)

### Phase 2 — 협업 코어

- [o] 트러블슈팅·Q&A·산출물 CRUD
- [o] 종료 수업 archived + 시드
- [ ] 과목 단위 공개 피드

### Phase 3 — 연결

- [ ] 채팅 Realtime
- [o] 네트워크 프로필 저장

### Phase 4 — 성장·AI

- [o] 마이페이지 DB 리포트·A4 (T-031)
- [ ] Edge LLM (T-030, H-002)

### Phase 5 — 운영

- [o] E2E + CI (T-040, T-041)
- [ ] 프로덕션 배포 (T-042, H-005)

## 진행률

전체: **~52%** (2026-05-20)

| Phase | % | 비고 |
|-------|---|------|
| 1 | 70 | RLS 적용만 남음 |
| 2 | 55 | 피드 미구현 |
| 3 | 25 | Realtime |
| 4 | 45 | LLM |
| 5 | 25 | 배포 |

갱신: 마일스톤 시 `02` · `for_human/01` 동시 수정.
