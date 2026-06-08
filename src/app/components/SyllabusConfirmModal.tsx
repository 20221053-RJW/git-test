import { useEffect, useState, type FormEvent } from "react";
import AppModal from "./layout/AppModal";
import M3Button from "./layout/M3Button";
import { api } from "../api/supabase-api";
import { DEFAULT_SYLLABUS_STAGE_NAMES } from "../utils/syllabusDedup";
import type { SyllabusConfirmedFields, SyllabusDedupPreview } from "../types/syllabus";

type SyllabusConfirmModalProps = {
  open: boolean;
  initialFields: SyllabusConfirmedFields;
  onClose: () => void;
  onSuccess: (result: { action: "created" | "joined"; courseId: string; courseName: string }) => void;
  syllabusId: string;
};

export default function SyllabusConfirmModal({
  open,
  initialFields,
  onClose,
  onSuccess,
  syllabusId,
}: SyllabusConfirmModalProps) {
  const [fields, setFields] = useState<SyllabusConfirmedFields>(initialFields);
  const [stages, setStages] = useState<string[]>(
    initialFields.stages?.length ? initialFields.stages : [...DEFAULT_SYLLABUS_STAGE_NAMES]
  );
  const [stageInput, setStageInput] = useState("");
  const [dedupPreview, setDedupPreview] = useState<SyllabusDedupPreview | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setFields(initialFields);
    setStages(initialFields.stages?.length ? initialFields.stages : [...DEFAULT_SYLLABUS_STAGE_NAMES]);
    setError(null);
  }, [open, initialFields]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      void api.syllabi
        .previewDedup({ ...fields, stages })
        .then(setDedupPreview)
        .catch(() => setDedupPreview(null));
    }, 300);
    return () => window.clearTimeout(timer);
  }, [open, fields, stages]);

  const updateField = <K extends keyof SyllabusConfirmedFields>(key: K, value: SyllabusConfirmedFields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const addStage = () => {
    const name = stageInput.trim();
    if (!name || stages.includes(name)) return;
    setStages((prev) => [...prev, name]);
    setStageInput("");
  };

  const removeStage = (name: string) => {
    setStages((prev) => prev.filter((stage) => stage !== name));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const result = await api.syllabi.createOrJoin(syllabusId, { ...fields, stages });
      onSuccess(result);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "수업 등록에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const isJoin = Boolean(dedupPreview?.existingCourse);
  const primaryLabel = isJoin ? "이 수업 참여" : "수업 등록";

  return (
    <AppModal
      open={open}
      onClose={onClose}
      testId="syllabus-confirm-modal"
      ariaLabel="강의계획서 확인"
      panelClassName="max-w-xl"
    >
      <form onSubmit={handleSubmit}>
        <h2 className="cc-modal-title mb-1">강의계획서 정보 확인</h2>
        <p className="cc-modal-subtitle mb-5">
          AI가 읽은 내용을 검토하고 수정한 뒤 등록하세요.
        </p>

        {dedupPreview ? (
          <div
            className={`mb-4 rounded-xl px-4 py-3 text-sm ${
              isJoin ? "cc-alert-info" : "bg-[var(--cc-surface-variant)] text-[var(--cc-on-surface-variant)]"
            }`}
          >
            {isJoin
              ? `이미 등록된 수업이 있습니다: ${dedupPreview.existingCourse?.name}`
              : "이 수업이 처음 등록됩니다."}
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="cc-field cc-form-label sm:col-span-2">
            과목명 *
            <input
              required
              value={fields.courseName}
              onChange={(e) => updateField("courseName", e.target.value)}
              className="cc-input"
            />
          </label>
          <label className="cc-field cc-form-label">
            학수번호
            <input
              value={fields.courseCode ?? ""}
              onChange={(e) => updateField("courseCode", e.target.value)}
              className="cc-input"
              placeholder="예: 2150559701"
            />
          </label>
          <label className="cc-field cc-form-label">
            학기 *
            <input
              required
              value={fields.semester}
              onChange={(e) => updateField("semester", e.target.value)}
              className="cc-input"
              placeholder="예: 2026-1"
            />
          </label>
          <label className="cc-field cc-form-label">
            담당교수 *
            <input
              required
              value={fields.professor}
              onChange={(e) => updateField("professor", e.target.value)}
              className="cc-input"
            />
          </label>
          <label className="cc-field cc-form-label">
            학과
            <input
              value={fields.department ?? ""}
              onChange={(e) => updateField("department", e.target.value)}
              className="cc-input"
            />
          </label>
          <label className="cc-field cc-form-label sm:col-span-2">
            수업 시간
            <input
              value={fields.schedule ?? ""}
              onChange={(e) => updateField("schedule", e.target.value)}
              className="cc-input"
              placeholder="예: 월3,4"
            />
          </label>
        </div>

        <div className="mt-4">
          <p className="cc-label mb-2">팀플 단계</p>
          <div className="flex flex-wrap gap-2">
            {stages.map((stage) => (
              <span
                key={stage}
                className="inline-flex items-center gap-1 rounded-full bg-[var(--cc-surface-variant)] px-3 py-1 text-sm"
              >
                {stage}
                <button
                  type="button"
                  onClick={() => removeStage(stage)}
                  className="cc-icon-btn-ghost text-xs"
                  aria-label={`${stage} 삭제`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input
              value={stageInput}
              onChange={(e) => setStageInput(e.target.value)}
              placeholder="단계 추가"
              className="cc-input flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addStage();
                }
              }}
            />
            <M3Button type="button" variant="outlined" onClick={addStage}>
              추가
            </M3Button>
          </div>
        </div>

        {error ? (
          <p role="alert" className="cc-alert-error mt-4 rounded-lg px-4 py-2 text-sm">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <M3Button type="button" variant="outlined" onClick={onClose} disabled={submitting}>
            취소
          </M3Button>
          <M3Button type="submit" variant="filled" disabled={submitting} data-testid="syllabus-confirm-submit">
            {submitting ? "처리 중…" : primaryLabel}
          </M3Button>
        </div>
      </form>
    </AppModal>
  );
}
