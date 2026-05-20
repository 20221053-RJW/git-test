import { test, expect } from "@playwright/test";
import { hasE2ECredentials, loginViaLanding, openFirstCourse } from "./helpers/auth";

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
  });

  test("7. 마이페이지 리포트 페이지 전환", async ({ page }) => {
    await loginViaLanding(page);
    await page.locator('a[href="/app/mypage"]').click();
    await expect(page).toHaveURL("/app/mypage");
    await page.getByRole("button", { name: "다음 페이지" }).click();
    await expect(page.getByText("PAGE 02 PROJECT DETAIL")).toBeVisible();
    await page.getByRole("button", { name: "다음 페이지" }).click();
    await expect(page.getByText("PAGE 03 PROBLEM SOLVING")).toBeVisible();
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
