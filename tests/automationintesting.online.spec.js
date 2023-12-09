// @ts-check
const { test, expect } = require('@playwright/test');

test('Checks that automationintesting.online page can be opened', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  const isButtonVisible = await page.isVisible('.btn btn-primary');
  expect(isButtonVisible).toBe(true);
});

test('Checks "Let me hack!" button closes banner"', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  const getHackButton = page.getByRole('button', { name: 'Let me hack!' }).click();
  const isButtonVisible = await page.isVisible('.btn btn-primary');
  expect(isButtonVisible).toBe(false);
});

test('Checks that for get in touch - phone field cannot be empty', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  await page.click('#submitContact');
  const isPhoneBlank = await page.textContent('.col-sm-5');
  expect(isPhoneBlank).toContain("Phone may not be blank");
});

test('Checks that for get in touch - phone field cannot be less than 11 char', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  await page.getByTestId('ContactPhone').fill('0123456789')
  await page.click('#submitContact');
  const isPhoneBlank = await page.textContent('.col-sm-5');
  expect(isPhoneBlank).toContain("Phone must be between 11 and 21 characters.");
});

test('Checks that for get in touch - phone field cannot be bigger than 21 char', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  await page.getByTestId('ContactPhone').fill('0123456789012345678901')
  await page.click('#submitContact');
  const isPhoneBlank = await page.textContent('.col-sm-5');
  expect(isPhoneBlank).toContain("Phone must be between 11 and 21 characters.");
});

test('Checks that for get in touch - phone field validation works for between 11 and 21 characters', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  //getRandomCharacterString gets random string between 11 and 21 characters inclusive
  const getRandomCharacterString = () => Array.from({ length: Math.floor(Math.random() * 11) + 11 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 62)]).join('');
  const randomString = getRandomCharacterString()
  await page.getByTestId('ContactPhone').fill(randomString);
  await page.click('#submitContact');
  const isPhoneBlank = await page.textContent('.col-sm-5');
  expect(isPhoneBlank).not.toContain("Phone must be between 11 and 21 characters.");
});

test('Checks that "Book this room" button opens contact input table for room booking', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  await page.getByRole('button', { name: 'Book this room' }).click();
  const isBookingVisible = await page.isVisible('.col-sm-4');
  expect(isBookingVisible).toBe(true);
});

test('Checks that booking this room forms First name cannot be less than 3 char', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  await page.getByRole('button', { name: 'Book this room' }).click();
  await page.getByPlaceholder('Firstname').fill('12')
  await page.getByRole('button', { name: 'Book' }).click();
  const isPhoneBlank = await page.textContent('.col-sm-4');
  expect(isPhoneBlank).toContain("size must be between 3 and 30");
});

test('Checks that booking this room forms First name cannot be bigger than 30 char', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  await page.getByRole('button', { name: 'Book this room' }).click();
  await page.getByPlaceholder('Firstname').fill('0123456789012345678901234567891')
  await page.getByRole('button', { name: 'Book' }).click();
  const isPhoneBlank = await page.textContent('.col-sm-4');
  expect(isPhoneBlank).toContain("size must be between 3 and 30");
});

test('Checks that booking this room forms First name field validation works for between 3 and 30 characters', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  //getRandomCharacterString gets random string between 3 and 30 characters inclusive
  const getRandomCharacterString = () => Array.from({ length: Math.floor(Math.random() * 28) + 3 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 62)]).join('');
  const randomString = getRandomCharacterString()
  await page.getByRole('button', { name: 'Book this room' }).click();
  await page.getByPlaceholder('Firstname').fill(randomString);
  const isPhoneBlank = await page.textContent('.col-sm-4');
  expect(isPhoneBlank).not.toContain("size must be between 3 and 30");
});

test('Checks that book this room modal is closed with "Close" button', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  await page.getByRole('button', { name: 'Book this room' }).click();
  const firstDay = page.getByRole('cell', { name: '05' });
  const secondDay = page.getByRole('cell', { name: '06' });

  await page.getByRole('cell', { name: '05' }).first().hover();
  await page.getByRole('cell', { name: '05' }).first().hover();
  await page.mouse.down();
  await page.getByRole('cell', { name: '05' }).first().hover();
  await page.getByRole('cell', { name: '06' }).first().hover();
  await page.getByRole('cell', { name: '06' }).first().hover();
  await page.mouse.up();
  await page.getByRole('cell', { name: '06' }).first().hover();

 /* await page.locator('div:nth-child(4) > .rbc-row-bg > div:nth-child(3)').hover();
  await page.mouse.down();
  await page.locator('div:nth-child(4) > .rbc-row-bg > div:nth-child(4)').hover();
  await page.mouse.up();*/

  await page.getByRole('cell', { name: '05' }).first().dragTo(page.getByRole('cell', { name: '06' }).first());

  await page.getByPlaceholder('Firstname').fill('FIRSTNAME');
  await page.getByPlaceholder('Lastname').fill('LASTNAME');
  await page.locator('input[name="email"]').fill('email@email.com');
  await page.locator('input[name="phone"]').fill('01234567891');
  await page.getByRole('button', { name: 'Book' }).click();

});