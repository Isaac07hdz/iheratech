const { test, expect } = require('@playwright/test');

test.describe('mobile viewport coverage', () => {
  test.use({
    viewport: { width: 390, height: 844 }
  });

  test('about page renders on mobile without console/runtime errors', async ({ page }) => {
    const consoleErrors = [];
    const pageErrors = [];
    const ignoredConsoleErrorPatterns = [
      /X-Frame-Options may only be set via an HTTP header/i
    ];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        const isIgnored = ignoredConsoleErrorPatterns.some((pattern) => pattern.test(text));

        if (!isIgnored) {
          consoleErrors.push(text);
        }
      }
    });

    page.on('pageerror', (error) => {
      pageErrors.push(error.message);
    });

    await page.goto('/about.html');

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.sidebar')).toBeVisible();
    await expect(page.locator('.main')).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1
    );

    expect(hasHorizontalOverflow).toBeFalsy();
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });
});
