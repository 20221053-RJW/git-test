-- 교수 스테이지 replace: 기존 행 DELETE 후 INSERT (DELETE 정책 없으면 저장 실패)

DROP POLICY IF EXISTS "Allow client delete ai_course_stages" ON public.ai_course_stages;
CREATE POLICY "Allow client delete ai_course_stages"
  ON public.ai_course_stages
  FOR DELETE
  USING (true);

DROP POLICY IF EXISTS "Allow client update ai_course_stages" ON public.ai_course_stages;
CREATE POLICY "Allow client update ai_course_stages"
  ON public.ai_course_stages
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
