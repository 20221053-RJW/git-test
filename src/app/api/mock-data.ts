import type {
  Course,
  StudentProfile,
  ProfessorProfile,
  TeamCard,
  Announcement,
  NetworkStudent,
  StudentExtra,
  TeamKeyword,
  StudentNetworkEditForm,
  MyPageProject,
  MyPageProfile,
  MyPageReportStat,
  AuthPageSummary,
  ChatMessage,
  PeerReviewStudent,
  PeerReviewTeammate,
  TroubleshootingLog,
  Project,
  Question,
} from "../types";
import { auth } from "../firebase";
import { supabase } from "../supabase";

// 이 파일은 화면들이 사용하는 API facade입니다.
// 화면 데이터는 코드에 직접 두지 않고 Supabase의 ai_* 테이블에서 읽어 기존 화면 타입으로 변환합니다.

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function asDate(value: string | null | undefined): Date {
  return value ? new Date(value) : new Date();
}

type AiUser = {
  id: string;
  firebase_uid: string;
  email: string;
  name: string;
  role: "student" | "professor" | "admin";
  student_number?: string | null;
  major?: string | null;
  year?: string | null;
  skills?: unknown;
  bio?: string | null;
  tags?: unknown;
  avatar?: string | null;
  image?: string | null;
  department?: string | null;
  office?: string | null;
  office_hours?: string | null;
  research_areas?: unknown;
};

function toStudentProfile(user: AiUser): StudentProfile {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: "student",
    studentId: user.student_number ?? "",
    major: user.major ?? "",
    skills: asArray<string>(user.skills),
    bio: user.bio ?? undefined,
  };
}

function toProfessorProfile(user: AiUser): ProfessorProfile {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: "professor",
    department: user.department ?? "",
    office: user.office ?? "",
    officeHours: user.office_hours ?? "",
    researchAreas: asArray<string>(user.research_areas),
  };
}

async function getCurrentAiUser(): Promise<AiUser | null> {
  const firebaseUid = auth.currentUser?.uid;
  if (!firebaseUid) return null;

  const { data, error } = await supabase
    .from("ai_users")
    .select("*")
    .eq("firebase_uid", firebaseUid)
    .maybeSingle();

  if (error) throw error;
  return data as AiUser | null;
}

async function getAccessibleCourseIds(): Promise<string[]> {
  const currentUser = await getCurrentAiUser();
  if (!currentUser) return [];

  const [teachingResult, membershipResult] = await Promise.all([
    supabase
      .from("ai_courses")
      .select("id")
      .eq("instructor_user_id", currentUser.id),
    supabase
      .from("ai_course_memberships")
      .select("course_id")
      .eq("user_id", currentUser.id),
  ]);

  if (teachingResult.error) throw teachingResult.error;
  if (membershipResult.error) throw membershipResult.error;

  return Array.from(
    new Set([
      ...(teachingResult.data ?? []).map((course) => course.id),
      ...(membershipResult.data ?? []).map((membership) => membership.course_id),
    ])
  );
}

async function getPrimaryCourseId(): Promise<string | null> {
  const courseIds = await getAccessibleCourseIds();
  return courseIds[0] ?? null;
}

async function getSelectedCourseId(courseId?: string): Promise<string | null> {
  return courseId ?? getPrimaryCourseId();
}

async function getUsersByIds(userIds: string[]): Promise<AiUser[]> {
  if (userIds.length === 0) return [];

  const { data, error } = await supabase
    .from("ai_users")
    .select("*")
    .in("id", userIds);

  if (error) throw error;
  return (data ?? []) as AiUser[];
}

async function getCourseUsers(courseId: string, role?: "student" | "professor" | "assistant"): Promise<AiUser[]> {
  let membershipQuery = supabase
    .from("ai_course_memberships")
    .select("user_id, role")
    .eq("course_id", courseId);

  if (role) membershipQuery = membershipQuery.eq("role", role);

  const { data: memberships, error } = await membershipQuery;
  if (error) throw error;

  const users = await getUsersByIds((memberships ?? []).map((membership) => membership.user_id));
  const order = new Map((memberships ?? []).map((membership, index) => [membership.user_id, index]));

  return users.sort((a, b) => {
    const numberCompare = (a.student_number ?? "").localeCompare(b.student_number ?? "");
    if (numberCompare !== 0) return numberCompare;
    return (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0);
  });
}

async function getStudentsFromDb(courseId?: string): Promise<StudentProfile[]> {
  const selectedCourseId = await getSelectedCourseId(courseId);
  if (!selectedCourseId) return [];

  const users = await getCourseUsers(selectedCourseId, "student");
  return users.map(toStudentProfile);
}

async function getStudentByIdFromDb(id: string): Promise<StudentProfile | undefined> {
  const students = await getStudentsFromDb();
  return students.find((student) => student.id === id);
}

async function getProfessorsFromDb(): Promise<ProfessorProfile[]> {
  const { data, error } = await supabase
    .from("ai_users")
    .select("*")
    .eq("role", "professor")
    .order("name", { ascending: true });

  if (error) throw error;

  return ((data ?? []) as AiUser[]).map(toProfessorProfile);
}

async function getProfessorByIdFromDb(id: string): Promise<ProfessorProfile | undefined> {
  const professors = await getProfessorsFromDb();
  return professors.find((professor) => professor.id === id);
}

async function getCoursesFromDb(): Promise<Course[]> {
  const accessibleCourseIds = await getAccessibleCourseIds();
  let query = supabase
    .from("ai_courses")
    .select("id, name, code, instructor_user_id, schedule, room, students_count, max_students, semester, description")
    .order("id", { ascending: true });

  if (accessibleCourseIds.length > 0) {
    query = query.in("id", accessibleCourseIds);
  }

  const [coursesResult, professors, membershipsResult] = await Promise.all([
    query,
    getProfessorsFromDb(),
    supabase.from("ai_course_memberships").select("course_id, role").eq("role", "student"),
  ]);

  if (coursesResult.error) throw coursesResult.error;
  if (membershipsResult.error) throw membershipsResult.error;

  const studentCounts = (membershipsResult.data ?? []).reduce<Record<string, number>>((result, membership) => {
    result[membership.course_id] = (result[membership.course_id] ?? 0) + 1;
    return result;
  }, {});

  return (coursesResult.data ?? []).map((course) => {
    const professor = professors.find((item) => item.id === course.instructor_user_id);

    return {
      id: course.id,
      name: course.name,
      code: course.code,
      professor: professor?.name ?? "",
      professorId: course.instructor_user_id ?? "",
      schedule: course.schedule,
      room: course.room ?? undefined,
      students: studentCounts[course.id] ?? course.students_count,
      maxStudents: course.max_students ?? undefined,
      semester: course.semester,
      description: course.description ?? undefined,
    };
  });
}

async function getCourseByIdFromDb(id: string): Promise<Course | undefined> {
  const courses = await getCoursesFromDb();
  return courses.find((course) => course.id === id);
}

async function getTeamCardsFromDb(courseId?: string): Promise<TeamCard[]> {
  const selectedCourseId = await getSelectedCourseId(courseId);
  if (!selectedCourseId) return [];

  const [teamsResult, membersResult, activitiesResult] = await Promise.all([
    supabase
      .from("ai_teams")
      .select("id, name, badge, project_title, progress, completed_stages, sort_order")
      .eq("course_id", selectedCourseId)
      .not("project_title", "is", null)
      .order("sort_order", { ascending: true }),
    supabase
      .from("ai_team_members")
      .select("id, team_id, user_id, initial, color, role, sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("ai_team_activities")
      .select("id, team_id, tag, title, description, display_time, sort_order")
      .order("sort_order", { ascending: true }),
  ]);

  if (teamsResult.error) throw teamsResult.error;
  if (membersResult.error) throw membersResult.error;
  if (activitiesResult.error) throw activitiesResult.error;

  const teams = teamsResult.data ?? [];
  const members = membersResult.data ?? [];
  const activities = activitiesResult.data ?? [];
  const memberUsers = await getUsersByIds(
    Array.from(new Set(members.map((member) => member.user_id).filter(Boolean)))
  );

  return teams.map((team) => ({
    id: team.id,
    name: team.name,
    badge: team.badge ?? "",
    projectTitle: team.project_title ?? "",
    progress: team.progress,
    completedStages: team.completed_stages,
    members: members
      .filter((member) => member.team_id === team.id)
      .map((member) => {
        const user = memberUsers.find((item) => item.id === member.user_id);

        return {
          id: user?.id ?? member.id,
          name: user?.name,
          studentId: user?.student_number ?? undefined,
          initial: member.initial ?? user?.avatar ?? user?.name.slice(0, 1) ?? "",
          color: member.color ?? "",
          role: member.role ?? undefined,
        };
      }),
    activities: activities
      .filter((activity) => activity.team_id === team.id)
      .map((activity) => ({
        tag: activity.tag,
        title: activity.title,
        description: activity.description,
        time: activity.display_time,
      })),
  }));
}

async function getTeamStagesFromDb(): Promise<string[]> {
  const { data, error } = await supabase
    .from("ai_team_stages")
    .select("name, position")
    .order("position", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((stage) => stage.name);
}

async function getAnnouncementsFromDb(courseId?: string): Promise<Announcement[]> {
  const selectedCourseId = await getSelectedCourseId(courseId);
  if (!selectedCourseId) return [];

  const { data, error } = await supabase
    .from("ai_announcements")
    .select("id, title, description, d_day, sort_order, course_id")
    .eq("course_id", selectedCourseId)
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((announcement) => ({
    title: announcement.title,
    description: announcement.description,
    dDay: announcement.d_day,
  }));
}

async function getNetworkStudentsFromDb(courseId?: string): Promise<NetworkStudent[]> {
  const [currentUser, selectedCourseId] = await Promise.all([getCurrentAiUser(), getSelectedCourseId(courseId)]);
  if (!selectedCourseId) return [];

  const students = await getCourseUsers(selectedCourseId, "student");

  return students.map((student) => ({
    id: student.id,
    name: student.name,
    isSelf: currentUser ? student.id === currentUser.id : false,
    year: student.year ?? undefined,
    major: student.major ?? "",
    bio: student.bio ?? "",
    tags: asArray<string>(student.tags),
    avatar: student.avatar ?? undefined,
    image: student.image ?? undefined,
  }));
}

async function getStudentExtrasFromDb(): Promise<Record<string, StudentExtra>> {
  const { data, error } = await supabase
    .from("ai_user_learning_profiles")
    .select("user_id, temperature, team_project_count, portfolio_file, detailed_bio, keywords");

  if (error) throw error;

  return (data ?? []).reduce<Record<string, StudentExtra>>((result, extra) => {
    result[extra.user_id] = {
      temperature: Number(extra.temperature),
      teamProjectCount: extra.team_project_count,
      portfolioFile: extra.portfolio_file,
      detailedBio: extra.detailed_bio,
      keywords: asArray<{ text: string; count: number }>(extra.keywords),
    };

    return result;
  }, {});
}

async function getTeamKeywordsFromDb(): Promise<TeamKeyword[]> {
  const { data, error } = await supabase
    .from("ai_team_keywords")
    .select("id, label, keyword_group, sort_order")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((keyword) => ({
    id: keyword.id,
    label: keyword.label,
    group: keyword.keyword_group,
  }));
}

async function getStudentNetworkEditFormFromDb(): Promise<StudentNetworkEditForm> {
  const { data, error } = await supabase
    .from("ai_student_network_edit_form")
    .select("major, mbti, career_interest, hobbies, bio, portfolio_file_name")
    .eq("id", "default")
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Student network edit form data was not found.");

  return {
    major: data.major,
    mbti: data.mbti,
    careerInterest: data.career_interest,
    hobbies: data.hobbies,
    bio: data.bio,
    portfolioFileName: data.portfolio_file_name,
  };
}

async function getProjectsFromDb(): Promise<Project[]> {
  const accessibleCourseIds = await getAccessibleCourseIds();
  let query = supabase
    .from("ai_projects")
    .select("id, title, description, course_id, team_id, status, deadline, created_at, updated_at")
    .order("created_at", { ascending: true });

  if (accessibleCourseIds.length > 0) query = query.in("course_id", accessibleCourseIds);

  const { data, error } = await query;

  if (error) throw error;

  return (data ?? []).map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    courseId: project.course_id,
    teamId: project.team_id,
    status: project.status,
    deadline: project.deadline ? new Date(project.deadline) : undefined,
    createdAt: asDate(project.created_at),
    updatedAt: asDate(project.updated_at),
  }));
}

async function getMyPageProfileFromDb(): Promise<MyPageProfile> {
  const currentUser = await getCurrentAiUser();

  if (currentUser) {
    return {
      initial: currentUser.name.slice(0, 1),
      name: currentUser.name,
      email: currentUser.email,
      schoolAndMajor: currentUser.role === "professor" ? "컴퓨터공학부 교수" : "컴퓨터공학과 학생",
    };
  }

  const { data, error } = await supabase
    .from("ai_my_page_profile")
    .select("initial, name, email, school_and_major")
    .eq("id", "default")
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("MyPage profile data was not found.");

  return {
    initial: data.initial,
    name: data.name,
    email: data.email,
    schoolAndMajor: data.school_and_major,
  };
}

async function getMyPageReportStatsFromDb(): Promise<MyPageReportStat[]> {
  const { data, error } = await supabase
    .from("ai_my_page_report_stats")
    .select("value, label, color_class_name, sort_order")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((stat) => ({
    value: stat.value,
    label: stat.label,
    colorClassName: stat.color_class_name,
  }));
}

async function getMyPageSideNavItemsFromDb(): Promise<string[]> {
  const { data, error } = await supabase
    .from("ai_my_page_side_nav_items")
    .select("label, sort_order")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((item) => item.label);
}

async function getMyPageReportHeaderFromDb() {
  const { data, error } = await supabase
    .from("ai_my_page_report_header")
    .select("title, description, generated_date_label")
    .eq("id", "default")
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("MyPage report header data was not found.");

  return {
    title: data.title,
    description: data.description,
    generatedDateLabel: data.generated_date_label,
  };
}

async function getMyPageProjectsFromDb(): Promise<MyPageProject[]> {
  const { data, error } = await supabase
    .from("ai_my_page_projects")
    .select("title, subtitle, tags, period, role, completion_rate, contributions, problem_case, tech_stack, insights, peer_reviews, professor_review, sort_order")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((project) => ({
    title: project.title,
    subtitle: project.subtitle,
    tags: asArray<string>(project.tags),
    period: project.period,
    role: project.role,
    completionRate: project.completion_rate,
    contributions: asArray<string>(project.contributions),
    problemCase: project.problem_case,
    techStack: asArray<string>(project.tech_stack),
    insights: project.insights,
    peerReviews: asArray<{ text: string; count: number }>(project.peer_reviews),
    professorReview: project.professor_review,
  }));
}

async function getTeamDetailConfigFromDb(teamId?: string) {
  if (!teamId) throw new Error("Team id is required for team detail config.");

  const { data, error } = await supabase
    .from("ai_team_detail_config")
    .select("feedback_options, good_keywords, bad_keywords")
    .eq("team_id", teamId)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Team detail config data was not found.");

  return data;
}

async function getTeamDetailChatMessagesFromDb(teamId?: string): Promise<ChatMessage[]> {
  if (!teamId) return [];

  const { data, error } = await supabase
    .from("ai_team_detail_chat_messages")
    .select("id, sender, text, display_time, is_mine, is_anon, sort_order, team_id")
    .eq("team_id", teamId)
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((message) => ({
    id: message.id,
    sender: message.sender,
    text: message.text,
    time: message.display_time,
    isMine: message.is_mine,
    isAnon: message.is_anon,
  }));
}

async function getTeamDetailPeerReviewStudentsFromDb(teamId?: string): Promise<PeerReviewStudent[]> {
  if (!teamId) return [];

  const { data, error } = await supabase
    .from("ai_team_detail_peer_review_students")
    .select("id, name, contribution, peer_keywords, peer_comment, roles, sort_order, team_id")
    .eq("team_id", teamId)
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((student) => ({
    id: student.id,
    name: student.name,
    contribution: student.contribution,
    peerKeywords: asArray<string>(student.peer_keywords),
    peerComment: student.peer_comment,
    roles: asArray<string>(student.roles),
  }));
}

async function getTeamDetailReviewKeywordsFromDb(teamId?: string) {
  const config = await getTeamDetailConfigFromDb(teamId);

  return {
    good: asArray<string>(config.good_keywords),
    bad: asArray<string>(config.bad_keywords),
  };
}

async function getTeamDetailFeedbackOptionsFromDb(teamId?: string): Promise<string[]> {
  const config = await getTeamDetailConfigFromDb(teamId);
  return asArray<string>(config.feedback_options);
}

async function getTeamDetailTeammatesFromDb(teamId?: string): Promise<PeerReviewTeammate[]> {
  if (!teamId) return [];

  const { data, error } = await supabase
    .from("ai_team_detail_teammates")
    .select("id, name, contribution, sort_order, team_id")
    .eq("team_id", teamId)
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return data ?? [];
}

async function getTeamDetailTroubleshootingLogsFromDb(teamId?: string): Promise<TroubleshootingLog[]> {
  if (!teamId) return [];

  const { data, error } = await supabase
    .from("ai_team_detail_troubleshooting_logs")
    .select("id, author, status, display_timestamp, problem, plan, solution, sort_order, team_id")
    .eq("team_id", teamId)
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((log) => ({
    id: log.id,
    author: log.author,
    status: log.status,
    timestamp: log.display_timestamp,
    problem: log.problem,
    plan: log.plan ?? undefined,
    solution: log.solution ?? undefined,
  }));
}

async function getQuestionsFromDb(): Promise<Question[]> {
  const accessibleCourseIds = await getAccessibleCourseIds();
  let query = supabase
    .from("ai_questions")
    .select("id, title, content, author_user_id, author_id, author_name, course_id, tags, answers, views, likes, created_at, updated_at")
    .order("created_at", { ascending: true });

  if (accessibleCourseIds.length > 0) query = query.in("course_id", accessibleCourseIds);

  const { data, error } = await query;

  if (error) throw error;

  const questions = data ?? [];
  const authors = await getUsersByIds(
    Array.from(new Set(questions.map((question) => question.author_user_id).filter(Boolean)))
  );

  return questions.map((question) => {
    const author = authors.find((user) => user.id === question.author_user_id);

    return {
    id: question.id,
    title: question.title,
    content: question.content,
    authorId: author?.id ?? question.author_id,
    authorName: author?.name ?? question.author_name,
    courseId: question.course_id,
    tags: asArray<string>(question.tags),
    answers: asArray(question.answers),
    views: question.views,
    likes: question.likes,
    createdAt: asDate(question.created_at),
    updatedAt: asDate(question.updated_at),
    };
  });
}

async function getAuthPageSummaryFromDb(): Promise<AuthPageSummary> {
  const { data, error } = await supabase
    .from("ai_auth_page_summary")
    .select("active_course_student_count, example_email")
    .eq("id", "default")
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Auth page summary data was not found.");

  return {
    activeCourseStudentCount: data.active_course_student_count,
    exampleEmail: data.example_email,
  };
}

// 화면에서 사용하는 API 모음입니다.
// 각 함수는 Supabase의 ai_* 테이블을 읽고, 화면이 기대하는 camelCase 타입으로 변환합니다.
export const api = {
  auth: {
    getPageSummary: getAuthPageSummaryFromDb,
  },
  courses: {
    getAll: getCoursesFromDb,
    getById: getCourseByIdFromDb,
  },
  students: {
    getAll: getStudentsFromDb,
    getById: getStudentByIdFromDb,
  },
  professors: {
    getById: getProfessorByIdFromDb,
  },
  teamCards: {
    getAll: getTeamCardsFromDb,
  },
  teamStages: {
    getAll: getTeamStagesFromDb,
  },
  announcements: {
    getAll: getAnnouncementsFromDb,
  },
  studentNetwork: {
    getStudents: getNetworkStudentsFromDb,
    getExtras: getStudentExtrasFromDb,
    getTeamKeywords: getTeamKeywordsFromDb,
    getEditForm: getStudentNetworkEditFormFromDb,
  },
  myPage: {
    getProjects: getMyPageProjectsFromDb,
    getProfile: getMyPageProfileFromDb,
    getSideNavItems: getMyPageSideNavItemsFromDb,
    getReportStats: getMyPageReportStatsFromDb,
    getReportHeader: getMyPageReportHeaderFromDb,
  },
  teamDetail: {
    getFeedbackOptions: getTeamDetailFeedbackOptionsFromDb,
    getChatMessages: getTeamDetailChatMessagesFromDb,
    getPeerReviewStudents: getTeamDetailPeerReviewStudentsFromDb,
    getReviewKeywords: getTeamDetailReviewKeywordsFromDb,
    getTeammates: getTeamDetailTeammatesFromDb,
    getTroubleshootingLogs: getTeamDetailTroubleshootingLogsFromDb,
  },
  projects: {
    getAll: getProjectsFromDb,
  },
  questions: {
    getAll: getQuestionsFromDb,
  },
};
