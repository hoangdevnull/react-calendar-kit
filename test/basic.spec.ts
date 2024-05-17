import { expect, test } from '@playwright/test';

test.describe('basic behavior', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('input props are forwarded', async ({ page }) => {
    const label = page.locator(`label`);
    await expect(label).toHaveCount(2);
  });
});
