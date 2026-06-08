export const SYLLABUS_MAX_BYTES = 52_428_800; // 50MB — ai_syllabi bucket limit

export const SYLLABUS_ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export const SYLLABUS_ACCEPT_ATTR =
  "application/pdf,image/jpeg,image/png,image/webp,.pdf,.jpg,.jpeg,.png,.webp";

const EXTENSION_TO_MIME: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export function syllabusFileExtension(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  if (dot === -1) return "";
  return fileName.slice(dot + 1).toLowerCase();
}

export function resolveSyllabusMimeType(file: File): string | null {
  const type = file.type?.trim().toLowerCase();
  if (type && SYLLABUS_ALLOWED_MIME_TYPES.has(type)) return type;

  const ext = syllabusFileExtension(file.name);
  const fromExt = EXTENSION_TO_MIME[ext];
  if (fromExt && SYLLABUS_ALLOWED_MIME_TYPES.has(fromExt)) return fromExt;

  return null;
}

export function isAllowedSyllabusFile(file: File): boolean {
  return resolveSyllabusMimeType(file) !== null;
}

export function validateSyllabusFile(file: File): string | null {
  if (!isAllowedSyllabusFile(file)) {
    return "PDF, JPG, PNG, WebP만 업로드할 수 있습니다.";
  }
  if (file.size > SYLLABUS_MAX_BYTES) {
    return "파일 크기는 50MB 이하여야 합니다.";
  }
  if (file.size <= 0) {
    return "빈 파일은 업로드할 수 없습니다.";
  }
  return null;
}
