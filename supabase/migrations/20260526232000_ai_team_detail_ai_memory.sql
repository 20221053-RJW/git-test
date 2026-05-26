-- 팀 AI 진행 요약 — 프로젝트 상태 기억·증분 분석용 (vision #125·#132)

CREATE TABLE IF NOT EXISTS public.ai_team_detail_ai_memory (
  team_id text PRIMARY KEY REFERENCES public.ai_teams (id) ON DELETE CASCADE,
  memory_markdown text NOT NULL DEFAULT '',
  analyzed_deliverable_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
  last_insight_summary text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ai_team_detail_ai_memory_updated_at_idx
  ON public.ai_team_detail_ai_memory (updated_at DESC);

COMMENT ON TABLE public.ai_team_detail_ai_memory IS '팀별 AI 진행 요약 기억 문서·이미 분석한 산출물 ID 목록';
COMMENT ON COLUMN public.ai_team_detail_ai_memory.memory_markdown IS 'AI 자체 기억용 프로젝트 상태 요약 (마크다운)';
COMMENT ON COLUMN public.ai_team_detail_ai_memory.analyzed_deliverable_ids IS '이미 ZIP/소스 분석 완료한 ai_team_deliverables.id 배열';

ALTER TABLE public.ai_team_detail_ai_memory ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read ai_team_detail_ai_memory" ON public.ai_team_detail_ai_memory;
CREATE POLICY "Allow public read ai_team_detail_ai_memory"
  ON public.ai_team_detail_ai_memory
  FOR SELECT
  USING (true);
