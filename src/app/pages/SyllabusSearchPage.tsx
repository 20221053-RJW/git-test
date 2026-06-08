import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { api } from "../api/supabase-api";
import type { CourseSyllabus } from "../types";
import type { SyllabusConfirmedFields } from "../types/syllabus";
import PageHeader from "../components/layout/PageHeader";
import PageLoading from "../components/layout/PageLoading";
import M3Button from "../components/layout/M3Button";
import SyllabusUploadDropzone from "../components/SyllabusUploadDropzone";
import SyllabusConfirmModal from "../components/SyllabusConfirmModal";
import { AiGeneratingIndicator } from "../components/AiGeneratingIndicator";
import { useAuth } from "../contexts/AuthContext";
import { DEFAULT_SYLLABUS_STAGE_NAMES } from "../utils/syllabusDedup";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${units[i]}`;
}

function aiStatusLabel(status: string): string {
  if (status === "pending") return "분석 중";
  if (status === "done") return "분석 완료";
  if (status === "failed") return "분석 실패";
  return status;
}

function fieldsFromSyllabus(syllabus: CourseSyllabus): SyllabusConfirmedFields {
  const extracted = syllabus.extractedFields;
  return {
    courseName: extracted?.courseName ?? syllabus.courseName,
    courseCode: extracted?.courseCode ?? syllabus.courseCode,
    semester: extracted?.semester ?? syllabus.semester ?? "",
    professor: extracted?.professor ?? syllabus.professor ?? "",
    department: extracted?.department ?? syllabus.department,
    schedule: extracted?.schedule,
    grade: extracted?.grade ?? syllabus.grade,
    stages: extracted?.stages?.length ? extracted.stages : [...DEFAULT_SYLLABUS_STAGE_NAMES],
  };
}

export default function SyllabusSearchPage() {
  const navigate = useNavigate();
  const { isStudent, isAdmin, user } = useAuth();
  const canUpload = isStudent || isAdmin;

  const [courseName, setCourseName] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [results, setResults] = useState<CourseSyllabus[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [activeSyllabusId, setActiveSyllabusId] = useState<string | null>(null);
  const [confirmFields, setConfirmFields] = useState<SyllabusConfirmedFields | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const handleSearch = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      setLoading(true);
      setError(null);
      try {
        const data = await api.syllabi.search({ courseName, department, semester });
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "검색에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    },
    [courseName, department, semester]
  );

  useEffect(() => {
    void handleSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openConfirmForSyllabus = (syllabus: CourseSyllabus) => {
    setActiveSyllabusId(syllabus.id);
    setConfirmFields(fieldsFromSyllabus(syllabus));
    setConfirmOpen(true);
  };

  const handleUpload = async (file: File) => {
    if (!canUpload) return;
    setUploading(true);
    setExtracting(true);
    setError(null);

    try {
      const uploaded = await api.syllabi.upload(file);
      const analyzed = await api.syllabi.extract(uploaded.id);
      openConfirmForSyllabus(analyzed);
      await handleSearch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드 또는 분석에 실패했습니다.");
    } finally {
      setUploading(false);
      setExtracting(false);
    }
  };

  const handleJoinMatched = async (syllabus: CourseSyllabus) => {
    setActionLoadingId(syllabus.id);
    setError(null);
    try {
      const result = await api.syllabi.joinMatchedCourse(syllabus.id);
      alert(`'${result.courseName}' 수업에 등록되었습니다.`);
      navigate("/app/courses");
    } catch (err) {
      setError(err instanceof Error ? err.message : "수업 참여에 실패했습니다.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleCreateFromResult = async (syllabus: CourseSyllabus) => {
    if (syllabus.aiStatus !== "done") return;
    if (syllabus.matchedCourseId) {
      await handleJoinMatched(syllabus);
      return;
    }
    openConfirmForSyllabus(syllabus);
  };

  return (
    <div className="cc-app-shell w-full py-4 sm:py-6">
      <PageHeader
        title="강의계획서"
        subtitle="사진·PDF 업로드로 수업 등록, 또는 기존 강의계획서 검색"
      />

      {canUpload ? (
        <>
          <SyllabusUploadDropzone disabled={uploading || extracting} onFileSelected={handleUpload} />
          {extracting ? (
            <div className="mb-6">
              <AiGeneratingIndicator message="강의계획서 분석 중…" testId="syllabus-extracting" />
            </div>
          ) : null}
        </>
      ) : (
        <p className="cc-text-secondary m3-surface-card mb-8 p-4 text-sm">
          학생은 강의계획서 업로드로 수업을 등록할 수 있습니다. 교수는 검색·다운로드만 이용할 수 있습니다.
        </p>
      )}

      <form
        onSubmit={handleSearch}
        className="m3-surface-card mb-8 p-6"
      >
        <h2 className="cc-label mb-4 text-base font-bold">강의계획서 검색</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="cc-field cc-form-label">
            과목명
            <input
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="예: 자료구조"
              className="cc-input"
            />
          </label>
          <label className="cc-field cc-form-label">
            학과
            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="예: 컴퓨터공학과"
              className="cc-input"
            />
          </label>
          <label className="cc-field cc-form-label">
            학기
            <input
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              placeholder="예: 2026-1"
              className="cc-input"
            />
          </label>
        </div>
        <M3Button type="submit" variant="filled" disabled={loading} className="mt-4">
          {loading ? "검색 중…" : "검색"}
        </M3Button>
      </form>

      {loading && <PageLoading message="검색 중…" />}

      {error && (
        <p role="alert" className="cc-alert-error mb-4 rounded-xl px-4 py-3 text-sm">
          {error}
        </p>
      )}

      {results !== null && !loading && (
        <>
          <p className="cc-text-secondary mb-4 text-sm">검색 결과 {results.length}건</p>
          {results.length === 0 ? (
            <div className="m3-surface-card border-dashed p-12 text-center">
              <p className="cc-text-secondary">검색 결과가 없습니다.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {results.map((s) => {
                const isOwner = user?.id && s.uploaderUserId === user.id;
                const canJoin = Boolean(s.matchedCourseId);
                const canCreate =
                  canUpload && isOwner && s.aiStatus === "done" && !s.matchedCourseId;
                const busy = actionLoadingId === s.id;

                return (
                  <li key={s.id} className="m3-surface-card p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-base font-bold">{s.courseName}</p>
                          <span className="rounded-full bg-[var(--cc-surface-variant)] px-2 py-0.5 text-xs">
                            {aiStatusLabel(s.aiStatus)}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[var(--cc-on-surface-variant)]">
                          {s.courseCode && <span>{s.courseCode}</span>}
                          {s.department && <span>{s.department}</span>}
                          {s.semester && <span>{s.semester}</span>}
                          {s.grade && <span>{s.grade}학년</span>}
                          {s.professor && <span>담당: {s.professor}</span>}
                        </div>
                        <p className="mt-2 text-xs text-[var(--cc-on-surface-variant)]">
                          {s.fileName} · {formatBytes(s.fileSize)}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-wrap gap-2">
                        <a
                          href={s.publicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-lg border border-[var(--cc-outline)] px-3 py-1.5 text-xs font-medium hover:bg-[var(--cc-surface-variant)]"
                        >
                          보기
                        </a>
                        <a
                          href={s.publicUrl}
                          download={s.fileName}
                          className="inline-flex items-center rounded-lg border border-[var(--cc-outline)] px-3 py-1.5 text-xs font-medium hover:bg-[var(--cc-surface-variant)]"
                        >
                          다운로드
                        </a>
                        {canJoin ? (
                          <M3Button
                            type="button"
                            variant="filled"
                            disabled={busy}
                            onClick={() => void handleJoinMatched(s)}
                          >
                            {busy ? "참여 중…" : "참여하기"}
                          </M3Button>
                        ) : null}
                        {canCreate ? (
                          <M3Button
                            type="button"
                            variant="filled"
                            disabled={busy}
                            onClick={() => void handleCreateFromResult(s)}
                          >
                            수업 만들기
                          </M3Button>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}

      {confirmFields && activeSyllabusId ? (
        <SyllabusConfirmModal
          open={confirmOpen}
          syllabusId={activeSyllabusId}
          initialFields={confirmFields}
          onClose={() => setConfirmOpen(false)}
          onSuccess={(result) => {
            alert(
              result.action === "created"
                ? `'${result.courseName}' 수업이 생성되었습니다.`
                : `'${result.courseName}' 수업에 등록되었습니다.`
            );
            navigate("/app/courses");
          }}
        />
      ) : null}
    </div>
  );
}
