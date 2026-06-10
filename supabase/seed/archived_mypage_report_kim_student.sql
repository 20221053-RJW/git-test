-- 마이페이지 시연용 김학생 프로필·AI 컨텍스트 (673b60f9-3c6c-4ed4-847a-e24536c472a5)

UPDATE ai_users
SET
  skills = '["피그마", "일러스트", "노션", "깃허브", "라이노", "포토샵"]'::jsonb,
  bio = '서비스 기획·UX 디자인에 관심 있는 김학생입니다. 피그마·노션으로 기획하고, 캠퍼스 커넥트에서 팀 리드·기획·개발까지 경험했습니다.',
  updated_at = now()
WHERE id = '673b60f9-3c6c-4ed4-847a-e24536c472a5';

INSERT INTO ai_user_ai_context (
  user_id, report_excerpt, context_markdown, updated_at
) VALUES (
  '673b60f9-3c6c-4ed4-847a-e24536c472a5',
  '진행했던 프로젝트들을 분석한 결과, 기획부터 개발까지 전 과정을 경험해 보았으며, 특히 기획과 디자인을 위주로 진행했습니다. 기획과 디자인에 관련해서는 동료평가와 교수의 프로젝트 평가에서 뛰어나다는 키워드를 받았습니다. 팀프로젝트는 주로 서비스 기획을 많이 진행했고, 그중 학교 수업의 편의성을 높여 주는 프로젝트를 3회 진행한 것으로 보아 수업 편의성 문제에 높은 관심과 진정성이 보입니다.',
  '# 김학생 팀플 요약

## 웹프로그래밍 실습 · 캠퍼스 커넥트
- 역할: 팀 리더, 기획·디자인·프론트/백엔드
- 핵심: 수업 검색 입장, 팀플 스테이지, 동료평가 키워드, AI 리포트
- 트러블슈팅 6건(본인), 산출물 8건, 회의록 3건

## 서비스기획 실습 · 강의실 좌석·출결 편의 앱
- 역할: 서비스 기획 리드
- 수업 편의성 프로젝트 1

## UX디자인 워크숍 · 수강신청 알림·일정 안내 앱
- 역할: UI/UX 디자인 리드
- 수업 편의성 프로젝트 2',
  now()
) ON CONFLICT (user_id) DO UPDATE SET
  report_excerpt = EXCLUDED.report_excerpt,
  context_markdown = EXCLUDED.context_markdown,
  updated_at = EXCLUDED.updated_at;
