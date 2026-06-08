import { useRef, useState, type DragEvent } from "react";
import { SYLLABUS_ACCEPT_ATTR, validateSyllabusFile } from "../utils/syllabusUpload";

type SyllabusUploadDropzoneProps = {
  disabled?: boolean;
  onFileSelected: (file: File) => void;
};

export default function SyllabusUploadDropzone({
  disabled = false,
  onFileSelected,
}: SyllabusUploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file || disabled) return;
    const validationError = validateSyllabusFile(file);
    if (validationError) {
      setLocalError(validationError);
      return;
    }
    setLocalError(null);
    onFileSelected(file);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    handleFile(event.dataTransfer.files[0]);
  };

  return (
    <div className="mb-8">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={[
          "m3-surface-card cursor-pointer border-2 border-dashed p-8 text-center transition-colors",
          dragOver ? "border-[var(--cc-primary)] bg-[var(--cc-primary-container)]" : "border-[var(--cc-outline-variant)]",
          disabled ? "pointer-events-none opacity-60" : "hover:border-[var(--cc-primary)]",
        ].join(" ")}
        data-testid="syllabus-upload-dropzone"
      >
        <p className="text-base font-bold text-[var(--cc-on-surface)]">
          강의계획서 사진이나 PDF를 올려 주세요
        </p>
        <p className="cc-text-secondary mt-2 text-sm">
          드래그 앤 드롭 또는 클릭 · PDF, JPG, PNG, WebP (최대 50MB)
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={SYLLABUS_ACCEPT_ATTR}
          className="sr-only"
          disabled={disabled}
          data-testid="syllabus-upload-input"
          onChange={(event) => {
            handleFile(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </div>
      {localError ? (
        <p role="alert" className="cc-alert-error mt-3 rounded-lg px-4 py-2 text-sm">
          {localError}
        </p>
      ) : null}
    </div>
  );
}
