import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../api/mock-data";
import type { StudentProfile } from "../types";

export default function OtherStudentProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    api.students.getById(id).then((data) => {
      setProfile(data || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-gray-600">{"\uB85C\uB529 \uC911..."}</p>
      </div>
    );
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
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white sm:h-24 sm:w-24 sm:text-3xl">
            {profile.name.charAt(0)}
          </div>
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
