import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../api/supabase-api";
import PageLoading from "../components/layout/PageLoading";
import type { Announcement, Course } from "../types";

export default function CourseAnnouncementDetailPage() {
  const { courseId, announcementId } = useParams<{
    courseId: string;
    announcementId: string;
  }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!courseId || !announcementId) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    void (async () => {
      try {
        const [courseData, list] = await Promise.all([
          api.courses.getById(courseId),
          api.announcements.getAll(courseId),
        ]);
        if (cancelled) return;
        setCourse(courseData ?? null);
        const found = list.find((row) => row.id === announcementId) ?? null;
        setAnnouncement(found);
        setNotFound(!found);
      } catch {
        if (!cancelled) {
          setAnnouncement(null);
          setNotFound(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [courseId, announcementId]);

  const listPath = courseId ? `/app/courses/${courseId}/announcements` : "/app/courses";

  if (!courseId) {
    return <p className="p-6 text-gray-600">수업을 선택해 주세요.</p>;
  }

  return (
    <div className="w-full min-w-0 space-y-6" data-testid="course-announcement-detail-page">
      <div>
        <Link
          to={listPath}
          className="text-sm font-bold text-[#155dfc] hover:underline"
          data-testid="announcement-detail-back"
        >
          ← 공지 목록
        </Link>
        {course && (
          <p className="mt-2 text-sm text-gray-600">
            [{course.semester}] {course.name}
          </p>
        )}
      </div>

      {loading ? (
        <PageLoading layout="inline" message="공지를 불러오는 중…" />
      ) : notFound || !announcement ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-gray-600">공지를 찾을 수 없습니다.</p>
          <Link
            to={listPath}
            className="mt-4 inline-block text-sm font-bold text-[#155dfc] hover:underline"
          >
            목록으로 돌아가기
          </Link>
        </div>
      ) : (
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-2xl font-black text-gray-900">{announcement.title}</h1>
            <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-600">
              D-{announcement.dDay}
            </span>
          </div>
          <p
            className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700"
            data-testid="announcement-detail-body"
          >
            {announcement.description?.trim() || "내용이 없습니다."}
          </p>
        </article>
      )}
    </div>
  );
}
