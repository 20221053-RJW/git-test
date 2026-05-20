import { test, expect } from "@playwright/test";
import {
  hasE2ECredentials,
  hasProfessorE2ECredentials,
  loginProfessorViaLanding,
  loginViaLanding,
  openFirstCourse,
} from "./helpers/auth";

test.describe("CampusConnect — 핵심 E2E (T-040)", () => {
  test.beforeEach(() => {
    test.skip(!hasE2ECredentials, "E2E_TEST_EMAIL · E2E_TEST_PASSWORD 를 .env 에 설정하세요.");
  });

  test("1. 랜딩 로그인 → 수업 목록", async ({ page }) => {
    await loginViaLanding(page);
  });

  test("2. 과목 상세 → 수강생 네트워크", async ({ page }) => {
    await loginViaLanding(page);
    await openFirstCourse(page);
    await page.getByRole("link", { name: "수강자들", exact: true }).click();
    await expect(page).toHaveURL(/\/students/);
    await expect(page.getByRole("heading", { name: "수강자들 네트워크" })).toBeVisible();
  });

  test("3. 팀 목록 → 팀 상세", async ({ page }) => {
    await loginViaLanding(page);
    await openFirstCourse(page);
    await page.getByRole("link", { name: "팀", exact: true }).click();
    await expect(page).toHaveURL(/\/teams/);
    await page.getByRole("button", { name: "입장하기" }).first().click();
    await expect(page).toHaveURL(/\/teams\//);
    await expect(page.getByText("프로젝트 산출물 & 공간")).toBeVisible();
  });

  test("4. 마이페이지 프로필 조회", async ({ page }) => {
    await loginViaLanding(page);
    await page.locator('a[href="/app/mypage"]').click();
    await expect(page).toHaveURL("/app/mypage");
    await expect(page.getByRole("heading", { name: "마이페이지" })).toBeVisible();
  });

  test("6. 마이페이지 DB 리포트 미리보기", async ({ page }) => {
    await loginViaLanding(page);
    await page.locator('a[href="/app/mypage"]').click();
    await expect(page).toHaveURL("/app/mypage");
    await page.getByRole("button", { name: "DB 활동 미리보기 (A4)" }).click();
    await expect(
      page.getByText("CampusConnect · 팀 프로젝트 역량 리포트")
    ).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("report-activity-summary")).toContainText("집계:", {
      timeout: 15_000,
    });
    await expect(page.getByTestId("report-activity-summary")).toContainText("트러블슈팅");
    await expect(page.getByTestId("report-activity-summary")).toContainText("교수평가");
    await expect(page.getByTestId("report-problems-solved")).toBeVisible();
    await expect(page.getByTestId("report-technologies")).toBeVisible();
    await expect(page.getByTestId("report-growth-reflection")).toBeVisible();
    await expect(page.getByTestId("report-team-sections")).toBeVisible();
    await expect(page.getByTestId("report-preview-overlay")).toBeVisible();
    await expect(page.getByTestId("report-print-view")).toBeVisible();
    await page.getByTestId("report-preview-close").click();
    await expect(page.getByTestId("report-preview-overlay")).toBeHidden();
  });

  test("12. 교수 팀 제출 현황·프로젝트 평가", async ({ page }) => {
    test.skip(!hasProfessorE2ECredentials, "E2E_PROFESSOR_EMAIL · E2E_PROFESSOR_PASSWORD 를 .env 에 설정하세요.");

    await loginProfessorViaLanding(page);
    await openFirstCourse(page);
    await page.getByRole("link", { name: "팀", exact: true }).click();
    await page.getByRole("button", { name: "입장하기" }).first().click();

    await expect(page.getByTestId("professor-team-submissions")).toBeVisible({
      timeout: 15_000,
    });

    await page.getByRole("button", { name: "프로젝트 평가" }).click();
    await page.getByTestId("professor-eval-holistic").fill(`e2e-prof-${Date.now()}`);
    await page.getByTestId("professor-project-eval-submit").click();
    await expect(page.getByRole("button", { name: "프로젝트 평가" })).toBeVisible({
      timeout: 15_000,
    });
  });

  test("11. 팀 상세 회고록 저장", async ({ page }) => {
    await loginViaLanding(page);
    await openFirstCourse(page);
    await page.getByRole("link", { name: "팀", exact: true }).click();
    await page.getByRole("button", { name: "입장하기" }).first().click();

    const retroBtn = page.getByRole("button", { name: /회고록/ });
    const canRetro = await retroBtn.isVisible().catch(() => false);
    test.skip(!canRetro, "학생 계정·진행 중 수업에서만 회고록 버튼이 보입니다.");

    await retroBtn.click();
    await expect(page.getByRole("heading", { name: "회고록" })).toBeVisible();

    await page.getByTestId("retrospective-custom-role").fill(`e2e-retro-${Date.now()}`);
    await page.getByTestId("retrospective-submit").click();

    await expect(page.getByRole("button", { name: "회고록 수정" })).toBeVisible({
      timeout: 15_000,
    });
  });

  test("10. 팀 상세 동료평가 제출", async ({ page }) => {
    await loginViaLanding(page);
    await openFirstCourse(page);
    await page.getByRole("link", { name: "팀", exact: true }).click();
    await page.getByRole("button", { name: "입장하기" }).first().click();

    const peerReviewBtn = page.getByRole("button", { name: "조원 평가" });
    const canPeerReview = await peerReviewBtn.isVisible().catch(() => false);
    test.skip(!canPeerReview, "학생 계정·진행 중 수업에서만 조원 평가 버튼이 보입니다.");

    await peerReviewBtn.click();
    await expect(page.getByRole("heading", { name: "동료평가" })).toBeVisible();

    const submitBtn = page.locator('[data-testid^="peer-review-submit-"]').first();
    const alreadySubmitted = await submitBtn.getByText("✓ 등록됨").isVisible().catch(() => false);
    if (!alreadySubmitted) {
      await page.getByText("키워드 등록").first().locator("..").getByRole("button").first().click();
      await submitBtn.click();
      await expect(submitBtn.getByText("✓ 등록됨")).toBeVisible({ timeout: 15_000 });
    }
  });

  test("9. 팀 상세 피드백 제출", async ({ page }) => {
    await loginViaLanding(page);
    await openFirstCourse(page);
    await page.getByRole("link", { name: "팀", exact: true }).click();
    await page.getByRole("button", { name: "입장하기" }).first().click();
    await page
      .getByRole("heading", { name: "이 팀의 웹 서비스, 어떻게 생각하시나요?" })
      .scrollIntoViewIfNeeded();

    const alreadyDone = page.getByText("피드백이 완료되었습니다!");
    if (await alreadyDone.isVisible().catch(() => false)) {
      return;
    }

    const feedbackSection = page.locator("div").filter({
      has: page.getByRole("heading", { name: "이 팀의 웹 서비스, 어떻게 생각하시나요?" }),
    });
    await feedbackSection.getByRole("button").first().click();
    await page.getByTestId("team-feedback-submit").click();
    await expect(page.getByText("피드백이 완료되었습니다!")).toBeVisible({ timeout: 15_000 });
  });

  test("8. 팀 상세 채팅 메시지 전송", async ({ page }) => {
    await loginViaLanding(page);
    await openFirstCourse(page);
    await page.getByRole("link", { name: "팀", exact: true }).click();
    await page.getByRole("button", { name: "입장하기" }).first().click();
    await page.getByRole("button", { name: "채팅방 이동" }).first().click();
    const unique = `e2e-chat-${Date.now()}`;
    await page.getByPlaceholder("메시지를 입력하세요.").fill(unique);
    await page.getByRole("button", { name: "전송" }).click();
    await expect(page.getByText(unique)).toBeVisible({ timeout: 15_000 });
  });

  test("15. 팀 상세 배포 링크 등록", async ({ page }) => {
    await loginViaLanding(page);
    await openFirstCourse(page);
    await page.getByRole("link", { name: "팀", exact: true }).click();
    await page.getByRole("button", { name: "입장하기" }).first().click();

    const uniqueUrl = `https://example.com/e2e-${Date.now()}`;
    await page.getByPlaceholder("배포 링크 URL (예: https://example.com)").fill(uniqueUrl);
    await page.getByRole("button", { name: "링크 등록" }).click();
    await expect(page.getByRole("link", { name: "열기" }).first()).toBeVisible({ timeout: 15_000 });
    await expect(page.locator(`a[href="${uniqueUrl}"]`).first()).toBeVisible();
  });

  test("16. 팀 상세 파일 업로드", async ({ page }) => {
    await loginViaLanding(page);
    await openFirstCourse(page);
    await page.getByRole("link", { name: "팀", exact: true }).click();
    await page.getByRole("button", { name: "입장하기" }).first().click();

    const uniqueName = `e2e-upload-${Date.now()}.txt`;
    await page.getByTestId("team-deliverable-file-input").setInputFiles({
      name: uniqueName,
      mimeType: "text/plain",
      buffer: Buffer.from("campusconnect e2e upload"),
    });

    await expect(page.getByText(uniqueName)).toBeVisible({ timeout: 15_000 });
  });

  test("17. 팀 상세 배포 링크 삭제", async ({ page }) => {
    page.on("dialog", (dialog) => dialog.accept());

    await loginViaLanding(page);
    await openFirstCourse(page);
    await page.getByRole("link", { name: "팀", exact: true }).click();
    await page.getByRole("button", { name: "입장하기" }).first().click();

    const uniqueUrl = `https://example.com/e2e-delete-${Date.now()}`;
    await page.getByPlaceholder("배포 링크 URL (예: https://example.com)").fill(uniqueUrl);
    await page.getByPlaceholder("링크 제목 (선택)").fill("e2e-link-delete");
    await page.getByRole("button", { name: "링크 등록" }).click();

    const row = page.locator('[data-testid^="team-deliverable-item-"]', {
      has: page.getByText("e2e-link-delete"),
    }).first();
    await expect(row).toBeVisible({ timeout: 15_000 });
    await row.locator('[data-testid^="team-deliverable-delete-"]').click();
    await expect(row).toHaveCount(0);
  });

  test("18. 팀 상세 잘못된 링크 입력 검증", async ({ page }) => {
    await loginViaLanding(page);
    await openFirstCourse(page);
    await page.getByRole("link", { name: "팀", exact: true }).click();
    await page.getByRole("button", { name: "입장하기" }).first().click();

    await page.getByTestId("team-deliverable-link-url-input").fill("not valid url ###");
    const dialogPromise = page.waitForEvent("dialog");
    await page.getByTestId("team-deliverable-link-submit").click();
    const dialog = await dialogPromise;
    await expect(dialog.message()).toContain("올바른 링크 형식");
    await dialog.accept();
  });

  test("19. 팀 상세 링크 프로토콜 자동보정", async ({ page }) => {
    await loginViaLanding(page);
    await openFirstCourse(page);
    await page.getByRole("link", { name: "팀", exact: true }).click();
    await page.getByRole("button", { name: "입장하기" }).first().click();

    const rawUrl = `example.com/e2e-protocol-${Date.now()}`;
    const expectedUrl = `https://${rawUrl}`;
    await page.getByTestId("team-deliverable-link-url-input").fill(rawUrl);
    await page.getByTestId("team-deliverable-link-title-input").fill("e2e-link-protocol");
    await page.getByTestId("team-deliverable-link-submit").click();
    await expect(page.locator(`a[href="${expectedUrl}"]`).first()).toBeVisible({ timeout: 15_000 });
  });

  test("20. 팀 상세 소스코드 파일 업로드", async ({ page }) => {
    await loginViaLanding(page);
    await openFirstCourse(page);
    await page.getByRole("link", { name: "팀", exact: true }).click();
    await page.getByRole("button", { name: "입장하기" }).first().click();

    const uniqueName = `e2e-source-${Date.now()}.ts`;
    await page.getByTestId("team-deliverable-file-input").setInputFiles({
      name: uniqueName,
      mimeType: "text/plain",
      buffer: Buffer.from("export const e2e = true;"),
    });

    await expect(page.getByText(uniqueName)).toBeVisible({ timeout: 15_000 });
  });

  test("21. 팀 상세 금지 확장자 업로드 차단", async ({ page }) => {
    await loginViaLanding(page);
    await openFirstCourse(page);
    await page.getByRole("link", { name: "팀", exact: true }).click();
    await page.getByRole("button", { name: "입장하기" }).first().click();

    const dialogPromise = page.waitForEvent("dialog");
    await page.getByTestId("team-deliverable-file-input").setInputFiles({
      name: `e2e-blocked-${Date.now()}.exe`,
      mimeType: "application/octet-stream",
      buffer: Buffer.from("blocked"),
    });

    const dialog = await dialogPromise;
    await expect(dialog.message()).toContain("지원하지 않는 파일 형식");
    await dialog.accept();
  });

  test("22. 팀 상세 업로드 가이드 노출", async ({ page }) => {
    await loginViaLanding(page);
    await openFirstCourse(page);
    await page.getByRole("link", { name: "팀", exact: true }).click();
    await page.getByRole("button", { name: "입장하기" }).first().click();
    await expect(page.getByTestId("team-deliverable-upload-guide")).toContainText("허용 형식");
    await expect(page.getByTestId("team-deliverable-upload-button")).toContainText("500MB");
  });

  test("23. 팀 상세 링크 제목 fallback", async ({ page }) => {
    await loginViaLanding(page);
    await openFirstCourse(page);
    await page.getByRole("link", { name: "팀", exact: true }).click();
    await page.getByRole("button", { name: "입장하기" }).first().click();

    const rawUrl = `example.com/e2e-fallback-${Date.now()}/path`;
    const expectedUrl = `https://${rawUrl}`;
    await page.getByTestId("team-deliverable-link-url-input").fill(rawUrl);
    await page.getByTestId("team-deliverable-link-submit").click();

    const row = page.locator('[data-testid^="team-deliverable-item-"]', {
      has: page.locator(`a[href="${expectedUrl}"]`),
    }).first();
    await expect(row).toBeVisible({ timeout: 15_000 });
    await expect(row).toContainText("example.com/path");
  });

  test("7. 마이페이지 리포트 페이지 전환", async ({ page }) => {
    await loginViaLanding(page);
    await page.locator('a[href="/app/mypage"]').click();
    await expect(page).toHaveURL("/app/mypage");
    await expect(page.getByTestId("mypage-summary-paragraph")).toContainText("트러블슈팅", {
      timeout: 15_000,
    });
    await expect(page.getByTestId("mypage-summary-cards")).toBeVisible();
    await expect(page.getByTestId("mypage-competency-db")).toBeVisible();
    await expect(page.getByTestId("mypage-competency-db")).toContainText("DB 추정");
    await expect(page.getByTestId("mypage-activity-bullets")).toContainText("협업");
    await page.getByRole("button", { name: "다음 페이지" }).click();
    await expect(page.getByText("PAGE 02 PROJECT DETAIL")).toBeVisible();
    await expect(page.getByTestId("mypage-team-card-db")).toBeVisible({ timeout: 15_000 });
    await page.getByRole("button", { name: "다음 페이지" }).click();
    await expect(page.getByText("PAGE 03 PROBLEM SOLVING")).toBeVisible();
    await expect(page.getByTestId("mypage-page3-intro")).toContainText("트러블슈팅", {
      timeout: 15_000,
    });
  });

  test("13. 마이페이지 AI 리포트 생성 버튼", async ({ page }) => {
    await loginViaLanding(page);
    await page.locator('a[href="/app/mypage"]').click();
    await expect(page).toHaveURL("/app/mypage");
    await page.getByTestId("ai-report-generate-button").click();
    const message = page.getByTestId("ai-report-message");
    await expect(message).toBeVisible({ timeout: 25_000 });
    await expect(message).toHaveText(
      /DB 집계 초안|AI 리포트가 생성|DB 미리보기|Edge/
    );
  });

  test("14. 교수 마이페이지 학생 리포트 비노출", async ({ page }) => {
    test.skip(!hasProfessorE2ECredentials, "E2E_PROFESSOR_EMAIL · E2E_PROFESSOR_PASSWORD 를 .env 에 설정하세요.");

    await loginProfessorViaLanding(page);
    await page.locator('a[href="/app/mypage"]').click();
    await expect(page).toHaveURL("/app/mypage");
    await expect(page.getByTestId("mypage-professor-report-block")).toBeVisible();
    await expect(page.getByTestId("ai-report-generate-button")).toHaveCount(0);
  });

  test("5. 로그아웃 → 랜딩", async ({ page }) => {
    await loginViaLanding(page);
    await page.getByTestId("logout-button").click();
    await expect(page).toHaveURL("/");
    await page.goto("/app/courses");
    await expect(page).toHaveURL("/");
  });
});

test.describe("인증 가드 (자격 증명 불필요)", () => {
  test("미로그인 시 /app/courses 는 랜딩으로 리다이렉트", async ({ page }) => {
    await page.goto("/app/courses");
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("button", { name: "로그인" })).toBeVisible();
  });
});
