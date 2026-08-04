import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');

    this.checkoutButton = page.locator(
      '[data-test="checkout"]'
    );

    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]'
    );
  }

  async verifyCartPageIsDisplayed(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async verifyProductIsPresent(
    productName: string
  ): Promise<void> {
    const product = this.cartItems.filter({
      hasText: productName
    });

    await expect(product).toBeVisible();
  }

  async verifyProductIsNotPresent(
    productName: string
  ): Promise<void> {
    const product = this.cartItems.filter({
      hasText: productName
    });

    await expect(product).toHaveCount(0);
  }

  async getCartProductCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getProductPrice(
    productName: string
  ): Promise<string> {
    const product = this.cartItems.filter({
      hasText: productName
    });

    const price = await product
      .locator('[data-test="inventory-item-price"]')
      .textContent();

    return price?.trim() ?? '';
  }

  async removeProduct(productName: string): Promise<void> {
    const product = this.cartItems.filter({
      hasText: productName
    });

    await product.getByRole('button', {
      name: 'Remove'
    }).click();
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}