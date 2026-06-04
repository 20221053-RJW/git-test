-- 네비 인박스: 본인이 올린 공지는 미확인 알림에서 제외

ALTER TABLE public.ai_announcements
  ADD COLUMN IF NOT EXISTS author_user_id uuid REFERENCES public.ai_users (id) ON DELETE SET NULL;

UPDATE public.ai_announcements AS a
SET author_user_id = c.instructor_user_id
FROM public.ai_courses AS c
WHERE a.course_id = c.id
  AND a.author_user_id IS NULL;

CREATE INDEX IF NOT EXISTS ai_announcements_author_user_id_idx
  ON public.ai_announcements (author_user_id);
