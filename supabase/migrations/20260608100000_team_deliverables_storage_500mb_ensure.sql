-- 팀 산출물 Storage 버킷: 500MB 한도 보장
-- (대시보드 기본 50MB 또는 미적용 마이그레이션 대비 INSERT ... ON CONFLICT)

INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('ai_team_deliverables', 'ai_team_deliverables', true, 524288000)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  public = EXCLUDED.public;
