import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { api } from "../api/supabase-api";

type Target = "teams" | "students" | "team-detail" | "random-teams";

export function CourseScopedRedirect({ target }: { target: Target }) {
  const { id: teamId } = useParams();
  const [to, setTo] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      try {
        if (target === "team-detail" && teamId) {
          const courseId = await api.navigation.getTeamCourseId(teamId);
          if (!cancelled) {
            if (courseId) setTo(`/app/courses/${courseId}/teams/${teamId}`);
            else setFailed(true);
          }
          return;
        }

        const courseId = await api.navigation.getPrimaryCourseId();
        if (!cancelled) {
          if (!courseId) {
            setFailed(true);
            return;
          }
          const path =
            target === "students"
              ? `/app/courses/${courseId}/students`
              : target === "random-teams"
                ? `/app/courses/${courseId}/teams/random`
                : `/app/courses/${courseId}/teams`;
          setTo(path);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    resolve();
    return () => {
      cancelled = true;
    };
  }, [target, teamId]);

  if (failed) {
    return <Navigate to="/app/courses" replace />;
  }

  if (!to) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-gray-500">
        이동 중…
      </div>
    );
  }

  return <Navigate to={to} replace />;
}
