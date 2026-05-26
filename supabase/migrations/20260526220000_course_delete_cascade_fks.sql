-- vision #149 — 수업·팀 삭제 시 FK로 막히지 않도록 CASCADE 정리

ALTER TABLE public.ai_projects
  DROP CONSTRAINT IF EXISTS ai_projects_team_id_fkey;

ALTER TABLE public.ai_projects
  ADD CONSTRAINT ai_projects_team_id_fkey
  FOREIGN KEY (team_id) REFERENCES public.ai_teams (id) ON DELETE SET NULL;

ALTER TABLE public.ai_projects
  DROP CONSTRAINT IF EXISTS ai_projects_course_id_fkey;

ALTER TABLE public.ai_projects
  ADD CONSTRAINT ai_projects_course_id_fkey
  FOREIGN KEY (course_id) REFERENCES public.ai_courses (id) ON DELETE CASCADE;

ALTER TABLE public.ai_questions
  DROP CONSTRAINT IF EXISTS ai_questions_course_id_fkey;

ALTER TABLE public.ai_questions
  ADD CONSTRAINT ai_questions_course_id_fkey
  FOREIGN KEY (course_id) REFERENCES public.ai_courses (id) ON DELETE CASCADE;

ALTER TABLE public.ai_teams
  DROP CONSTRAINT IF EXISTS ai_teams_course_id_fkey;

ALTER TABLE public.ai_teams
  ADD CONSTRAINT ai_teams_course_id_fkey
  FOREIGN KEY (course_id) REFERENCES public.ai_courses (id) ON DELETE CASCADE;
