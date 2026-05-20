// CampusConnect — AI 마이페이지 리포트 (T-030 스텁)
// 배포: supabase functions deploy generate-report
// Secret: OPENAI_API_KEY (인간 발급)

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // TODO(T-030): 1) JWT 검증 2) userId/projectIds로 Supabase 집계 3) LLM 호출
  const body = {
    code: "NOT_IMPLEMENTED",
    message:
      "generate-report Edge Function 스텁입니다. OPENAI_API_KEY Secret과 집계 로직 배포 후 활성화됩니다.",
  };

  return new Response(JSON.stringify(body), {
    status: 501,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
