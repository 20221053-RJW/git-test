import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../api/mock-data";
import type { Course } from "../types";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "students" | "teams">("overview");

  useEffect(() => {
    if (!id) return;

    api.courses.getById(id).then((data) => {
      setCourse(data || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">{"\uB85C\uB529 \uC911..."}</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">{"\uACFC\uBAA9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}</p>
        <Link to="/app/courses" className="text-blue-600 hover:underline mt-4 inline-block">
          {"\uBAA9\uB85D\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30"}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">{course.name}</h1>
              <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">
                {course.code}
              </span>
            </div>
            <p className="text-gray-600">{course.semester}</p>
          </div>
          <Link to="/app/courses" className="text-blue-600 hover:underline text-sm">
            {"\uBAA9\uB85D\uC73C\uB85C"}
          </Link>
        </div>

        {course.description && (
          <p className="text-gray-700 mb-4">{course.description}</p>
        )}

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">{"\uB2F4\uB2F9 \uAD50\uC218"}</p>
            <p className="font-bold text-gray-900">{course.professor}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">{"\uAC15\uC758 \uC2DC\uAC04"}</p>
            <p className="font-bold text-gray-900">{course.schedule}</p>
          </div>
          {course.room && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{"\uAC15\uC758\uC2E4"}</p>
              <p className="font-bold text-gray-900">{course.room}</p>
            </div>
          )}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">{"\uC218\uAC15 \uC778\uC6D0"}</p>
            <p className="font-bold text-gray-900">
              {course.students}
              {course.maxStudents && `/${course.maxStudents}`}{"\uBA85"}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 font-medium ${
                activeTab === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {"\uAC1C\uC694"}
            </button>
            <button
              onClick={() => setActiveTab("students")}
              className={`px-6 py-3 font-medium ${
                activeTab === "students"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {"\uC218\uAC15\uC0DD"}
            </button>
            <button
              onClick={() => setActiveTab("teams")}
              className={`px-6 py-3 font-medium ${
                activeTab === "teams"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {"\uD300 \uBAA9\uB85D"}
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-xl font-bold mb-4">{"\uAC15\uC758 \uAC1C\uC694"}</h2>
              <p className="text-gray-700">
                {course.description || "\uAC15\uC758 \uAC1C\uC694\uAC00 \uC544\uC9C1 \uB4F1\uB85D\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."}
              </p>
            </div>
          )}

          {activeTab === "students" && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                {"\uC218\uAC15\uC0DD \uBAA9\uB85D"} ({course.students}{"\uBA85"})
              </h2>
              <p className="text-gray-600">{"\uC88C\uCE21 \uB124\uBE44\uAC8C\uC774\uC158\uC758 \uC218\uAC15\uC790\uB4E4 \uBA54\uB274\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."}</p>
            </div>
          )}

          {activeTab === "teams" && (
            <div>
              <h2 className="text-xl font-bold mb-4">{"\uD300 \uBAA9\uB85D"}</h2>
              <p className="text-gray-600">{"\uC88C\uCE21 \uB124\uBE44\uAC8C\uC774\uC158\uC758 \uD300 \uBA54\uB274\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
