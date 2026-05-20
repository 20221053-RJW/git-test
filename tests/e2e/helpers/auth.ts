import { expect, type Page } from "@playwright/test";

export const e2eEmail = process.env.E2E_TEST_EMAIL ?? "";
export const e2ePassword = process.env.E2E_TEST_PASSWORD ?? "";
export const hasE2ECredentials = Boolean(e2eEmail && e2ePassword);

export async function loginViaLanding(page: Page) {
  await page.goto("/");
  await page.getByLabel("학번 또는 이메일").fill(e2eEmail);
  await page.getByLabel("비밀번호").fill(e2ePassword);
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page).toHaveURL(/\/app\/courses/, { timeout: 20_000 });
  await expect(
    page.getByRole("heading", { name: /현재 진행 수업|종료된 수업/ })
  ).toBeVisible({ timeout: 15_000 });
}

export async function openFirstCourse(page: Page) {
  const courseLink = page.locator('a[href^="/app/courses/"]').filter({
    has: page.locator("h2"),
  }).first();
  await expect(courseLink).toBeVisible({ timeout: 15_000 });
  await courseLink.click();
  await expect(page).toHaveURL(/\/app\/courses\/[^/]+/);
}
