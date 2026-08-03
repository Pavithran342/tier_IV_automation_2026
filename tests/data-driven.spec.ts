import { test, expect } from '@playwright/test';

const testData = [
  {
    username: "12",
    errorMessage: "username is too short (minimum is 3 characters)",
    isErrorDisplayed: true
  },
  {
    username: "123",
    errorMessage: "username",
    isErrorDisplayed: false
  },
  {
    username: "12345678901234567890",
    errorMessage: "username",
    isErrorDisplayed: false
  },
  {
    username: "123456789012345678901",
    errorMessage: "username is too long (maximum is 20 characters)",
    isErrorDisplayed: true
  }
].forEach(({ username, errorMessage, isErrorDisplayed }) => {
  test(`@P1 Smoke Error message test ${username}`, async ({ page }) => {
    await page.goto('https://conduit.bondaracademy.com/');
    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('link', { name: 'Sign up' }).click();

    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Email' }).fill('412');
    await page.getByRole('textbox', { name: 'Password' }).fill('HelloWorld1');
    await page.getByRole('button', { name: 'Sign up' }).click();

    if (isErrorDisplayed) {
      await expect(page.locator('.error-messages'))
        .toContainText(errorMessage);
    } else {
      await expect(page.locator('.error-messages'))
        .not.toContainText(errorMessage);
    }
  });
});
