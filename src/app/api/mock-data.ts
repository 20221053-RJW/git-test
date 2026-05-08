import type {
  Course,
  StudentProfile,
  ProfessorProfile,
  Team,
  Project,
  Question,
} from "../types";

/**
 * Mock 데이터 저장소
 * 실제 API가 구현될 때까지 사용
 */

export const mockStudents: StudentProfile[] = [
  {
    id: "1",
    name: "류지원",
    email: "ryu@example.com",
    role: "student",
    studentId: "2021001",
    major: "컴퓨터공학과",
    skills: ["React", "TypeScript", "Node.js"],
    bio: "웹 개발에 관심이 많은 학생입니다.",
  },
  {
    id: "2",
    name: "김철수",
    email: "kim@example.com",
    role: "student",
    studentId: "2021002",
    major: "컴퓨터공학과",
    skills: ["Java", "Python", "SQL"],
    bio: "백엔드 개발에 관심이 많습니다.",
  },
  {
    id: "3",
    name: "이영희",
    email: "lee@example.com",
    role: "student",
    studentId: "2021003",
    major: "소프트웨어학과",
    skills: ["UI/UX", "Figma", "CSS"],
    bio: "디자인과 프론트엔드를 공부하고 있습니다.",
  },
];

export const mockProfessors: ProfessorProfile[] = [
  {
    id: "prof1",
    name: "김교수",
    email: "prof.kim@example.com",
    role: "professor",
    department: "컴퓨터공학부",
    office: "공학관 301호",
    researchAreas: ["웹 기술", "소프트웨어 공학", "인공지능"],
    officeHours: "화, 목 15:00-17:00",
  },
  {
    id: "prof2",
    name: "이교수",
    email: "prof.lee@example.com",
    role: "professor",
    department: "컴퓨터공학부",
    office: "공학관 305호",
    researchAreas: ["데이터베이스", "빅데이터", "클라우드"],
    officeHours: "월, 수 14:00-16:00",
  },
];

export const mockCourses: Course[] = [
  {
    id: "course1",
    name: "웹 개발 기초",
    code: "CS201",
    professor: "김교수",
    professorId: "prof1",
    schedule: "월, 수 10:00-12:00",
    room: "공학관 101호",
    students: 45,
    maxStudents: 50,
    semester: "2026-1",
    description: "HTML, CSS, JavaScript를 활용한 웹 개발 기초",
  },
  {
    id: "course2",
    name: "데이터베이스 설계",
    code: "CS301",
    professor: "이교수",
    professorId: "prof2",
    schedule: "화, 목 14:00-16:00",
    room: "공학관 203호",
    students: 38,
    maxStudents: 40,
    semester: "2026-1",
    description: "관계형 데이터베이스 설계 및 SQL",
  },
  {
    id: "course3",
    name: "소프트웨어 공학",
    code: "CS202",
    professor: "김교수",
    professorId: "prof1",
    schedule: "금 13:00-16:00",
    room: "공학관 102호",
    students: 42,
    maxStudents: 50,
    semester: "2026-1",
    description: "소프트웨어 개발 방법론과 프로젝트 관리",
  },
];

export const mockTeams: Team[] = [
  {
    id: "team1",
    name: "팀 알파",
    courseId: "course1",
    members: [
      { id: "1", name: "류지원", studentId: "2021001", role: "leader" },
      { id: "2", name: "김철수", studentId: "2021002", role: "member" },
      { id: "3", name: "이영희", studentId: "2021003", role: "member" },
    ],
    createdAt: new Date("2026-03-01"),
    updatedAt: new Date("2026-03-01"),
  },
];

export const mockProjects: Project[] = [
  {
    id: "proj1",
    title: "캠퍼스 커뮤니티 플랫폼",
    description: "학생들을 위한 온라인 커뮤니티 플랫폼 개발",
    courseId: "course1",
    teamId: "team1",
    status: "in-progress",
    deadline: new Date("2026-06-15"),
    createdAt: new Date("2026-03-01"),
    updatedAt: new Date("2026-05-06"),
  },
];

export const mockQuestions: Question[] = [
  {
    id: "q1",
    title: "React에서 state 업데이트가 비동기로 동작하나요?",
    content: "setState를 호출한 직후에 state 값을 출력하면 이전 값이 나옵니다. 왜 그런가요?",
    authorId: "2",
    authorName: "김철수",
    courseId: "course1",
    tags: ["React", "State", "JavaScript"],
    answers: [],
    views: 45,
    likes: 3,
    createdAt: new Date("2026-05-05"),
    updatedAt: new Date("2026-05-05"),
  },
];

// API 함수들 (향후 실제 API로 교체)
export const api = {
  courses: {
    getAll: () => Promise.resolve(mockCourses),
    getById: (id: string) => Promise.resolve(mockCourses.find(c => c.id === id)),
  },
  students: {
    getAll: () => Promise.resolve(mockStudents),
    getById: (id: string) => Promise.resolve(mockStudents.find(s => s.id === id)),
  },
  professors: {
    getAll: () => Promise.resolve(mockProfessors),
    getById: (id: string) => Promise.resolve(mockProfessors.find(p => p.id === id)),
  },
  teams: {
    getAll: () => Promise.resolve(mockTeams),
    getById: (id: string) => Promise.resolve(mockTeams.find(t => t.id === id)),
    getByCourse: (courseId: string) =>
      Promise.resolve(mockTeams.filter(t => t.courseId === courseId)),
  },
  projects: {
    getAll: () => Promise.resolve(mockProjects),
    getById: (id: string) => Promise.resolve(mockProjects.find(p => p.id === id)),
    getByTeam: (teamId: string) =>
      Promise.resolve(mockProjects.filter(p => p.teamId === teamId)),
  },
  questions: {
    getAll: () => Promise.resolve(mockQuestions),
    getById: (id: string) => Promise.resolve(mockQuestions.find(q => q.id === id)),
    getByCourse: (courseId: string) =>
      Promise.resolve(mockQuestions.filter(q => q.courseId === courseId)),
  },
};
