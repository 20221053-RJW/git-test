export interface SyllabusExtractedFields {
  courseName: string;
  courseCode?: string;
  semester: string;
  professor: string;
  department?: string;
  schedule?: string;
  grade?: string;
  stages?: string[];
}

export type SyllabusConfirmedFields = SyllabusExtractedFields;

export interface SyllabusDedupPreview {
  dedupKey: string;
  existingCourse?: {
    id: string;
    name: string;
  };
}

export interface CreateOrJoinFromSyllabusResult {
  action: "created" | "joined";
  courseId: string;
  courseName: string;
}
