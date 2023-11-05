// @ts-check
const { test, expect } = require('@playwright/test');

test('Checks that automationintesting.online page can be opened', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  const isButtonVisible = await page.isVisible('.btn btn-primary');
  expect(isButtonVisible).toBe(true);
});

test('Checks "Let me hack!" button closes banner"', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  const getHackButton = page.getByRole('button', { name: 'Let me hack!' });
  await getHackButton.click();
  const isButtonVisible = await page.isVisible('.btn btn-primary');
  expect(isButtonVisible).toBe(false);
});