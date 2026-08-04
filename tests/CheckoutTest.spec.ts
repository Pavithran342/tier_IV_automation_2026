import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test.describe('SauceDemo Checkout Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();

    await loginPage.login(
      'standard_user',
      'secret_sauce'
    );
  });

  test('Complete an order successfully', async ({
    page
  }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    const checkoutInformationPage =
      new CheckoutInformationPage(page);

    const checkoutOverviewPage =
      new CheckoutOverviewPage(page);

    const checkoutCompletePage =
      new CheckoutCompletePage(page);

    const productName = 'Sauce Labs Backpack';

    // Add product
    await inventoryPage.addProductToCart(productName);
    await inventoryPage.verifyCartCount(1);

    // Open cart
    await inventoryPage.openCart();

    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyProductIsPresent(productName);

    // Start checkout
    await cartPage.clickCheckout();

    await checkoutInformationPage
      .verifyCheckoutInformationPage();

    // Enter customer details
    await checkoutInformationPage
      .enterCustomerInformation(
        'Ram',
        'Laxman',
        '500001'
      );

    await checkoutInformationPage.continueCheckout();

    // Validate checkout overview
    await checkoutOverviewPage
      .verifyCheckoutOverviewPage();

    await checkoutOverviewPage
      .verifyProductIsDisplayed(productName);

    await checkoutOverviewPage
      .verifySubtotalIsDisplayed();

    await checkoutOverviewPage
      .verifyTaxIsDisplayed();

    await checkoutOverviewPage
      .verifyTotalIsDisplayed();

    // Finish order
    await checkoutOverviewPage.finishCheckout();

    // Verify successful order
    await checkoutCompletePage
      .verifyOrderCompletion();
  });

  test('Validate mandatory first name', async ({
    page
  }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    const checkoutInformationPage =
      new CheckoutInformationPage(page);

    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await inventoryPage.openCart();
    await cartPage.clickCheckout();

    await checkoutInformationPage
      .enterCustomerInformation(
        '',
        'Ram',
        '500001'
      );

    await checkoutInformationPage.continueCheckout();

    await checkoutInformationPage.verifyErrorMessage(
      'First Name is required'
    );
  });

  test('Validate mandatory last name', async ({
    page
  }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    const checkoutInformationPage =
      new CheckoutInformationPage(page);

    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await inventoryPage.openCart();
    await cartPage.clickCheckout();

    await checkoutInformationPage
      .enterCustomerInformation(
        'Ram',
        '',
        '500001'
      );

    await checkoutInformationPage.continueCheckout();

    await checkoutInformationPage.verifyErrorMessage(
      'Last Name is required'
    );
  });

  test('Validate mandatory postal code', async ({
    page
  }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    const checkoutInformationPage =
      new CheckoutInformationPage(page);

    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await inventoryPage.openCart();
    await cartPage.clickCheckout();

    await checkoutInformationPage
      .enterCustomerInformation(
        'Ram',
        'Laxman',
        ''
      );

    await checkoutInformationPage.continueCheckout();

    await checkoutInformationPage.verifyErrorMessage(
      'Postal Code is required'
    );
  });
});