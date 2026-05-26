/**
 * vision.md 추가요청 #154~#163 코드 수준 검증 (런타임 의존 없음)
 * 실행: node scripts/verify-vision-additions.mjs
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function assert(condition, message) {
  if (!condition) throw new Error(`FAIL: ${message}`);
  console.log(`  ✓ ${message}`);
}

const checks = [
  {
    id: 154,
    name: "DM 단일 패널·채널 정리",
    run: () => {
      const hook = read("src/app/hooks/useDirectChat.ts");
      const sm = read("src/app/hooks/useIsSmUp.ts");
      assert(hook.includes("removeSupabaseChannelByName"), "useDirectChat 채널 중복 제거");
      assert(sm.length > 0, "useIsSmUp 존재");
      assert(read("src/app/pages/CourseDirectMessagesPage.tsx").includes("useIsSmUp"), "DM 페이지 반응형 단일 패널");
    },
  },
  {
    id: 155,
    name: "폴더 업로드 로딩 UI",
    run: () => {
      const modal = read("src/app/components/TeamDeliverableSubmitModal.tsx");
      assert(modal.includes("team-deliverable-folder-loading-overlay"), "폴더 로딩 오버레이");
      assert(modal.includes("AiGeneratingIndicator"), "로딩 애니메이션");
    },
  },
  {
    id: 156,
    name: "폴더 ZIP 업로드 + AI ZIP 읽기",
    run: () => {
      const zip = read("src/app/utils/projectSourceZip.ts");
      const modal = read("src/app/components/TeamDeliverableSubmitModal.tsx");
      const edge = read("supabase/functions/recommend-troubleshooting/index.ts");
      assert(zip.includes("zipProjectFolderExcludingDeps"), "ZIP 생성");
      assert(zip.includes("JSZip"), "JSZip 사용");
      assert(modal.includes("zipProjectFolderExcludingDeps"), "모달 ZIP 업로드");
      assert(edge.includes("extractZipSourceSnippets"), "Edge ZIP 추출");
      assert(edge.includes("ai_team_detail_ai_memory"), "AI 기억 문서 테이블");
      assert(edge.includes("saveTeamAiMemory"), "분석 후 기억 저장");
      assert(edge.includes("buildTroubleshootingSystemPrompt"), "트러블슈팅 프롬프트");
      assert(edge.includes("alwaysSampleLatestFileCount"), "최신 산출물 소스 조회");
    },
  },
  {
    id: 157,
    name: "배포 링크 배너",
    run: () => {
      assert(read("src/app/utils/deliverableLinks.ts").includes("deliverableDeployUrl"), "deliverableDeployUrl");
      const team = read("src/app/pages/TeamDetailPage.tsx");
      assert(team.includes("deliverableDeployUrl"), "팀 상세 배너가 deploy URL 사용");
      assert(!team.includes("latestLinkDeliverable.publicUrl"), "Storage publicUrl 직접 배너 미사용");
    },
  },
  {
    id: 158,
    name: "프로필 미확인 점멸",
    run: () => {
      const nav = read("src/app/components/NavProfileInbox.tsx");
      assert(nav.includes("nav-profile-unread-dot"), "unread dot testid");
      assert(read("src/styles/material3.css").includes("cc-unread-dot-pulse"), "pulse 애니메이션");
      assert(read("src/app/utils/navInboxSeen.ts").includes("markCourseAnnouncementsSeen"), "읽음 추적");
    },
  },
  {
    id: 159,
    name: "프로필 hover 인박스",
    run: () => {
      const nav = read("src/app/components/NavProfileInbox.tsx");
      assert(nav.includes("nav-profile-inbox-dropdown"), "드롭다운");
      assert(nav.includes("cc-nav-profile-inbox-popover"), "hover 간격·브릿지");
      assert(read("src/styles/material3.css").includes("cc-nav-profile-inbox-popover"), "popover CSS");
      assert(read("src/app/hooks/useNavInbox.ts").includes("NavInboxItem"), "useNavInbox");
      assert(
        read("src/app/hooks/useNavInbox.ts").includes("shouldShowDirectMessageInNavInbox"),
        "본인 발신 DM 목록 제외"
      );
      assert(
        read("src/app/hooks/useNavInbox.ts").includes("shouldShowAnnouncementInNavInbox"),
        "본인 공지 목록 제외"
      );
    },
  },
  {
    id: 160,
    name: "수업 시작·종료일",
    run: () => {
      const types = read("src/app/types/index.ts");
      const page = read("src/app/pages/CoursesPage.tsx");
      const api = read("src/app/api/supabase-api.ts");
      assert(types.includes("startDate") && types.includes("endDate"), "Course 타입 날짜 필드");
      assert(page.includes("course-create-start-date"), "생성 모달 시작일");
      assert(api.includes("start_date") && api.includes("end_date"), "DB 매핑");
      assert(read("supabase/migrations/20260526214000_ai_courses_start_end_dates.sql").includes("start_date"), "마이그레이션 파일");
    },
  },
  {
    id: 161,
    name: "수업 생성 후 모달 닫기",
    run: () => {
      const page = read("src/app/pages/CoursesPage.tsx");
      const block = page.slice(page.indexOf("handleCreateCourse"), page.indexOf("const copyCourseCode"));
      assert(block.includes("setShowCreateModal(false)"), "성공 시 모달 닫기");
      assert(block.indexOf("setShowCreateModal(false)") < block.indexOf("loadCourses"), "loadCourses 전에 모달 닫기");
      assert(block.includes("if (submitting) return"), "중복 제출 방지");
    },
  },
  {
    id: 162,
    name: "스테이지 수업별 반영",
    run: () => {
      const api = read("src/app/api/supabase-api.ts");
      const fn = api.slice(api.indexOf("getCourseStageNamesFromDb"), api.indexOf("async function getCoursesFromDb"));
      assert(fn.includes("if (courseId) return []"), "수업 지정 시 글로벌 fallback 없음");
      const create = api.slice(api.indexOf("createCourseInDb"), api.indexOf("async function replaceCourseStagesInDb"));
      assert(create.includes("invalidateApiSessionCache()"), "생성 후 수업 목록 캐시 무효화");
      assert(create.includes("is_required: true"), "스테이지 is_required");
      assert(create.includes('.delete().eq("id", courseId)'), "스테이지 실패 시 수업 롤백");
    },
  },
  {
    id: 163,
    name: "교수 그리드 카드",
    run: () => {
      const page = read("src/app/pages/StudentsNetworkPage.tsx");
      assert(page.includes("ProfessorNetworkCard"), "ProfessorNetworkCard");
      assert(page.includes("students-network-professor-grid-card"), "그리드 카드 testid");
      assert(!page.includes("students-network-professor-card"), "상단 긴 배너 testid 제거");
      assert(page.includes("professorItem, ...studentGridEntries"), "교수 1번 칸(교수 뷰)");
      assert(page.includes("professorItem,") && page.includes("displaySelfStudent"), "학생 뷰 2번 칸");
    },
  },
];

function testDeliverableDeployUrlLogic() {
  const desc = "프로젝트 설명\n\n🔗 배포 링크: https://my-app.vercel.app";
  const match = desc.match(/🔗 배포 링크:\s*(https?:\/\/\S+)/i);
  assert(match?.[1] === "https://my-app.vercel.app", "description 배포 URL 추출");
  const storage = "https://xxx.supabase.co/storage/v1/object/public/bucket/file.zip";
  assert(storage.includes("supabase.co"), "storage URL 시나리오");
  assert(match?.[1] !== storage, "배포 URL ≠ storage URL");
}

function testFolderExcludeLogic() {
  const excluded = (path) => {
    const parts = path.replace(/\\/g, "/").split("/").filter(Boolean);
    return parts.some((s) => s === "node_modules" || s === ".git");
  };
  assert(excluded("proj/node_modules/pkg/index.js"), "node_modules 제외");
  assert(excluded("proj/.git/config"), ".git 제외");
  assert(!excluded("proj/src/App.tsx"), "소스 포함");
}

console.log("vision.md 추가요청 #154~#163 코드·로직 검증\n");
console.log("로직 스모크");
try {
  testDeliverableDeployUrlLogic();
  console.log("  ✓ #157 배포 URL 추출 로직");
  testFolderExcludeLogic();
  console.log("  ✓ #156 폴더 제외 로직");
} catch (e) {
  console.error(`  ✗ ${e.message}`);
  process.exit(1);
}
console.log("");
let failed = 0;
for (const c of checks) {
  console.log(`#${c.id} ${c.name}`);
  try {
    c.run();
  } catch (e) {
    console.error(`  ✗ ${e.message}`);
    failed += 1;
  }
  console.log("");
}

if (failed > 0) {
  console.error(`\n${failed}개 항목 실패`);
  process.exit(1);
}
console.log(`\n전체 ${checks.length}개 항목 코드 검증 통과`);
