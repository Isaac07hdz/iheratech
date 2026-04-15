const { test, expect } = require('@playwright/test');

test('root redirects to about page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/about\.html$/);
});

test('about page renders CV header', async ({ page }) => {
  await page.goto('/about.html');
  await expect(page).toHaveTitle(/Isaac Miguel Hernández Ramos — CV/);
  await expect(page.locator('h1')).toContainText('ISAAC');
});
