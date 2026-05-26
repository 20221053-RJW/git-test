import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router";

import { api } from "../api/supabase-api";

import StageNameListEditor, {

  createStageRow,

  type StageRow,

} from "../components/courses/StageNameListEditor";

import PageLoading from "../components/layout/PageLoading";
import M3Button from "../components/layout/M3Button";

import { useAuth } from "../contexts/AuthContext";



export default function CourseStagesEditPage() {

  const { courseId = "" } = useParams<{ courseId: string }>();

  const navigate = useNavigate();

  const { isProfessor, isAdmin } = useAuth();

  const [rows, setRows] = useState<StageRow[]>([createStageRow()]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);



  useEffect(() => {

    if (!courseId) return;

    void api.teamStages

      .getByCourse(courseId)

      .then((stages) => {

        setRows(stages.length > 0 ? stages.map((s) => createStageRow(s.name)) : [createStageRow()]);

      })

      .finally(() => setLoading(false));

  }, [courseId]);



  if (!isProfessor && !isAdmin) {

    return (

      <p className="m3-surface-card p-6 text-sm text-[var(--cc-on-surface-variant)]">

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

        <Link to={detailPath} className="cc-link text-sm font-bold hover:underline">

          ← 수업 상세

        </Link>

        <h1 className="m3-title-large mt-2 font-black text-[var(--cc-on-surface)]">
          팀플 스테이지 수정
        </h1>

        <p className="mt-1 text-sm text-[var(--cc-on-surface-variant)]">

          팀 카드 진행 단계에 표시되는 이름입니다. 드래그로 순서를 바꾼 뒤 저장하면 반영됩니다.

        </p>

      </div>



      <form

        className="m3-surface-card space-y-3 p-6"

        onSubmit={async (e) => {

          e.preventDefault();

          setSaving(true);

          setError(null);

          try {

            const names = rows.map((row) => row.name.trim()).filter(Boolean);

            if (names.length === 0) {

              setError("스테이지를 1개 이상 입력해 주세요.");

              return;

            }

            await api.teamStages.replace(courseId, names);

            navigate(detailPath, { replace: true });

          } catch (err) {

            setError(err instanceof Error ? err.message : "저장에 실패했습니다.");

          } finally {

            setSaving(false);

          }

        }}

      >

        <StageNameListEditor rows={rows} onRowsChange={setRows} inputTestIdPrefix="course-stage" />

        <div>
          <button
            type="button"
            className="m3-btn m3-btn--text !min-h-0 !px-0 !py-1 text-sm font-bold"
            onClick={() => setRows([...rows, createStageRow()])}
          >
            + 단계 추가
          </button>
        </div>



        {error && <p className="text-sm text-red-700">{error}</p>}



        <M3Button
          type="submit"
          variant="filled"
          disabled={saving}
          data-testid="course-stages-save"
          className="w-full"
        >
          {saving ? "저장 중…" : "스테이지 저장"}
        </M3Button>

      </form>

    </div>

  );

}

