-- ai_course_syllabi 테이블 + ai_syllabi 버킷 + RLS (Alpha 패턴)

CREATE TABLE IF NOT EXISTS public.ai_course_syllabi (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_name   text NOT NULL,
  course_code   text,
  department    text,
  semester      text,
  grade         text,
  professor     text,
  file_name     text NOT NULL,
  file_size     bigint NOT NULL DEFAULT 0,
  mime_type     text,
  public_url    text NOT NULL,
  -- AI 추출 결과 자리 (미래 확장용)
  ai_status     text NOT NULL DEFAULT 'pending',
  ai_data       jsonb,
  created_at    timestamptz NOT NULL DEFAULT now()
);

INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('ai_syllabi', 'ai_syllabi', true, 52428800)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit;

ALTER TABLE public.ai_course_syllabi ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read ai_course_syllabi" ON public.ai_course_syllabi;
CREATE POLICY "Allow public read ai_course_syllabi"
  ON public.ai_course_syllabi FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert ai_course_syllabi" ON public.ai_course_syllabi;
CREATE POLICY "Allow public insert ai_course_syllabi"
  ON public.ai_course_syllabi FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete ai_course_syllabi" ON public.ai_course_syllabi;
CREATE POLICY "Allow public delete ai_course_syllabi"
  ON public.ai_course_syllabi FOR DELETE USING (true);

DROP POLICY IF EXISTS "ai_syllabi_storage_select" ON storage.objects;
CREATE POLICY "ai_syllabi_storage_select"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'ai_syllabi');

DROP POLICY IF EXISTS "ai_syllabi_storage_insert" ON storage.objects;
CREATE POLICY "ai_syllabi_storage_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'ai_syllabi');

DROP POLICY IF EXISTS "ai_syllabi_storage_delete" ON storage.objects;
CREATE POLICY "ai_syllabi_storage_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'ai_syllabi');
