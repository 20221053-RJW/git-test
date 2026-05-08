import { useState, useEffect } from "react";
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
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Q&A 게시판</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          + 질문하기
        </button>
      </div>

      {/* 검색 바 */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="질문 검색..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 질문 목록 */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600">
              {searchQuery
                ? "검색 결과가 없습니다."
                : "아직 질문이 없습니다."}
            </p>
          </div>
        ) : (
          filteredQuestions.map((question) => (
            <Link
              key={question.id}
              to={`/app/qna/${question.id}`}
              className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {question.title}
              </h2>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {question.content}
              </p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 text-gray-600">
                  <span>👤 {question.authorName}</span>
                  <span>👁️ {question.views}</span>
                  <span>💬 {question.answers.length}</span>
                  <span>👍 {question.likes}</span>
                </div>

                <div className="flex gap-2">
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
