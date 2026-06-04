# Supabase Edge AI — Secret·배포 (10분)

> **최종 갱신:** 2026-05-26  
> **상태:** H-002 완료 시 Secret만 유지하면 됨. 401·문단 미생성·진행 요약 실패 시 이 문서 사용.  
> **전체 AI 설명:** [11_ai_system_explained.md](./11_ai_system_explained.md)

CampusConnect는 **Edge Function 2개**로 AI를 씁니다. **같은 Secret**을 공유합니다.

| Edge 함수 | 용도 |
|-----------|------|
| `generate-report` | 마이페이지 리포트 PAGE 1~3 |
| `recommend-troubleshooting` | 팀 트러블슈팅 AI 추천 + **AI 통합 진행상황 요약** |

---

## 준비물

- Supabase 프로젝트 관리자 권한
- [Google AI Studio](https://aistudio.google.com/) Gemini API Key
- (선택) [Supabase CLI](https://supabase.com/docs/guides/cli)

---

## 1. Gemini API Key

1. https://aistudio.google.com/apikey  
2. **Create API key** → `AIza...` 복사

---

## 2. Supabase Secret (이름 정확히)

**Project Settings** → **Edge Functions** → **Secrets**

| Name | Value |
|------|--------|
| **`GEMINI_API_KEY`** | `AIza...` |
| `GEMINI_MODEL` (선택) | `gemini-2.5-flash` |

표시 이름 `Gemini API Key1` 등은 **인식되지 않습니다.** Name은 반드시 `GEMINI_API_KEY`.

---

## 3. Edge 배포 (둘 다)

프로젝트 루트 `supabase/config.toml`에 아래가 있어야 401이 나지 않습니다.

```toml
[functions.generate-report]
verify_jwt = false

[functions.recommend-troubleshooting]
verify_jwt = false
```

```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase functions deploy generate-report
supabase functions deploy recommend-troubleshooting
```

Vercel **Environment Variables:** `VITE_SUPABASE_ANON_KEY` = publishable 키 (`sb_publishable_...`)

---

## 4. 동작 확인

### 마이페이지 리포트

1. 학생 로그인 → **마이페이지**
2. 무지개 로딩 후 리포트 박스 문장 채워짐
3. 하단: `리포트 문단을 AI로 채웠습니다. (gemini-2.5-flash)` 또는 DB 초안 안내

### 팀 워크스페이스

1. **팀 상세** → **AI 통합 진행상황 요약** (스택·보완점·다음 할 일)
2. 트러블슈팅 **AI 추천** 카드

산출물 ZIP을 올린 뒤 새로고침하면 소스 분석 문구가 나와야 합니다.

---

## 5. 키가 없을 때

| 함수 | HTTP | `model` |
|------|------|---------|
| `generate-report` | 200 | `draft-db-only` |
| `recommend-troubleshooting` (추천) | 200 | `draft-db-only` |
| `recommend-troubleshooting` (진행 요약) | 200 | `heuristic-insight` |

에러 501이 아니라 **200 + 초안/휴리스틱**이 정상 폴백입니다.

---

## 6. 로컬 테스트 (선택)

`supabase/.env.local` (Git 커밋 금지):

```
GEMINI_API_KEY=AIza...
GEMINI_MODEL=gemini-2.5-flash
```

```bash
supabase functions serve generate-report --env-file supabase/.env.local
supabase functions serve recommend-troubleshooting --env-file supabase/.env.local
```

---

## 비용·주의

- Gemini 무료 티어 한도 있음
- API Key는 **Edge Secret만** — `VITE_GEMINI_*` 금지
- 학교 AI 정책: `28_human_action_items.md` H-006

---

## AI에게 알릴 때

**「H-002 완료 (Gemini, generate-report + recommend-troubleshooting 배포됨)」**

기술 README: `supabase/functions/generate-report/README.md`, `supabase/functions/recommend-troubleshooting/README.md`
