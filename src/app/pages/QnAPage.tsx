import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import type { Course, Question } from "../types";
import { api } from "../api/supabase-api";
import { useAuth } from "../contexts/AuthContext";

export default function QnAPage() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    content: "",
    courseId: "",
    tags: "",
  });
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const loadQuestions = useCallback(() => {
    return api.questions.getAll().then(setQuestions);
  }, []);

  useEffect(() => {
    Promise.all([loadQuestions(), api.courses.getAll()])
      .then(([, courseList]) => {
        setCourses(courseList);
        if (courseList.length > 0) {
          setCreateForm((prev) => ({
            ...prev,
            courseId: prev.courseId || courseList[0].id,
          }));
        }
      })
      .finally(() => setLoading(false));
  }, [loadQuestions]);

  const filteredQuestions = questions.filter(
    (q) =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const tags = createForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const created = await api.questions.create({
        title: createForm.title,
        content: createForm.content,
        courseId: createForm.courseId || undefined,
        tags,
      });

      setQuestions((prev) => [...prev, created]);
      setCreateForm({
        title: "",
        content: "",
        courseId: courses[0]?.id ?? "",
        tags: "",
      });
      setShowCreate(false);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "질문 등록에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (question: Question) => {
    setEditingId(question.id);
    setEditForm({
      title: question.title,
      content: question.content,
      tags: question.tags.join(", "),
    });
  };

  const handleUpdate = async (e: React.FormEvent, questionId: string) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const tags = editForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const updated = await api.questions.update(questionId, {
        title: editForm.title,
        content: editForm.content,
        tags,
      });

      setQuestions((prev) => prev.map((q) => (q.id === questionId ? updated : q)));
      setEditingId(null);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "수정에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (questionId: string) => {
    if (!window.confirm("이 질문을 삭제할까요?")) return;

    setSubmitting(true);
    try {
      await api.questions.delete(questionId);
      setQuestions((prev) => prev.filter((q) => q.id !== questionId));
      if (editingId === questionId) setEditingId(null);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "삭제에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-gray-600">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">Q&A 게시판</h1>
        <button
          type="button"
          onClick={() => setShowCreate((open) => !open)}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto"
        >
          {showCreate ? "닫기" : "+ 질문하기"}
        </button>
      </div>

      {showCreate && (
        <form
          onSubmit={handleCreate}
          className="mb-6 space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <h2 className="text-lg font-bold text-gray-900">새 질문</h2>

          {courses.length === 0 ? (
            <p className="text-sm text-amber-700">
              등록된 수업이 없어 질문을 올릴 수 없습니다.{" "}
              <Link to="/app/courses" className="font-medium text-blue-600 underline">
                수업 등록
              </Link>
              후 다시 시도하세요.
            </p>
          ) : (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">수업</label>
                <select
                  value={createForm.courseId}
                  onChange={(e) => setCreateForm((prev) => ({ ...prev, courseId: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name} ({course.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">제목</label>
                <input
                  type="text"
                  value={createForm.title}
                  onChange={(e) => setCreateForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">내용</label>
                <textarea
                  value={createForm.content}
                  onChange={(e) => setCreateForm((prev) => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">태그 (쉼표로 구분)</label>
                <input
                  type="text"
                  value={createForm.tags}
                  onChange={(e) => setCreateForm((prev) => ({ ...prev, tags: e.target.value }))}
                  placeholder="React, API"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {submitting ? "등록 중..." : "등록"}
              </button>
            </>
          )}
        </form>
      )}

      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="질문 검색..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <p className="text-gray-600">
              {searchQuery ? "검색 결과가 없습니다." : "아직 질문이 없습니다."}
            </p>
          </div>
        ) : (
          filteredQuestions.map((question) => {
            const isOwner = user?.id === question.authorId;
            const isEditing = editingId === question.id;

            return (
              <article
                key={question.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
              >
                {isEditing ? (
                  <form onSubmit={(e) => handleUpdate(e, question.id)} className="space-y-3">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      required
                    />
                    <textarea
                      value={editForm.content}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, content: e.target.value }))}
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      required
                    />
                    <input
                      type="text"
                      value={editForm.tags}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, tags: e.target.value }))}
                      placeholder="태그"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-60"
                      >
                        저장
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700"
                      >
                        취소
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <Link
                        to={`/app/qna/${question.id}`}
                        className="text-xl font-bold text-gray-900 hover:text-blue-600"
                      >
                        {question.title}
                      </Link>
                      {isOwner && (
                        <div className="flex shrink-0 gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(question)}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            수정
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(question.id)}
                            className="text-sm text-red-600 hover:underline"
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>

                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">{question.content}</p>

                    <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap items-center gap-3 text-gray-600 sm:gap-4">
                        <span>작성자 {question.authorName}</span>
                        <span>조회 {question.views}</span>
                        <span>답변 {question.answers.length}</span>
                        <span>좋아요 {question.likes}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {question.tags.map((tag) => (
                          <span key={tag} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="mt-2 text-xs text-gray-500">
                      {new Date(question.createdAt).toLocaleString("ko-KR")}
                    </p>
                  </>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
