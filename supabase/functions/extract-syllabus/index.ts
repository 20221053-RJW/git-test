/**
 * extract-syllabus — 강의계획서 PDF/이미지 → 구조화 JSON (Gemini Vision)
 *
 * Secret: GEMINI_API_KEY
 * 배포: supabase functions deploy extract-syllabus
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

type ExtractRequest = {
  syllabusId?: string;
};

type SyllabusRow = {
  id: string;
  public_url: string;
  mime_type: string | null;
  file_name: string;
};

type ExtractedFields = {
  courseName: string;
  courseCode?: string;
  semester: string;
  professor: string;
  department?: string;
  schedule?: string;
  grade?: string;
  stages?: string[];
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function normalizeExtractedFields(parsed: Record<string, unknown>): ExtractedFields | null {
  const courseName = typeof parsed.courseName === "string" ? parsed.courseName.trim() : "";
  const semester = typeof parsed.semester === "string" ? parsed.semester.trim() : "";
  const professor = typeof parsed.professor === "string" ? parsed.professor.trim() : "";
  if (!courseName || !semester || !professor) return null;

  return {
    courseName,
    courseCode: typeof parsed.courseCode === "string" ? parsed.courseCode.trim() : undefined,
    semester,
    professor,
    department: typeof parsed.department === "string" ? parsed.department.trim() : undefined,
    schedule: typeof parsed.schedule === "string" ? parsed.schedule.trim() : undefined,
    grade: typeof parsed.grade === "string" ? parsed.grade.trim() : undefined,
    stages: asStringArray(parsed.stages),
  };
}

function buildSystemPrompt(): string {
  return `You extract structured metadata from Korean university course syllabi (강의계획서).
Read the uploaded document image or PDF carefully.
Return JSON only with keys:
courseName (string, required),
courseCode (string, 학수번호 if present),
semester (string, e.g. 2026-1),
professor (string, 담당교수),
department (string),
schedule (string, e.g. 월3,4),
grade (string),
stages (string[], team project phases if mentioned, else ["아이디어 기획","서비스 디자인","프론트 개발","백엔드 개발","발표 및 배포"]).
Use only information visible in the document. Do not invent values.`;
}

async function fetchFileAsBase64(url: string): Promise<{ base64: string; mimeType: string }> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`파일을 불러오지 못했습니다 (${response.status}).`);
  }

  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  const base64 = btoa(binary);

  const headerMime = response.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase();
  return { base64, mimeType: headerMime || "application/octet-stream" };
}

async function callGeminiVision(
  apiKey: string,
  modelId: string,
  mimeType: string,
  base64: string
): Promise<ExtractedFields> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelId)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
      contents: [
        {
          role: "user",
          parts: [
            { text: "이 강의계획서에서 수업 메타데이터를 추출해 주세요." },
            { inlineData: { mimeType, data: base64 } },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText.slice(0, 200)}`);
  }

  const completion = await response.json();
  const content = completion?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content || typeof content !== "string") {
    throw new Error("Gemini 응답이 비어 있습니다.");
  }

  const parsed = JSON.parse(content) as Record<string, unknown>;
  const fields = normalizeExtractedFields(parsed);
  if (!fields) {
    throw new Error("필수 필드(과목명, 학기, 담당교수)를 추출하지 못했습니다.");
  }

  return fields;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: "Supabase Edge 환경 변수가 설정되지 않았습니다." }, 500);
  }

  const geminiKey = Deno.env.get("GEMINI_API_KEY")?.trim();
  if (!geminiKey) {
    return jsonResponse({ error: "GEMINI_API_KEY가 설정되지 않았습니다." }, 500);
  }

  let syllabusId = "";

  try {
    const body = (await req.json()) as ExtractRequest;
    syllabusId = body.syllabusId?.trim() ?? "";
    if (!syllabusId) {
      return jsonResponse({ error: "syllabusId is required" }, 400);
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: row, error: fetchError } = await supabase
      .from("ai_course_syllabi")
      .select("id, public_url, mime_type, file_name")
      .eq("id", syllabusId)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!row) return jsonResponse({ error: "강의계획서를 찾을 수 없습니다." }, 404);

    const syllabus = row as SyllabusRow;
    const storedMime = syllabus.mime_type?.trim().toLowerCase() || "";
    const { base64, mimeType: fetchedMime } = await fetchFileAsBase64(syllabus.public_url);
    const mimeType = ALLOWED_MIME_TYPES.has(storedMime)
      ? storedMime
      : ALLOWED_MIME_TYPES.has(fetchedMime)
        ? fetchedMime
        : storedMime || fetchedMime;

    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      throw new Error("지원하지 않는 파일 형식입니다. PDF, JPG, PNG, WebP만 분석할 수 있습니다.");
    }

    const modelId = Deno.env.get("GEMINI_MODEL")?.trim() || DEFAULT_GEMINI_MODEL;
    const fields = await callGeminiVision(geminiKey, modelId, mimeType, base64);

    const { error: updateError } = await supabase
      .from("ai_course_syllabi")
      .update({
        ai_status: "done",
        ai_data: fields,
        course_name: fields.courseName,
        course_code: fields.courseCode ?? null,
        department: fields.department ?? null,
        semester: fields.semester,
        grade: fields.grade ?? null,
        professor: fields.professor,
      })
      .eq("id", syllabusId);

    if (updateError) throw updateError;

    return jsonResponse({
      syllabusId,
      aiStatus: "done",
      fields,
    });
  } catch (error) {
    console.error("[extract-syllabus]", error);
    const message = error instanceof Error ? error.message : "강의계획서 분석에 실패했습니다.";

    if (syllabusId) {
      const supabase = createClient(supabaseUrl!, serviceRoleKey!);
      await supabase
        .from("ai_course_syllabi")
        .update({ ai_status: "failed", ai_data: { error: message } })
        .eq("id", syllabusId);
    }

    return jsonResponse(
      {
        syllabusId,
        aiStatus: "failed",
        error: message,
      },
      500
    );
  }
});
