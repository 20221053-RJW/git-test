-- 아카이브 수업 평가 더미 — 김학생 캠퍼스 커넥트·서비스기획·UX 팀

-- ===== 캠퍼스 커넥트 (team-swe-schedule) =====
INSERT INTO ai_team_detail_peer_reviews (
  id, team_id, reviewer_user_id, teammate_id, good_keywords, bad_keywords, comment, contribution_rating, updated_at
) VALUES
  ('pr-cc-park-kim', 'team-swe-schedule', '5f2a9b43-f497-4d7d-8053-c051a3bba96e', '673b60f9-3c6c-4ed4-847a-e24536c472a5',
   '["다시 팀하고 싶어요","문제해결"]'::jsonb, '[]'::jsonb, '기획 단계 의견 충돌 시 중재하고 개발 일정에 맞춰 디자인을 빠르게 수정해 줬습니다.', 5, '2025-12-11 09:00:00+00'),
  ('pr-cc-kim-park', 'team-swe-schedule', '673b60f9-3c6c-4ed4-847a-e24536c472a5', '5f2a9b43-f497-4d7d-8053-c051a3bba96e',
   '["책임감","기술력"]'::jsonb, '[]'::jsonb, 'E2E·CI 안정화에 기여했습니다.', 4, '2025-12-11 09:05:00+00'),
  ('pr-cc-kim-lee2', 'team-swe-schedule', '673b60f9-3c6c-4ed4-847a-e24536c472a5', 'a355e683-3699-4b79-9673-6ac2c7f313cd',
   '["시간 약속을 잘 지켜요"]'::jsonb, '[]'::jsonb, '마이페이지 모달 UI 구현을 일정대로 마쳤습니다.', 4, '2025-12-12 10:00:00+00'),
  ('pr-cc-lee-kim2', 'team-swe-schedule', 'a355e683-3699-4b79-9673-6ac2c7f313cd', '673b60f9-3c6c-4ed4-847a-e24536c472a5',
   '["기획력","디자인 센스"]'::jsonb, '[]'::jsonb, '와이어프레임 품질이 높고 발표 자료도 설득력 있었습니다.', 5, '2025-12-12 10:05:00+00')
ON CONFLICT (id) DO UPDATE SET good_keywords = EXCLUDED.good_keywords, comment = EXCLUDED.comment;

INSERT INTO ai_team_detail_professor_student_evals (
  id, team_id, student_row_id, professor_user_id, comment, updated_at
) VALUES
  ('pe-cc-kim', 'team-swe-schedule', '673b60f9-3c6c-4ed4-847a-e24536c472a5', '5e589f7e-6eec-4a5c-beaa-92db76733484',
   '프로젝트 기획서와 와이어프레임 완성도가 높습니다. 기획과 디자인 역량이 두드러지며, 최종 발표에서 수업 입장·팀플 운영의 실질적 불편을 해소하는 서비스로 구현했습니다.',
   '2025-12-18 09:00:00+00')
ON CONFLICT (id) DO UPDATE SET comment = EXCLUDED.comment;

INSERT INTO ai_team_detail_professor_project_evals (
  id, team_id, professor_user_id, completion_comment, problem_solving_comment, holistic_comment, updated_at
) VALUES
  ('pp-cc-schedule', 'team-swe-schedule', '5e589f7e-6eec-4a5c-beaa-92db76733484',
   '캠퍼스 커넥트 5대 기능이 기획서 대비 높은 완성도로 구현되었습니다.',
   '트러블슈팅·회의록 기반 정성 평가 방향이 프로젝트 전반에 일관됩니다.',
   '정량 점수보다 과정 기록을 포트폴리오로 전환하려는 기획 의도가 인상적입니다. 팀 협업도 안정적이었습니다.',
   '2025-12-18 09:30:00+00')
ON CONFLICT (id) DO UPDATE SET holistic_comment = EXCLUDED.holistic_comment;

-- ===== 서비스기획 (team-oop-lost) =====
INSERT INTO ai_team_detail_peer_reviews (
  id, team_id, reviewer_user_id, teammate_id, good_keywords, bad_keywords, comment, contribution_rating, updated_at
) VALUES
  ('pr-plan-choi-kim', 'team-oop-lost', '68ca614d-75e3-43fc-8832-cbbf4366ee90', '673b60f9-3c6c-4ed4-847a-e24536c472a5',
   '["기획력","문서화"]'::jsonb, '[]'::jsonb, '수업 편의성 문제를 구조적으로 정리해 팀 방향을 잡아줬습니다.', 5, '2025-06-10 11:00:00+00'),
  ('pr-plan-kim-choi', 'team-oop-lost', '673b60f9-3c6c-4ed4-847a-e24536c472a5', '68ca614d-75e3-43fc-8832-cbbf4366ee90',
   '["협업"]'::jsonb, '[]'::jsonb, '사용자 인터뷰 정리를 도와줬습니다.', 4, '2025-06-10 11:05:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ai_team_detail_professor_student_evals (
  id, team_id, student_row_id, professor_user_id, comment, updated_at
) VALUES
  ('pe-plan-kim', 'team-oop-lost', '673b60f9-3c6c-4ed4-847a-e24536c472a5', '5e589f7e-6eec-4a5c-beaa-92db76733484',
   '문제 발굴과 기획서 품질이 우수합니다. 수업 편의성에 대한 진정성이 드러납니다.',
   '2025-06-18 09:00:00+00')
ON CONFLICT (id) DO UPDATE SET comment = EXCLUDED.comment;

INSERT INTO ai_team_detail_professor_project_evals (
  id, team_id, professor_user_id, completion_comment, problem_solving_comment, holistic_comment, updated_at
) VALUES
  ('pp-plan-lost', 'team-oop-lost', '5e589f7e-6eec-4a5c-beaa-92db76733484',
   '강의실 좌석·출결 편의 앱 기획이 실용적입니다.',
   '출결 UX 문제를 체계적으로 해결했습니다.',
   '서비스 기획 실습 목표를 충실히 달성한 팀입니다.',
   '2025-06-18 09:30:00+00')
ON CONFLICT (id) DO NOTHING;

-- ===== UX디자인 (team-ux-notify) =====
INSERT INTO ai_team_detail_peer_reviews (
  id, team_id, reviewer_user_id, teammate_id, good_keywords, bad_keywords, comment, contribution_rating, updated_at
) VALUES
  ('pr-ux-lee-kim', 'team-ux-notify', 'a355e683-3699-4b79-9673-6ac2c7f313cd', '673b60f9-3c6c-4ed4-847a-e24536c472a5',
   '["디자인을 잘 해요","다시 팀하고 싶어요"]'::jsonb, '[]'::jsonb, '일정 안내 UI가 직관적이고 사용자 테스트 준비도 철저했습니다.', 5, '2025-06-15 10:00:00+00'),
  ('pr-ux-kim-lee', 'team-ux-notify', '673b60f9-3c6c-4ed4-847a-e24536c472a5', 'a355e683-3699-4b79-9673-6ac2c7f313cd',
   '["협업"]'::jsonb, '[]'::jsonb, '프로토타입 피드백을 빠르게 반영해 줬습니다.', 4, '2025-06-15 10:05:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ai_team_detail_professor_student_evals (
  id, team_id, student_row_id, professor_user_id, comment, updated_at
) VALUES
  ('pe-ux-kim', 'team-ux-notify', '673b60f9-3c6c-4ed4-847a-e24536c472a5', '5e589f7e-6eec-4a5c-beaa-92db76733484',
   'UI 프로토타입 완성도와 사용자 리서치 정리가 뛰어납니다. 디자인 역량이 돋보입니다.',
   '2025-06-20 09:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ai_team_detail_professor_project_evals (
  id, team_id, professor_user_id, completion_comment, problem_solving_comment, holistic_comment, updated_at
) VALUES
  ('pp-ux-notify', 'team-ux-notify', '5e589f7e-6eec-4a5c-beaa-92db76733484',
   '수강신청 알림·일정 안내 앱 UI가 완성도 높습니다.',
   '알림 피로도 문제를 UX 관점에서 잘 풀었습니다.',
   '수업 편의성 프로젝트로서 설득력 있는 디자인 결과물입니다.',
   '2025-06-20 09:30:00+00')
ON CONFLICT (id) DO NOTHING;
