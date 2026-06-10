import React from "react";
import { Link, useNavigate } from "react-router";
import { Calendar, Clock, Copy, GitBranch, GraduationCap, MapPin, User, Users } from "lucide-react";
import { formatCoursePeriod } from "../../utils/courseDates";
import type { Course } from "../../types";

type CourseListCardProps = {
  course: Course;
  canManageCourses: boolean;
  canArchiveCourse: boolean;
  canManageThisCourse: boolean;
  isMyInstructorCourse?: boolean;
  isOtherInstructorCourse?: boolean;
  viewerIsProfessor?: boolean;
  submitting: boolean;
  onCopyCode: (code: string) => void;
  onArchive: (course: Course) => void;
  onDelete: (course: Course) => void;
};

export default function CourseListCard({
  course,
  canManageCourses,
  canArchiveCourse,
  canManageThisCourse,
  isMyInstructorCourse = false,
  isOtherInstructorCourse = false,
  viewerIsProfessor = false,
  submitting,
  onCopyCode,
  onArchive,
  onDelete,
}: CourseListCardProps) {
  const navigate = useNavigate();
  const periodLabel = formatCoursePeriod(course.startDate, course.endDate);
  const stageCount = course.stageCount ?? course.stages?.length ?? 0;
  const studentLabel = course.maxStudents
    ? `${course.students}/${course.maxStudents}명`
    : `${course.students}명`;
  const hasAssignedProfessor = Boolean(course.professorId?.trim());
  const cardClassName = [
    "cc-course-card m3-surface-card--elevated m3-surface-card--interactive group",
    hasAssignedProfessor ? "cc-course-card--with-professor" : "cc-course-card--no-professor",
    isMyInstructorCourse ? "cc-course-card--my-instructor" : "",
    isOtherInstructorCourse ? "cc-course-card--other-instructor" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleEnterCourse = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!viewerIsProfessor || !isOtherInstructorCourse) return;
    event.preventDefault();
    const professorLabel = course.professor?.trim() || "다른 교수";
    alert(
      `${professorLabel} 님이 담당 중인 수업입니다. 조회 목적으로만 입장할 수 있으며 수업 관리 권한은 없습니다.`
    );
    navigate(`/app/courses/${course.id}`);
  };

  return (
    <Link
      to={`/app/courses/${course.id}`}
      className={cardClassName}
      data-testid={`course-card-${course.id}`}
      data-course-has-professor={hasAssignedProfessor ? "true" : "false"}
      data-course-my-instructor={isMyInstructorCourse ? "true" : "false"}
      data-course-other-instructor={isOtherInstructorCourse ? "true" : "false"}
      onClick={handleEnterCourse}
    >
      <div className="cc-course-card__accent" aria-hidden />

      <div className="cc-course-card__body">
        <div className="cc-course-card__head">
          <div className="cc-course-card__head-row">
            <span className="cc-course-card__semester">{course.semester}</span>
            <div className="cc-course-card__badges">
              {hasAssignedProfessor ? (
                <span
                  className={`cc-course-card__professor-badge ${
                    isMyInstructorCourse
                      ? "cc-course-card__professor-badge--mine"
                      : isOtherInstructorCourse
                        ? "cc-course-card__professor-badge--other"
                        : ""
                  }`}
                  data-testid={`course-card-professor-badge-${course.id}`}
                >
                  <GraduationCap className="h-3 w-3 shrink-0" aria-hidden />
                  {isMyInstructorCourse
                    ? "내 담당 수업"
                    : isOtherInstructorCourse
                      ? "다른 교수 담당"
                      : "담당 교수 배정"}
                </span>
              ) : (
                <span
                  className="cc-course-card__professor-badge cc-course-card__professor-badge--empty"
                  data-testid={`course-card-professor-badge-${course.id}`}
                >
                  교수 미배정
                </span>
              )}
              {course.status === "archived" ? (
                <span className="cc-badge-archived rounded-full px-2.5 py-0.5 text-[11px] font-bold">
                  종료
                </span>
              ) : (
                <span className="cc-badge-success rounded-full px-2.5 py-0.5 text-[11px] font-bold">
                  진행 중
                </span>
              )}
            </div>
          </div>

          <div className="cc-course-card__title-row">
            <h2 className="cc-course-card__title">{course.name}</h2>
            <button
              type="button"
              className="cc-course-card__code cc-course-code"
              title="수업 코드 복사"
              aria-label={`수업 코드 ${course.code} 복사`}
              data-testid={`course-card-copy-code-${course.id}`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onCopyCode(course.code);
              }}
            >
              <Copy className="cc-course-card__code-icon" strokeWidth={1.5} aria-hidden />
              <span>{course.code}</span>
            </button>
          </div>
        </div>

        {course.description ? (
          <p className="cc-course-card__desc">{course.description}</p>
        ) : null}

        <dl className="cc-course-card__meta">
          <div className="cc-course-card__meta-item">
            <dt className="cc-course-card__meta-label">
              <User className="h-3.5 w-3.5 shrink-0" aria-hidden />
              교수
            </dt>
            <dd
              className={`cc-course-card__meta-value ${
                hasAssignedProfessor ? "cc-course-card__meta-value--professor" : ""
              }`}
            >
              {hasAssignedProfessor ? course.professor : "미배정"}
            </dd>
          </div>
          {periodLabel ? (
            <div className="cc-course-card__meta-item">
              <dt className="cc-course-card__meta-label">
                <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                수업 기간
              </dt>
              <dd className="cc-course-card__meta-value">{periodLabel}</dd>
            </div>
          ) : null}
          <div className="cc-course-card__meta-item">
            <dt className="cc-course-card__meta-label">
              <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
              강의 시간
            </dt>
            <dd className="cc-course-card__meta-value">{course.schedule}</dd>
          </div>
          {course.room ? (
            <div className="cc-course-card__meta-item">
              <dt className="cc-course-card__meta-label">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                강의실
              </dt>
              <dd className="cc-course-card__meta-value">{course.room}</dd>
            </div>
          ) : null}
          <div className="cc-course-card__meta-item">
            <dt className="cc-course-card__meta-label">
              <Users className="h-3.5 w-3.5 shrink-0" aria-hidden />
              수강생
            </dt>
            <dd className="cc-course-card__meta-value">{studentLabel}</dd>
          </div>
          <div className="cc-course-card__meta-item">
            <dt className="cc-course-card__meta-label">
              <GitBranch className="h-3.5 w-3.5 shrink-0" aria-hidden />
              팀플 단계
            </dt>
            <dd className="cc-course-card__meta-value">{stageCount}개</dd>
          </div>
        </dl>

        {(canArchiveCourse || canManageThisCourse) && (
          <div className="cc-course-card__actions">
            {canArchiveCourse && (
              <button
                type="button"
                disabled={submitting}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onArchive(course);
                }}
                className="cc-course-card__action cc-course-card__action--danger"
              >
                수업 종료
              </button>
            )}
            {canManageThisCourse && (
              <button
                type="button"
                data-testid={`course-delete-${course.id}`}
                disabled={submitting}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onDelete(course);
                }}
                className="cc-course-card__action cc-course-card__action--neutral"
              >
                수업 삭제
              </button>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
