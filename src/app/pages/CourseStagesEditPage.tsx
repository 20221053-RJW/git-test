import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../api/supabase-api";
import PageLoading from "../components/layout/PageLoading";
import { useAuth } from "../contexts/AuthContext";

export default function CourseStagesEditPage() {
  const { courseId = "" } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { isProfessor, isAdmin } = useAuth();
  const [stageNames, setStageNames] = useState<string[]>([""]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;
    void api.teamStages
      .getByCourse(courseId)
      .then((stages) => {
        setStageNames(stages.length > 0 ? stages.map((s) => s.name) : [""]);
      })
      .finally(() => setLoading(false));
  }, [courseId]);

  if (!isProfessor && !isAdmin) {
    return (
      <p className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
        교수만 팀플 스테이지를 수정할 수 있습니다.
      </p>
    );
  }

  if (loading) {
    return <PageLoading message="스테이지를 불러오는 중…" />;
  }

  const detailPath = `/app/courses/${courseId}`;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6" data-testid="course-stages-edit-page">
      <div>
        <Link to={detailPath} className="text-sm font-bold text-[#155dfc] hover:underline">
          ← 수업 상세
        </Link>
        <h1 className="mt-2 text-2xl font-black text-gray-900">팀플 스테이지 수정</h1>
        <p className="mt-1 text-sm text-gray-600">
          팀 카드 진행 단계에 표시되는 이름입니다. 순서대로 저장됩니다.
        </p>
      </div>

      <form
        className="space-y-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={async (e) => {
          e.preventDefault();
          setSaving(true);
          setError(null);
          try {
            await api.teamStages.replace(courseId, stageNames);
            navigate(detailPath);
          } catch (err) {
            setError(err instanceof Error ? err.message : "저장에 실패했습니다.");
          } finally {
            setSaving(false);
          }
        }}
      >
        {stageNames.map((name, index) => (
          <div key={index} className="flex gap-2">
            <span className="flex h-10 w-8 items-center justify-center text-sm font-bold text-gray-500">
              {index + 1}
            </span>
            <input
              value={name}
              onChange={(e) => {
                const next = [...stageNames];
                next[index] = e.target.value;
                setStageNames(next);
              }}
              placeholder="예: 중간 발표"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
              data-testid={`course-stage-input-${index}`}
            />
            {stageNames.length > 1 && (
              <button
                type="button"
                className="rounded-lg border border-gray-300 px-3 text-sm text-gray-600 hover:bg-gray-50"
                onClick={() => setStageNames(stageNames.filter((_, i) => i !== index))}
              >
                삭제
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="text-sm font-bold text-[#155dfc] hover:underline"
          onClick={() => setStageNames([...stageNames, ""])}
        >
          + 단계 추가
        </button>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          data-testid="course-stages-save"
          className="w-full rounded-lg bg-[#155dfc] py-2.5 text-sm font-bold text-white disabled:opacity-60"
        >
          {saving ? "저장 중…" : "스테이지 저장"}
        </button>
      </form>
    </div>
  );
}
