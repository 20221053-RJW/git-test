import React, { useCallback, useRef, useState } from "react";
import { GripVertical } from "lucide-react";

export type StageRow = {
  id: string;
  name: string;
};

export function createStageRow(name = ""): StageRow {
  return { id: crypto.randomUUID(), name };
}

export function stageRowsFromNames(names: string[]): StageRow[] {
  return names.map((name) => createStageRow(name));
}

type StageNameListEditorProps = {
  rows: StageRow[];
  onRowsChange: (rows: StageRow[]) => void;
  inputTestIdPrefix?: string;
};

/** 드래그 종료 시 항목이 놓일 목표 인덱스 (0 .. rows.length-1) */
function resolveTargetIndex(
  clientY: number,
  rowElements: HTMLElement[],
  dragFrom: number,
  rowCount: number
): number {
  if (rowElements.length === 0) return 0;

  for (let i = 0; i < rowElements.length; i++) {
    const rect = rowElements[i].getBoundingClientRect();

    if (clientY < rect.top) {
      return Math.max(0, Math.min(i, rowCount - 1));
    }

    if (clientY <= rect.bottom) {
      if (i === dragFrom) {
        const relative = (clientY - rect.top) / Math.max(rect.height, 1);
        // 자기 행 중앙 35%는 순서 유지(민감도 완화)
        if (relative > 0.325 && relative < 0.675) return dragFrom;
        if (relative <= 0.325) return Math.max(0, dragFrom - 1);
        return Math.min(rowCount - 1, dragFrom + 1);
      }

      const mid = rect.top + rect.height * 0.5;
      const target = clientY < mid ? i : i + 1;
      return Math.max(0, Math.min(target, rowCount - 1));
    }
  }

  return rowCount - 1;
}

function reorderRows(rows: StageRow[], fromIndex: number, toIndex: number): StageRow[] {
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= rows.length) {
    return rows;
  }
  const next = [...rows];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

export default function StageNameListEditor({
  rows,
  onRowsChange,
  inputTestIdPrefix = "course-stage",
}: StageNameListEditorProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  /** 삽입 가이드라인 — 이 인덱스 위에 표시 */
  const [targetIndex, setTargetIndex] = useState<number | null>(null);

  const finishDrag = useCallback(() => {
    setDragIndex(null);
    setTargetIndex(null);
  }, []);

  const readRowElements = useCallback((): HTMLElement[] => {
    const list = listRef.current;
    if (!list) return [];
    return Array.from(list.querySelectorAll<HTMLElement>("[data-stage-row]"));
  }, []);

  const updateTarget = useCallback(
    (clientY: number, fromIndex: number) => {
      const next = resolveTargetIndex(clientY, readRowElements(), fromIndex, rows.length);
      setTargetIndex((prev) => (prev === next ? prev : next));
    },
    [readRowElements, rows.length]
  );

  const handleListDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    if (dragIndex === null) return;
    updateTarget(event.clientY, dragIndex);
  };

  const handleListDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (dragIndex === null) {
      finishDrag();
      return;
    }

    const to = resolveTargetIndex(event.clientY, readRowElements(), dragIndex, rows.length);
    const next = reorderRows(rows, dragIndex, to);
    if (next !== rows) onRowsChange(next);
    finishDrag();
  };

  const handleDragStart = (index: number) => (event: React.DragEvent) => {
    setDragIndex(index);
    setTargetIndex(index);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(index));
    const row = (event.target as HTMLElement).closest("[data-stage-row]");
    if (row instanceof HTMLElement) {
      event.dataTransfer.setDragImage(row, 24, 20);
    }
  };

  return (
    <div className="space-y-2" data-testid="stage-name-list-editor">
      <div
        ref={listRef}
        className="cc-stage-list-dnd -mx-1 space-y-2.5 px-1 py-1"
        onDragOver={handleListDragOver}
        onDrop={handleListDrop}
      >
        {rows.map((row, index) => {
          const isDragging = dragIndex === index;
          const showLineAbove =
            targetIndex === index && dragIndex !== null && targetIndex !== dragIndex;

          return (
            <div key={row.id} className="relative">
              {showLineAbove && (
                <div
                  className="cc-dnd-line absolute left-1 right-1 top-0 z-10 h-1 -translate-y-1/2"
                  aria-hidden
                />
              )}
              <div
                data-stage-row
                className={`flex items-center gap-2 rounded-lg border bg-[var(--cc-surface)] px-1 py-2 transition-[opacity,box-shadow] ${
                  isDragging
                    ? "border-[var(--cc-primary-border)] opacity-50 shadow-md"
                    : "border-[var(--cc-outline-variant)]"
                }`}
              >
                <button
                  type="button"
                  draggable
                  onDragStart={handleDragStart(index)}
                  onDragEnd={finishDrag}
                  className="flex h-10 w-9 shrink-0 cursor-grab touch-none items-center justify-center rounded-md text-[var(--cc-on-surface-variant)] hover:bg-[var(--cc-surface-container)] active:cursor-grabbing"
                  aria-label={`${index + 1}번째 스테이지 순서 변경`}
                  data-testid={`${inputTestIdPrefix}-drag-handle-${index}`}
                >
                  <GripVertical className="h-4 w-4" aria-hidden />
                </button>
                <span className="flex h-10 w-6 shrink-0 items-center justify-center text-sm font-bold text-[var(--cc-on-surface-variant)]">
                  {index + 1}
                </span>
                <input
                  value={row.name}
                  onChange={(e) => {
                    const next = rows.map((r, i) =>
                      i === index ? { ...r, name: e.target.value } : r
                    );
                    onRowsChange(next);
                  }}
                  placeholder="예: 중간 발표"
                  className="cc-input flex-1 text-sm"
                  data-testid={`${inputTestIdPrefix}-input-${index}`}
                />
                {rows.length > 1 && (
                  <button
                    type="button"
                    className="shrink-0 rounded-lg border border-[var(--cc-outline-variant)] px-3 py-2 text-sm text-[var(--cc-on-surface-variant)] hover:bg-[var(--cc-surface-container)]"
                    onClick={() => onRowsChange(rows.filter((_, i) => i !== index))}
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-[var(--cc-on-surface-variant)]">
        ⋮⋮ 핸들을 드래그한 뒤, 다른 행의 <strong>위·아래 가장자리</strong>에 놓으면 순서가 바뀝니다.
      </p>
    </div>
  );
}
