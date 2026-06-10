-- 아카이브 팀 회고록 더미 — 김학생 3팀

INSERT INTO ai_team_detail_retrospectives (
  id, team_id, author_user_id, author_name, sections, updated_at
) VALUES
  (
    'retro-cc-kim',
    'team-swe-schedule',
    '673b60f9-3c6c-4ed4-847a-e24536c472a5',
    '김학생',
    '{
      "role": {"auto": "", "custom": "팀 리더·서비스 기획·UI/UX·프론트/백엔드 총괄"},
      "strengths": {"auto": "", "custom": "개별 파트 병합 비효율을 인수인계 방식으로 개선했고, 수업 입장·팀플 스테이지 기능을 직접 구현했습니다."},
      "regrets": {"auto": "", "custom": "모바일 반응형 QA를 더 일찍 시작할 걸 그랬습니다."},
      "growth": {"auto": "", "custom": "정성적 평가·AI 리포트 기획을 통해 기획-개발-평가를 연결하는 경험을 쌓았습니다."}
    }'::jsonb,
    '2025-12-20 10:00:00+00'
  ),
  (
    'retro-plan-kim',
    'team-oop-lost',
    '673b60f9-3c6c-4ed4-847a-e24536c472a5',
    '김학생',
    '{
      "role": {"auto": "", "custom": "서비스 기획 리드 — 페르소나·문제 정의·기획서"},
      "strengths": {"auto": "", "custom": "수업 편의성 문제를 구조화하고 MVP 범위를 팀과 합의했습니다."},
      "regrets": {"auto": "", "custom": "개발 연동 일정을 더 여유 있게 잡을 걸 그랬습니다."},
      "growth": {"auto": "", "custom": "기획서만이 아니라 와이어프레임까지 책임지는 올라운더 역량을 키웠습니다."}
    }'::jsonb,
    '2025-06-20 10:00:00+00'
  ),
  (
    'retro-ux-kim',
    'team-ux-notify',
    '673b60f9-3c6c-4ed4-847a-e24536c472a5',
    '김학생',
    '{
      "role": {"auto": "", "custom": "UI/UX 디자인 리드 — 리서치·프로토타입·사용자 테스트"},
      "strengths": {"auto": "", "custom": "일정 안내 UX를 사용자 테스트로 검증하고 개선했습니다."},
      "regrets": {"auto": "", "custom": "접근성(색상 대비) 점검을 중간에 넣을 걸 그랬습니다."},
      "growth": {"auto": "", "custom": "수업 편의성 문제에 대한 디자인 관점의 해결 경험을 쌓았습니다."}
    }'::jsonb,
    '2025-06-22 10:00:00+00'
  )
ON CONFLICT (id) DO UPDATE SET sections = EXCLUDED.sections;
