import { expect, Locator, Page } from '@playwright/test';

export class CheckoutInformationPage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator('[data-test="title"]');

    this.firstNameInput = page.getByPlaceholder(
      'First Name'
    );

    this.lastNameInput = page.getByPlaceholder(
      'Last Name'
    );

    this.postalCodeInput = page.getByPlaceholder(
      'Zip/Postal Code'
    );

    this.continueButton = page.locator(
      '[data-test="continue"]'
    );

    this.cancelButton = page.locator(
      '[data-test="cancel"]'
    );

    this.errorMessage = page.locator(
      '[data-test="error"]'
    );
  }

  async verifyCheckoutInformationPage(): Promise<void> {
    await expect(this.pageTitle).toHaveText(
      'Checkout: Your Information'
    );
  }

  async enterCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueCheckout(): Promise<void> {
    await this.continueButton.click();
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }

  async verifyErrorMessage(
    expectedMessage: string
  ): Promise<void> {
    await expect(this.errorMessage).toContainText(
      expectedMessage
    );
  }
}