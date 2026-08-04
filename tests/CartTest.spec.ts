import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('SauceDemo Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();

    await loginPage.login(
      'standard_user',
      'secret_sauce'
    );
  });

  test('Add one product to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

//  //test data retrevial 
    //actions 
    //verifications
    //it should not contain hard coded values in the test case
    //tagging 
    //page object model 

    //move our test data to Json or excel
    //create excel utility 
    //crate json utility

    //call this utiltiy in your tets folder
    


    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await inventoryPage.verifyCartCount(1);
    await inventoryPage.openCart();

    await cartPage.verifyCartPageIsDisplayed();

    await cartPage.verifyProductIsPresent(
      'Sauce Labs Backpack'
    );

    expect(
      await cartPage.getCartProductCount()
    ).toBe(1);
  });

  test('Add multiple products to cart', async ({
    page
  }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await inventoryPage.addProductToCart(
      'Sauce Labs Bike Light'
    );

    await inventoryPage.verifyCartCount(2);
    await inventoryPage.openCart();

    await cartPage.verifyProductIsPresent(
      'Sauce Labs Backpack'
    );

    await cartPage.verifyProductIsPresent(
      'Sauce Labs Bike Light'
    );

    expect(
      await cartPage.getCartProductCount()
    ).toBe(2);
  });

  test('Remove product from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await inventoryPage.openCart();

    await cartPage.removeProduct(
      'Sauce Labs Backpack'
    );

    await cartPage.verifyProductIsNotPresent(
      'Sauce Labs Backpack'
    );

    expect(
      await cartPage.getCartProductCount()
    ).toBe(0);
  });

  test('Verify product price in cart', async ({
    page
  }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await inventoryPage.openCart();

    const productPrice =
      await cartPage.getProductPrice(
        'Sauce Labs Backpack'
      );

    expect(productPrice).toBe('$29.99');
  });
});