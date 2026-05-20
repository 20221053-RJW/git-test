/** AI 마이페이지 리포트 — Edge Function 요청/응답 (T-030) */

export interface AiReportGenerateRequest {
  /** Supabase ai_users.id (uuid) */
  userId: string;
  /** 집계할 archived / completed 프로젝트 id (선택) */
  projectIds?: string[];
  /** 출력 언어 */
  locale?: "ko" | "en";
}

export interface AiReportSection {
  title: string;
  body: string;
}

export interface AiReportGenerateResponse {
  summary: string;
  problems_solved: string[];
  technologies: string[];
  role_description: string;
  growth_reflection: string;
  sections?: AiReportSection[];
  generated_at: string;
  model?: string;
}

export interface AiReportNotReadyError {
  code: "NOT_IMPLEMENTED";
  message: string;
}

/** DB 집계 맥락 (LLM 입력·A4 템플릿용) */
export interface AiReportTeamSnapshot {
  teamId: string;
  teamName: string;
  projectTitle: string;
  courseName: string;
  memberRole: string;
  progress: number;
  troubleshootingCount: number;
  deliverableCount: number;
  sampleProblems: string[];
}

/** 리포트 3페이지용 트러블슈팅 사례 (DB 로그 기반) */
export interface AiReportTroubleshootingCase {
  logId: string;
  teamId: string;
  teamName: string;
  projectTitle: string;
  courseName: string;
  title: string;
  problem: string;
  action: string;
  result: string;
  impact: string;
  status: string;
}

export interface AiReportContext {
  userId: string;
  userName: string;
  email: string;
  major?: string;
  skills: string[];
  generatedAt: string;
  teams: AiReportTeamSnapshot[];
  troubleshootingCases: AiReportTroubleshootingCase[];
  totalTroubleshootingLogs: number;
  totalDeliverables: number;
}
