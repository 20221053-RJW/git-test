import { supabase } from "../supabase";
import type { SyllabusExtractedFields } from "../types/syllabus";

const FUNCTION_NAME = "extract-syllabus";

function edgeFunctionHeaders(): Record<string, string> | undefined {
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!key || typeof key !== "string") return undefined;
  return {
    Authorization: `Bearer ${key}`,
    apikey: key,
  };
}

function extractEdgeError(data: unknown, fallback: string): string | null {
  if (data && typeof data === "object" && "error" in data) {
    const message = (data as { error?: unknown }).error;
    if (typeof message === "string" && message.trim()) return message;
  }
  return null;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

export function parseSyllabusExtractedFields(value: unknown): SyllabusExtractedFields | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const courseName = typeof row.courseName === "string" ? row.courseName.trim() : "";
  const semester = typeof row.semester === "string" ? row.semester.trim() : "";
  const professor = typeof row.professor === "string" ? row.professor.trim() : "";
  if (!courseName || !semester || !professor) return null;

  return {
    courseName,
    courseCode: typeof row.courseCode === "string" ? row.courseCode.trim() : undefined,
    semester,
    professor,
    department: typeof row.department === "string" ? row.department.trim() : undefined,
    schedule: typeof row.schedule === "string" ? row.schedule.trim() : undefined,
    grade: typeof row.grade === "string" ? row.grade.trim() : undefined,
    stages: asStringArray(row.stages),
  };
}

export type ExtractSyllabusResponse = {
  syllabusId: string;
  aiStatus: "done" | "failed";
  fields?: SyllabusExtractedFields;
  error?: string;
};

/**
 * POST /functions/v1/extract-syllabus
 */
export async function extractSyllabusFromEdge(syllabusId: string): Promise<ExtractSyllabusResponse> {
  const { data, error } = await supabase.functions.invoke(FUNCTION_NAME, {
    body: { syllabusId },
    headers: edgeFunctionHeaders(),
  });

  const bodyError = extractEdgeError(data, "");
  if (bodyError) throw new Error(bodyError);

  if (error) {
    const message = error.message ?? "강의계획서 분석에 실패했습니다.";
    const lower = message.toLowerCase();
    if (
      lower.includes("404") ||
      lower.includes("not found") ||
      lower.includes("failed to send a request to the edge function")
    ) {
      throw new Error(
        "extract-syllabus Edge에 연결할 수 없습니다. `supabase functions deploy extract-syllabus` 후 새로고침하세요."
      );
    }
    throw new Error(message);
  }

  const payload = data as ExtractSyllabusResponse | null;
  if (!payload || typeof payload !== "object" || typeof payload.syllabusId !== "string") {
    throw new Error("강의계획서 분석 응답 형식이 올바르지 않습니다.");
  }

  return payload;
}
