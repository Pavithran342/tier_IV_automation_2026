import { expect, Locator, Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly checkoutItems: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator('[data-test="title"]');

    this.checkoutItems = page.locator(
      '[data-test="inventory-item"]'
    );

    this.subtotalLabel = page.locator(
      '[data-test="subtotal-label"]'
    );

    this.taxLabel = page.locator(
      '[data-test="tax-label"]'
    );

    this.totalLabel = page.locator(
      '[data-test="total-label"]'
    );

    this.finishButton = page.locator(
      '[data-test="finish"]'
    );

    this.cancelButton = page.locator(
      '[data-test="cancel"]'
    );
  }

  async verifyCheckoutOverviewPage(): Promise<void> {
    await expect(this.pageTitle).toHaveText(
      'Checkout: Overview'
    );
  }

  async verifyProductIsDisplayed(
    productName: string
  ): Promise<void> {
    const product = this.checkoutItems.filter({
      hasText: productName
    });

    await expect(product).toBeVisible();
  }

  async verifySubtotalIsDisplayed(): Promise<void> {
    await expect(this.subtotalLabel).toBeVisible();
  }

  async verifyTaxIsDisplayed(): Promise<void> {
    await expect(this.taxLabel).toBeVisible();
  }

  async verifyTotalIsDisplayed(): Promise<void> {
    await expect(this.totalLabel).toBeVisible();
  }

  async getTotalAmount(): Promise<string> {
    return (
      await this.totalLabel.textContent()
    )?.trim() ?? '';
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }
}