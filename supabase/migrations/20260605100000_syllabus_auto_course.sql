-- 실라버스 업로드 → AI 추출 → 자동 수업 생성/합류

ALTER TABLE public.ai_courses
  ADD COLUMN IF NOT EXISTS syllabus_dedup_key text,
  ADD COLUMN IF NOT EXISTS initiated_by_user_id text;

CREATE UNIQUE INDEX IF NOT EXISTS ai_courses_syllabus_dedup_key_uidx
  ON public.ai_courses (syllabus_dedup_key)
  WHERE syllabus_dedup_key IS NOT NULL;

ALTER TABLE public.ai_course_syllabi
  ADD COLUMN IF NOT EXISTS uploader_user_id text,
  ADD COLUMN IF NOT EXISTS matched_course_id text REFERENCES public.ai_courses (id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS storage_path text,
  ADD COLUMN IF NOT EXISTS dedup_key text;

CREATE INDEX IF NOT EXISTS ai_course_syllabi_dedup_key_idx
  ON public.ai_course_syllabi (dedup_key)
  WHERE dedup_key IS NOT NULL;

CREATE INDEX IF NOT EXISTS ai_course_syllabi_matched_course_id_idx
  ON public.ai_course_syllabi (matched_course_id)
  WHERE matched_course_id IS NOT NULL;

DROP POLICY IF EXISTS "Allow public insert ai_course_syllabi" ON public.ai_course_syllabi;
CREATE POLICY "Allow insert ai_course_syllabi with uploader"
  ON public.ai_course_syllabi FOR INSERT
  WITH CHECK (uploader_user_id IS NOT NULL);

DROP POLICY IF EXISTS "Allow public delete ai_course_syllabi" ON public.ai_course_syllabi;

DROP POLICY IF EXISTS "Allow update ai_course_syllabi" ON public.ai_course_syllabi;
CREATE POLICY "Allow update ai_course_syllabi"
  ON public.ai_course_syllabi FOR UPDATE
  USING (true)
  WITH CHECK (true);
