import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import type { Course } from "../types";
import { api } from "../api/mock-data";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "students" | "teams">(
    "overview"
  );

  useEffect(() => {
    if (id) {
      api.courses.getById(id).then((data) => {
        setCourse(data || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">로딩 중...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">과목을 찾을 수 없습니다.</p>
        <Link to="/app/courses" className="text-blue-600 hover:underline mt-4">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* 헤더 */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {course.name}
              </h1>
              <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">
                {course.code}
              </span>
            </div>
            <p className="text-gray-600">{course.semester}</p>
          </div>
          <Link
            to="/app/courses"
            className="text-blue-600 hover:underline text-sm"
          >
            ← 목록으로
          </Link>
        </div>

        {course.description && (
          <p className="text-gray-700 mb-4">{course.description}</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">담당 교수</p>
            <p className="font-bold text-gray-900">{course.professor}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">강의 시간</p>
            <p className="font-bold text-gray-900">{course.schedule}</p>
          </div>
          {course.room && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">강의실</p>
              <p className="font-bold text-gray-900">{course.room}</p>
            </div>
          )}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">수강 인원</p>
            <p className="font-bold text-gray-900">
              {course.students}
              {course.maxStudents && `/${course.maxStudents}`}명
            </p>
          </div>
        </div>
      </div>

      {/* 탭 */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 font-medium ${
                activeTab === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              개요
            </button>
            <button
              onClick={() => setActiveTab("students")}
              className={`px-6 py-3 font-medium ${
                activeTab === "students"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              수강생
            </button>
            <button
              onClick={() => setActiveTab("teams")}
              className={`px-6 py-3 font-medium ${
                activeTab === "teams"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              팀 목록
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-xl font-bold mb-4">강의 개요</h2>
              <p className="text-gray-700">
                {course.description ||
                  "강의 개요가 아직 등록되지 않았습니다."}
              </p>
            </div>
          )}

          {activeTab === "students" && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                수강생 목록 ({course.students}명)
              </h2>
              <p className="text-gray-600">수강생 목록이 여기에 표시됩니다.</p>
            </div>
          )}

          {activeTab === "teams" && (
            <div>
              <h2 className="text-xl font-bold mb-4">팀 목록</h2>
              <p className="text-gray-600">팀 목록이 여기에 표시됩니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
