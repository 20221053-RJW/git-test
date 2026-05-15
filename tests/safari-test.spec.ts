import { test, expect } from '@playwright/test';

test('사파리 렌더링 확인', async ({ page }) => {
    // 현재 npm run dev로 실행 중인 로컬 주소를 입력하세요
    await page.goto('http://localhost:5174');

    // 브라우저가 열린 상태로 유지되도록 잠시 대기 (확인용)
    await page.pause();
});


