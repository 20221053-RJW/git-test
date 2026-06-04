-- vision #160 — 수업 시작·종료일
ALTER TABLE public.ai_courses
  ADD COLUMN IF NOT EXISTS start_date date,
  ADD COLUMN IF NOT EXISTS end_date date;

COMMENT ON COLUMN public.ai_courses.start_date IS '수업 시작일 (vision #160)';
COMMENT ON COLUMN public.ai_courses.end_date IS '수업 종료일 (vision #160)';
