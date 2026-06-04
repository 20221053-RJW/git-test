# 10 — AI 시스템

> **관련:** `11_api_spec.md` · `07_backend.md` · 인간용: `doc/for_human/11_ai_system_explained.md` · `28_human_action_items.md`

## 목표 기능

1. 팀·트러블슈팅·산출물 집계 (DB)
2. 마이페이지 리포트 3페이지 + A4 HTML/인쇄
3. LLM 요약·추천·진행 인사이트 (Gemini, Edge)

## 현재 상태 (2026-05-26)

| 구성 | 상태 |
|------|------|
| `gatherAiReportContext` / `buildMyPageReportView` | ✅ |
| `MyPage` → `generate-report` 자동 호출 | ✅ |
| `AiReportPrintView` | ✅ A4 |
| `generate-report` Edge | ✅ Gemini · `draft-db-only` 폴백 · `verify_jwt=false` |
| `recommend-troubleshooting` Edge | ✅ troubleshooting + **`progress-insight`** intent |
| ZIP/소스 추출 (JSZip) | ✅ `.ts`/`.tsx` 우선 · `node_modules`/`.git` 제외 |
| `ai_team_detail_ai_memory` | ✅ 증분 분석 · `memory_markdown` |
| `ai-team-progress.ts` | ✅ shallow 응답 필터 · `buildTeamProgressInsight` 클라 폴백 |
| `AiGeneratingIndicator` / `cc-gemini-*` | ✅ MyPage · TeamDetailPage |

## 아키텍처

```
MyPage
  gatherAiReportContext (DB)
  → generate-report (Edge)
  → buildMyPageReportView

TeamDetailPage
  → recommend-troubleshooting { intent: troubleshooting }
  → recommend-troubleshooting { intent: progress-insight }
      → gatherTeamContext → ZIP snippets → Gemini/heuristic
      → saveTeamAiMemory
      → client: isShallowProgressInsight ? buildTeamProgressInsight fallback
```

**금지:** 클라이언트 `GEMINI_API_KEY` · `VITE_*` LLM 키

## Edge 함수

| 함수 | 클라이언트 | body |
|------|------------|------|
| `generate-report` | `ai-report.ts` | `{ userId, locale }` |
| `recommend-troubleshooting` | `ai-troubleshooting.ts` | `{ teamId, locale }` |
| `recommend-troubleshooting` | `ai-team-progress.ts` | `{ teamId, locale, intent: "progress-insight" }` |

배포: `supabase functions deploy generate-report` + `recommend-troubleshooting`

## 출력 스키마

- 리포트: `AiReportGenerateResponse` — `summary`, `technologies`, `sections?`, `model`
- 추천: `problem`, `plan`, `rationale`, `model`
- 진행: `summary`, `strengths`, `gaps`, `next_steps`, `architecture_risks`, `improvements`, `used_memory?`, `new_deliverables_analyzed?`

## 인간 협업

→ `28` H-002 (Gemini Secret) · H-006 (AI 정책)

## TODO

- [o] T-031 A4 · T-025 교수 리포트 비노출 · 트러블슈팅 AI · 진행 요약 (#132)
