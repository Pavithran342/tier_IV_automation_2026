import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;


  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
    
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string,password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async verifyLoginPageIsDisplayed(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
  }

  async verifyLoginError(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}