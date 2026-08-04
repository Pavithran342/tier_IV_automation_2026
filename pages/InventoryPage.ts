import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortDropdown = page.locator(
      '[data-test="product-sort-container"]'
    );
    this.menuButton = page.getByRole('button', {
      name: 'Open Menu'
    });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async verifyInventoryPageIsDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.pageTitle).toHaveText('Products');
  }

  async getProductCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.inventoryItems.filter({
      hasText: productName
    });

    await product.getByRole('button', {
      name: 'Add to cart'
    }).click();
  }

  async removeProductFromInventory(
    productName: string
  ): Promise<void> {
    const product = this.inventoryItems.filter({
      hasText: productName
    });

    await product.getByRole('button', {
      name: 'Remove'
    }).click();
  }

  async openProduct(productName: string): Promise<void> {
    await this.page.getByText(productName, {
      exact: true
    }).click();
  }

  async getProductPrice(
    productName: string
  ): Promise<string> {
    const product = this.inventoryItems.filter({
      hasText: productName
    });

    const price = await product
      .locator('[data-test="inventory-item-price"]')
      .textContent();

    return price?.trim() ?? '';
  }

  async sortProducts(sortOption: string): Promise<void> {
    await this.sortDropdown.selectOption(sortOption);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async verifyCartCount(expectedCount: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(
      expectedCount.toString()
    );
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}