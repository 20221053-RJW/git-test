import React, { useState, useEffect } from "react";
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
  planning: "\uACC4\uD68D \uC911",
  "in-progress": "\uC9C4\uD589 \uC911",
  review: "\uAC80\uD1A0 \uC911",
  completed: "\uC644\uB8CC",
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
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-gray-600">{"\uB85C\uB529 \uC911..."}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">{"\uD300 \uD504\uB85C\uC81D\uD2B8"}</h1>
        <button className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto">
          + {"\uC0C8 \uD504\uB85C\uC81D\uD2B8"}
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <p className="text-gray-600 mb-4">
            {"\uC9C4\uD589 \uC911\uC778 \uD504\uB85C\uC81D\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."}
          </p>
          <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700">
            {"\uD504\uB85C\uC81D\uD2B8 \uC2DC\uC791\uD558\uAE30"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/app/projects/${project.id}`}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg sm:p-6"
            >
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
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
                    {"\uB9C8\uAC10\uC77C"}:{" "}
                    {new Date(project.deadline).toLocaleDateString("ko-KR")}
                  </p>
                )}
                <p className="text-gray-500 text-xs">
                  {"\uCD5C\uC885 \uC5C5\uB370\uC774\uD2B8"}:{" "}
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
