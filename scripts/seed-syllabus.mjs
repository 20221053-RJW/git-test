/**
 * 실라부스 PDF seed 스크립트
 * 사용법: node scripts/seed-syllabus.mjs
 *
 * syllabus-data/metadata.json 을 읽고,
 * 각 항목의 PDF를 syllabus-data/<fileName> 에서 읽어
 * Supabase Storage ai_syllabi 버킷에 업로드한 뒤
 * ai_course_syllabi 테이블에 메타데이터를 저장합니다.
 *
 * PDF 파일이 없으면 해당 항목을 건너뜁니다.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const metaPath = path.join(root, "syllabus-data/metadata.json");
const envFile = path.join(root, ".env");

// ── .env 로드 ──────────────────────────────────────────────────────────────
function loadDotEnv(filePath) {
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = val;
  }
}
loadDotEnv(envFile);

const SUPABASE_URL = (process.env.VITE_SUPABASE_URL ?? "").replace(/\/$/, "");
const ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
// service role key가 있으면 사용, 없으면 anon key (Alpha RLS로 public INSERT 허용)
const AUTH_KEY = SERVICE_KEY || ANON_KEY;

if (!SUPABASE_URL || !AUTH_KEY) {
  console.error("VITE_SUPABASE_URL 또는 KEY가 .env에 없습니다.");
  process.exit(1);
}

const headers = {
  apikey: AUTH_KEY,
  Authorization: `Bearer ${AUTH_KEY}`,
};

// ── Supabase Storage 업로드 ────────────────────────────────────────────────
async function uploadToStorage(storageKey, buffer, mimeType) {
  const url = `${SUPABASE_URL}/storage/v1/object/ai_syllabi/${storageKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": mimeType,
      "x-upsert": "true",
    },
    body: buffer,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Storage 업로드 실패 (${res.status}): ${body}`);
  }
  return `${SUPABASE_URL}/storage/v1/object/public/ai_syllabi/${storageKey}`;
}

// ── ai_course_syllabi INSERT ───────────────────────────────────────────────
async function insertSyllabus(row) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/ai_course_syllabi`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`DB 삽입 실패 (${res.status}): ${body}`);
  }
  return res.json();
}

// ── 메인 ──────────────────────────────────────────────────────────────────
async function main() {
  if (!existsSync(metaPath)) {
    console.error(`metadata.json 없음: ${metaPath}`);
    process.exit(1);
  }

  const items = JSON.parse(readFileSync(metaPath, "utf8"));
  console.log(`📄 ${items.length}개 항목 처리 시작\n`);

  let ok = 0;
  let skipped = 0;

  for (const item of items) {
    // filePath가 있으면 절대 경로, 없으면 syllabus-data/<fileName>
    const pdfPath = item.filePath ?? path.join(root, "syllabus-data", item.fileName);
    if (!existsSync(pdfPath)) {
      console.warn(`  ⚠ 파일 없음, 건너뜀: ${pdfPath}`);
      skipped++;
      continue;
    }

    console.log(`  → ${item.fileName} (${item.courseName})`);
    try {
      const buffer = readFileSync(pdfPath);
      const fileSize = statSync(pdfPath).size;
      const storageKey = `${Date.now()}_${item.fileName}`;
      const publicUrl = await uploadToStorage(storageKey, buffer, "application/pdf");

      await insertSyllabus({
        course_name: item.courseName,
        course_code: item.courseCode ?? null,
        department: item.department ?? null,
        semester: item.semester ?? null,
        grade: item.grade ?? null,
        professor: item.professor ?? null,
        file_name: item.fileName,
        file_size: fileSize,
        mime_type: "application/pdf",
        public_url: publicUrl,
      });

      console.log(`     ✅ 완료: ${publicUrl}`);
      ok++;
    } catch (err) {
      console.error(`     ❌ 오류: ${err.message}`);
    }
  }

  console.log(`\n완료: ${ok}개 성공, ${skipped}개 건너뜀`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
