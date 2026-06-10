-- 아카이브 팀 피드백 더미 — 김학생 3팀

INSERT INTO ai_team_detail_feedbacks (
  id, team_id, author_user_id, author_name, selected_options, custom_text, updated_at
) VALUES
  (
    'fb-cc-kim',
    'team-swe-schedule',
    '673b60f9-3c6c-4ed4-847a-e24536c472a5',
    '김학생',
    '["참신해요","실용적이에요","실제로 사용해보고 싶어요"]'::jsonb,
    '정성적 평가와 AI 리포트 방향이 팀에 잘 맞았습니다.',
    '2025-12-14 09:00:00+00'
  ),
  (
    'fb-plan-kim',
    'team-oop-lost',
    '673b60f9-3c6c-4ed4-847a-e24536c472a5',
    '김학생',
    '["퀄리티가 좋아요","실용적이에요"]'::jsonb,
    '기획서와 와이어프레임 품질이 높아 중간 발표가 수월했습니다.',
    '2025-06-11 09:00:00+00'
  ),
  (
    'fb-ux-kim',
    'team-ux-notify',
    '673b60f9-3c6c-4ed4-847a-e24536c472a5',
    '김학생',
    '["참신해요","퀄리티가 좋아요"]'::jsonb,
    '사용자 테스트 기반 UI 개선이 인상적이었습니다.',
    '2025-06-18 09:00:00+00'
  )
ON CONFLICT (id) DO NOTHING;
