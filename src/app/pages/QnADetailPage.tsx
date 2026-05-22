import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Answer, Question } from "../types";
import { api } from "../api/supabase-api";
import { useAuth } from "../contexts/AuthContext";
import PageLoading from "../components/layout/PageLoading";

export default function QnADetailPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const { user } = useAuth();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answerContent, setAnswerContent] = useState("");
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [editAnswerContent, setEditAnswerContent] = useState("");

  const loadQuestion = useCallback(() => {
    if (!questionId) return Promise.resolve();
    return api.questions.getById(questionId).then(setQuestion);
  }, [questionId]);

  useEffect(() => {
    if (!questionId) {
      setLoading(false);
      return;
    }

    loadQuestion()
      .catch((error) => {
        console.error(error);
        alert(error instanceof Error ? error.message : "질문을 불러오지 못했습니다.");
      })
      .finally(() => setLoading(false));
  }, [questionId, loadQuestion]);

  const handleCreateAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionId) return;

    setSubmitting(true);
    try {
      const updated = await api.questions.createAnswer(questionId, { content: answerContent });
      setQuestion(updated);
      setAnswerContent("");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "답변 등록에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const startEditAnswer = (answer: Answer) => {
    setEditingAnswerId(answer.id);
    setEditAnswerContent(answer.content);
  };

  const handleUpdateAnswer = async (e: React.FormEvent, answerId: string) => {
    e.preventDefault();
    if (!questionId) return;

    setSubmitting(true);
    try {
      const updated = await api.questions.updateAnswer(questionId, answerId, {
        content: editAnswerContent,
      });
      setQuestion(updated);
      setEditingAnswerId(null);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "답변 수정에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAnswer = async (answerId: string) => {
    if (!questionId || !window.confirm("이 답변을 삭제할까요?")) return;

    setSubmitting(true);
    try {
      const updated = await api.questions.deleteAnswer(questionId, answerId);
      setQuestion(updated);
      if (editingAnswerId === answerId) setEditingAnswerId(null);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "답변 삭제에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAcceptAnswer = async (answerId: string) => {
    if (!questionId) return;

    setSubmitting(true);
    try {
      const updated = await api.questions.acceptAnswer(questionId, answerId);
      setQuestion(updated);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "채택에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const pageClass = "mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8";

  if (loading) {
    return <PageLoading message="질문을 불러오는 중…" testId="qna-detail-loading" />;
  }

  if (!question || !questionId) {
    return (
      <div className={pageClass}>
        <p className="text-gray-600">질문을 찾을 수 없습니다.</p>
        <Link to="/app/qna" className="mt-4 inline-block text-blue-600 hover:underline">
          목록으로
        </Link>
      </div>
    );
  }

  const isQuestionOwner = user?.id === question.authorId;

  return (
    <div className={pageClass}>
      <Link to="/app/qna" className="mb-4 inline-block text-sm text-blue-600 hover:underline">
        ← Q&A 목록
      </Link>

      <article className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <h1 className="mb-3 text-2xl font-black text-gray-900">{question.title}</h1>
        <p className="mb-4 whitespace-pre-wrap text-gray-700">{question.content}</p>
        <QuestionMeta question={question} />
      </article>

      <section className="mb-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">답변 {question.answers.length}개</h2>

        {question.answers.length === 0 ? (
          <p className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">
            아직 답변이 없습니다. 첫 답변을 남겨보세요.
          </p>
        ) : (
          <div className="space-y-4">
            {question.answers.map((answer) => {
              const isAnswerOwner = user?.id === answer.authorId;
              const canDelete = isAnswerOwner || isQuestionOwner;
              const isEditing = editingAnswerId === answer.id;

              return (
                <article
                  key={answer.id}
                  className={`rounded-2xl border bg-white p-5 shadow-sm sm:p-6 ${
                    answer.isAccepted ? "border-green-300 ring-1 ring-green-200" : "border-gray-200"
                  }`}
                >
                  {isEditing ? (
                    <form onSubmit={(e) => handleUpdateAnswer(e, answer.id)} className="space-y-3">
                      <textarea
                        value={editAnswerContent}
                        onChange={(e) => setEditAnswerContent(e.target.value)}
                        rows={4}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        required
                      />
                      <FormActions
                        onCancel={() => setEditingAnswerId(null)}
                        submitLabel="저장"
                        submitting={submitting}
                      />
                    </form>
                  ) : (
                    <>
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div>
                          <span className="font-semibold text-gray-900">{answer.authorName}</span>
                          {answer.isAccepted && (
                            <span className="ml-2 rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                              채택됨
                            </span>
                          )}
                        </div>
                        <div className="flex shrink-0 gap-2">
                          {isQuestionOwner && !answer.isAccepted && (
                            <button
                              type="button"
                              onClick={() => handleAcceptAnswer(answer.id)}
                              disabled={submitting}
                              className="text-sm text-green-700 hover:underline disabled:opacity-60"
                            >
                              채택
                            </button>
                          )}
                          {isAnswerOwner && (
                            <button
                              type="button"
                              onClick={() => startEditAnswer(answer)}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              수정
                            </button>
                          )}
                          {canDelete && (
                            <button
                              type="button"
                              onClick={() => handleDeleteAnswer(answer.id)}
                              className="text-sm text-red-600 hover:underline"
                            >
                              삭제
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="whitespace-pre-wrap text-sm text-gray-700">{answer.content}</p>
                      <p className="mt-2 text-xs text-gray-500">
                        {new Date(answer.createdAt).toLocaleString("ko-KR")}
                      </p>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      <form
        onSubmit={handleCreateAnswer}
        className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 className="text-lg font-bold text-gray-900">답변 작성</h2>
        <textarea
          value={answerContent}
          onChange={(e) => setAnswerContent(e.target.value)}
          rows={4}
          placeholder="답변 내용을 입력하세요"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "등록 중..." : "답변 등록"}
        </button>
      </form>
    </div>
  );
}

function QuestionMeta({ question }: { question: Question }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
      <span>작성자 {question.authorName}</span>
      <span>조회 {question.views}</span>
      <span>좋아요 {question.likes}</span>
      <div className="flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <span key={tag} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function FormActions({
  onCancel,
  submitLabel,
  submitting,
}: {
  onCancel: () => void;
  submitLabel: string;
  submitting: boolean;
}) {
  return (
    <div className="flex gap-2">
      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {submitting ? "처리 중..." : submitLabel}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700"
      >
        취소
      </button>
    </div>
  );
}
