-- 팀 채팅·1:1 채팅 Realtime publication + SELECT (Realtime 수신·클라이언트 조회)

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_team_detail_chat_messages;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_direct_messages;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE public.ai_team_detail_chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public select ai_team_detail_chat_messages" ON public.ai_team_detail_chat_messages;
CREATE POLICY "Allow public select ai_team_detail_chat_messages"
  ON public.ai_team_detail_chat_messages FOR SELECT
  USING (true);

ALTER TABLE public.ai_direct_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert ai_direct_messages" ON public.ai_direct_messages;
CREATE POLICY "Allow public insert ai_direct_messages"
  ON public.ai_direct_messages FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select ai_direct_messages" ON public.ai_direct_messages;
CREATE POLICY "Allow public select ai_direct_messages"
  ON public.ai_direct_messages FOR SELECT
  USING (true);
