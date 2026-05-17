import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import type { Question } from "../types";
import { api } from "../api/mock-data";

export default function QnAPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    api.questions.getAll().then((data) => {
      setQuestions(data);
      setLoading(false);
    });
  }, []);

  const filteredQuestions = questions.filter(
    (q) =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-gray-600">{"\uB85C\uB529 \uC911..."}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">Q&A {"\uAC8C\uC2DC\uD310"}</h1>
        <button className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto">
          + {"\uC9C8\uBB38\uD558\uAE30"}
        </button>
      </div>

      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="\uC9C8\uBB38 \uAC80\uC0C9..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <p className="text-gray-600">
              {searchQuery
                ? "\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
                : "\uC544\uC9C1 \uC9C8\uBB38\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."}
            </p>
          </div>
        ) : (
          filteredQuestions.map((question) => (
            <Link
              key={question.id}
              to={`/app/qna/${question.id}`}
              className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg sm:p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {question.title}
              </h2>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {question.content}
              </p>

              <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3 text-gray-600 sm:gap-4">
                  <span>{"\uC791\uC131\uC790"} {question.authorName}</span>
                  <span>{"\uC870\uD68C"} {question.views}</span>
                  <span>{"\uB2F5\uBCC0"} {question.answers.length}</span>
                  <span>{"\uC88B\uC544\uC694"} {question.likes}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                {new Date(question.createdAt).toLocaleString("ko-KR")}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
