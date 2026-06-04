-- vision #149 — 수업 삭제: RLS DELETE 정책 없으면 행이 삭제되지 않음 (CASCADE 포함)

DROP POLICY IF EXISTS "Allow client delete ai_courses" ON public.ai_courses;
CREATE POLICY "Allow client delete ai_courses"
  ON public.ai_courses
  FOR DELETE
  USING (true);

DROP POLICY IF EXISTS "Allow public delete ai_projects" ON public.ai_projects;
CREATE POLICY "Allow public delete ai_projects"
  ON public.ai_projects
  FOR DELETE
  USING (true);

DROP POLICY IF EXISTS "Allow public delete ai_course_memberships" ON public.ai_course_memberships;
CREATE POLICY "Allow public delete ai_course_memberships"
  ON public.ai_course_memberships
  FOR DELETE
  USING (true);

DROP POLICY IF EXISTS "Allow public delete ai_direct_messages" ON public.ai_direct_messages;
CREATE POLICY "Allow public delete ai_direct_messages"
  ON public.ai_direct_messages
  FOR DELETE
  USING (true);

DROP POLICY IF EXISTS "Allow public delete ai_team_detail_chat_messages" ON public.ai_team_detail_chat_messages;
CREATE POLICY "Allow public delete ai_team_detail_chat_messages"
  ON public.ai_team_detail_chat_messages
  FOR DELETE
  USING (true);

DROP POLICY IF EXISTS "Allow public delete ai_team_detail_feedbacks" ON public.ai_team_detail_feedbacks;
CREATE POLICY "Allow public delete ai_team_detail_feedbacks"
  ON public.ai_team_detail_feedbacks
  FOR DELETE
  USING (true);

DROP POLICY IF EXISTS "Allow public delete ai_team_detail_peer_reviews" ON public.ai_team_detail_peer_reviews;
CREATE POLICY "Allow public delete ai_team_detail_peer_reviews"
  ON public.ai_team_detail_peer_reviews
  FOR DELETE
  USING (true);

DROP POLICY IF EXISTS "Allow public delete ai_team_detail_retrospectives" ON public.ai_team_detail_retrospectives;
CREATE POLICY "Allow public delete ai_team_detail_retrospectives"
  ON public.ai_team_detail_retrospectives
  FOR DELETE
  USING (true);

DROP POLICY IF EXISTS "Allow public delete ai_team_detail_professor_student_evals" ON public.ai_team_detail_professor_student_evals;
CREATE POLICY "Allow public delete ai_team_detail_professor_student_evals"
  ON public.ai_team_detail_professor_student_evals
  FOR DELETE
  USING (true);

DROP POLICY IF EXISTS "Allow public delete ai_team_detail_professor_project_evals" ON public.ai_team_detail_professor_project_evals;
CREATE POLICY "Allow public delete ai_team_detail_professor_project_evals"
  ON public.ai_team_detail_professor_project_evals
  FOR DELETE
  USING (true);

DROP POLICY IF EXISTS "Allow public delete ai_team_detail_config" ON public.ai_team_detail_config;
CREATE POLICY "Allow public delete ai_team_detail_config"
  ON public.ai_team_detail_config
  FOR DELETE
  USING (true);

DROP POLICY IF EXISTS "Allow public delete ai_team_detail_peer_review_students" ON public.ai_team_detail_peer_review_students;
CREATE POLICY "Allow public delete ai_team_detail_peer_review_students"
  ON public.ai_team_detail_peer_review_students
  FOR DELETE
  USING (true);

DROP POLICY IF EXISTS "Allow public delete ai_team_detail_teammates" ON public.ai_team_detail_teammates;
CREATE POLICY "Allow public delete ai_team_detail_teammates"
  ON public.ai_team_detail_teammates
  FOR DELETE
  USING (true);

DROP POLICY IF EXISTS "Allow public delete ai_team_activities" ON public.ai_team_activities;
CREATE POLICY "Allow public delete ai_team_activities"
  ON public.ai_team_activities
  FOR DELETE
  USING (true);
