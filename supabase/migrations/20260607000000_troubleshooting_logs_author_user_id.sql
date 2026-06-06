-- ai_team_detail_troubleshooting_logs에 author_user_id 컬럼 추가
-- 마이페이지에서 본인이 작성한 트러블슈팅 로그만 표시하기 위해 필요

ALTER TABLE public.ai_team_detail_troubleshooting_logs
  ADD COLUMN IF NOT EXISTS author_user_id UUID REFERENCES public.ai_users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS ai_team_detail_troubleshooting_logs_author_user_id_idx
  ON public.ai_team_detail_troubleshooting_logs (author_user_id);
