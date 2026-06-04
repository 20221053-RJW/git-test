-- vision #148: 조원평가 시 평가자가 입력한 기여도(0~100)

ALTER TABLE public.ai_team_detail_peer_reviews
  ADD COLUMN IF NOT EXISTS contribution_rating smallint;

COMMENT ON COLUMN public.ai_team_detail_peer_reviews.contribution_rating IS
  'Reviewer-assigned contribution percent (0-100) for teammate';
