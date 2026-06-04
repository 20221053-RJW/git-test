# 폴더 구조 — 파일들이 어디에 있나

> **관련:** `doc/for_agent/19_folder_structure.md`

프로젝트는 **서랍장**입니다. 물건 종류별로 서랍이 나뉘어 있습니다.

## 꼭 알면 되는 폴더

| 폴더/파일 | 역할 |
|-----------|------|
| `vision.md` | 프로젝트 철학 (사람만 수정) |
| `doit.md` | 문서 시스템 규칙 |
| `doc/starter.txt` | 새 AI 온보딩 (루트에는 없음) |
| `doc/for_agent/00_project_overview.md` | doc 구조·색인 (AI용) |
| `doc/for_human/` | 지금 읽는 교육 문서 |
| `doc/for_agent/` | AI·개발자용 짧은 기술 문서 |
| `src/app/pages/` | **화면 하나 = 파일 하나** (팀 목록, 로그인 등) |
| `src/app/components/` | 여러 화면에서 쓰는 부품 (버튼, 메뉴) |
| `src/app/api/supabase-api.ts` | Supabase API (`api.courses`, `api.questions` 등) |
| `src/app/api/ai-report.ts` | 마이페이지 리포트 집계 |
| `src/app/components/AiReportPrintView.tsx` | A4 인쇄 화면 |
| `tests/e2e/` | 자동 브라우저 테스트 |
| `vercel.json` | 배포 설정 (아직 미연결) |
| `supabase/seed/` | DB 샘플 데이터 SQL |
| `src/app/contexts/AuthContext.tsx` | 로그인 상태 |

## `src/imports/` 는?

Figma(디자인 도구)에서 자동으로 뽑아 온 옛날 화면 조각입니다.  
**새 기능은 여기 말고 `src/app/` 에 만듭니다.**

## 화면을 추가하려면 (개념만)

1. `pages/`에 새 파일  
2. `routes.tsx`에 주소 등록  
3. 필요하면 `Navigation.tsx`에 메뉴 추가  

개발자·AI에게 “OO 페이지 추가해줘”라고 하면 이 세 곳을 건드립니다.

상세 트리: `doc/for_agent/19_folder_structure.md`
