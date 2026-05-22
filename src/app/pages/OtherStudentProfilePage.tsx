import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../api/supabase-api";
import type { StudentProfile } from "../types";
import UserAvatar from "../components/UserAvatar";
import PageLoading from "../components/layout/PageLoading";

export default function OtherStudentProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    api.students
      .getById(id)
      .then((data) => setProfile(data ?? null))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <PageLoading message="프로필을 불러오는 중…" testId="other-student-profile-loading" />;
  }

  if (!profile) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-gray-600">{"\uD559\uC0DD \uD504\uB85C\uD544\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <UserAvatar name={profile.name} imageUrl={profile.imageUrl} size="lg" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-600">{profile.studentId}</p>
            <p className="text-gray-600">{profile.major}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{"\uC5F0\uB77D\uCC98"}</h2>
            <p className="text-gray-700">{profile.email}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{"\uC18C\uAC1C"}</h2>
            <p className="text-gray-700">{profile.bio}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{"\uAE30\uC220 \uC2A4\uD0DD"}</h2>
            <div className="flex flex-wrap gap-2">
              {(profile.skills ?? []).map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
