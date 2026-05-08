import { useState, useEffect } from "react";
import { Link } from "react-router";
import type { Project } from "../types";
import { api } from "../api/mock-data";

const statusColors = {
  planning: "bg-gray-100 text-gray-800",
  "in-progress": "bg-blue-100 text-blue-800",
  review: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
};

const statusLabels = {
  planning: "계획 중",
  "in-progress": "진행 중",
  review: "검토 중",
  completed: "완료",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.projects.getAll().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">팀 프로젝트</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          + 새 프로젝트
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 mb-4">
            진행 중인 프로젝트가 없습니다.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            프로젝트 시작하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/app/projects/${project.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-gray-900">
                  {project.title}
                </h2>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    statusColors[project.status]
                  }`}
                >
                  {statusLabels[project.status]}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="space-y-2 text-sm">
                {project.deadline && (
                  <p className="text-gray-600">
                    📅 마감일:{" "}
                    {new Date(project.deadline).toLocaleDateString("ko-KR")}
                  </p>
                )}
                <p className="text-gray-500 text-xs">
                  최종 업데이트:{" "}
                  {new Date(project.updatedAt).toLocaleDateString("ko-KR")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
