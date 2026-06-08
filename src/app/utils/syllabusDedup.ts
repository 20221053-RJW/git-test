import type { SyllabusConfirmedFields } from "../types/syllabus";

export function normalizeDedupPart(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9가-힣]/g, "");
}

export function computeSyllabusDedupKey(fields: SyllabusConfirmedFields): string {
  const semester = normalizeDedupPart(fields.semester);
  const professor = normalizeDedupPart(fields.professor);
  const code = fields.courseCode?.trim();

  if (code) {
    return `${normalizeDedupPart(code)}|${semester}|${professor}`;
  }

  const name = normalizeDedupPart(fields.courseName);
  return `${name}|${semester}|${professor}`;
}

export function syllabusCourseCodeFromFields(fields: SyllabusConfirmedFields): string {
  const code = fields.courseCode?.trim();
  if (code) return code.toUpperCase();

  const dedup = computeSyllabusDedupKey(fields);
  const slug = dedup
    .replace(/\|/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 24);
  return `SYL-${slug || Date.now().toString(36).toUpperCase()}`;
}

export const DEFAULT_SYLLABUS_STAGE_NAMES = [
  "아이디어 기획",
  "서비스 디자인",
  "프론트 개발",
  "백엔드 개발",
  "발표 및 배포",
];
