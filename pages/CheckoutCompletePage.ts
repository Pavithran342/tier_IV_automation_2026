import { expect, Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly successHeader: Locator;
  readonly successMessage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator('[data-test="title"]');

    this.successHeader = page.locator(
      '[data-test="complete-header"]'
    );

    this.successMessage = page.locator(
      '[data-test="complete-text"]'
    );

    this.backHomeButton = page.locator(
      '[data-test="back-to-products"]'
    );
  }

  async verifyOrderCompletion(): Promise<void> {
    await expect(this.pageTitle).toHaveText(
      'Checkout: Complete!'
    );

    await expect(this.successHeader).toHaveText(
      'Thank you for your order!'
    );

    await expect(this.successMessage).toBeVisible();
  }

  async returnToProducts(): Promise<void> {
    await this.backHomeButton.click();
  }
}