import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../api/mock-data";
import { useAuth } from "../contexts/AuthContext";
import type { Course } from "../types";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    api.courses.getAll().then((data) => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-gray-600">{"\uB85C\uB529 \uC911..."}</p>
      </div>
    );
  }

  if (!isAuthenticated) return <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{"\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4"}</div>;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">{"\uC218\uAC15 \uC911\uC778 \uACFC\uBAA9"}</h1>
        <p className="text-gray-600">{"\uCD1D"} {courses.length}{"\uAC1C \uACFC\uBAA9"}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/app/courses/${course.id}`}
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-6"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h2 className="text-lg font-black text-gray-900 sm:text-xl">
                {course.name}
              </h2>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {course.code}
              </span>
            </div>

            {course.description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {course.description}
              </p>
            )}

            <div className="space-y-1 text-sm">
              <p className="text-gray-600">{"\uAD50\uC218"}: {course.professor}</p>
              <p className="text-gray-600">{"\uC2DC\uAC04"}: {course.schedule}</p>
              {course.room && (
                <p className="text-gray-600">{"\uAC15\uC758\uC2E4"}: {course.room}</p>
              )}
              <p className="text-gray-600">
                {"\uC218\uAC15\uC0DD"}: {course.students}
                {course.maxStudents && `/${course.maxStudents}`}{"\uBA85"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
