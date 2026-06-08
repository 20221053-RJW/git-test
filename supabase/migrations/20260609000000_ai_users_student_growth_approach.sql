ALTER TABLE public.ai_users
  ADD COLUMN IF NOT EXISTS student_growth_approach text;
