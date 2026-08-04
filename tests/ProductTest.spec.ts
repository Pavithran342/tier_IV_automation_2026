import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

test.describe('SauceDemo Product Tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateToLoginPage();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );
    });

    test('Verify product count', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        const productCount =
            await inventoryPage.getProductCount();

        expect(productCount).toBe(6);
    });

    test('Verify Sauce Labs Backpack price', async ({
        page
    }) => {
        const inventoryPage = new InventoryPage(page);

        const productPrice =
            await inventoryPage.getProductPrice(
                'Sauce Labs Backpack'
            );

        expect(productPrice).toBe('$29.99');
    });

    test('Open and validate product details', async ({
        page
    }) => {
        const inventoryPage = new InventoryPage(page);
        const productDetailsPage =
            new ProductDetailsPage(page);

        await inventoryPage.openProduct(
            'Sauce Labs Backpack'
        );

        await productDetailsPage.verifyProductName(
            'Sauce Labs Backpack'
        );

        await productDetailsPage.verifyProductPrice(
            '$29.99'
        );

        await productDetailsPage
            .verifyProductDescriptionIsDisplayed();
    });

    test('Sort products from low to high', async ({
        page
    }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.sortProducts('lohi');

        const prices = await page
            .locator('[data-test="inventory-item-price"]')
            .allTextContents();

        const numericPrices = prices.map(price =>
            Number(price.replace('$', ''))
        );

        const sortedPrices = [...numericPrices].sort(
            (firstPrice, secondPrice) =>
                firstPrice - secondPrice
        );

        expect(numericPrices).toEqual(sortedPrices);
    });
});