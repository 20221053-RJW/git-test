-- 기존 트러블슈팅 로그의 author_user_id 백필
-- ai_users.name과 정확히 1:1 매칭되는 경우에만 업데이트 (동명이인 로그는 NULL 유지)

UPDATE public.ai_team_detail_troubleshooting_logs t
SET author_user_id = (
  SELECT id
  FROM public.ai_users u
  WHERE u.name = t.author
  LIMIT 1
)
WHERE t.author_user_id IS NULL
  AND (
    SELECT COUNT(*)
    FROM public.ai_users u
    WHERE u.name = t.author
  ) = 1;
