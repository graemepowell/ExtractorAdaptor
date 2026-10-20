import { test, expect } from '@playwright/test';

test('Application loads and initializes WebGL without JS errors', async ({ page }) => {
  const pageErrors = [];
  
  // Capture unhandled console errors or runtime crashes
  page.on('pageerror', (exception) => {
    pageErrors.push(exception.message);
  });

  // Navigate to the local page
  await page.goto('file://' + process.cwd() + '/index.html');

  // Verify header title exists
  const title = page.locator('.header h1');
  await expect(title).toHaveText('Dust Adapter Generator');

  // Verify canvas element exists and error box remains hidden
  const canvas = page.locator('#canvas-container canvas');
  const errorBox = page.locator('#error-box');

  await expect(canvas).toBeVisible();
  await expect(errorBox).not.toBeVisible();

  // Assert no unhandled JS errors occurred during loading
  expect(pageErrors).toEqual([]);
});
