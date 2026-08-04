import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

interface ProductTestData {
  TestCaseID: string;
  Username: string;
  Password: string;
  ProductName: string;
  ExpectedPrice: string;
  Execute: string;
}

// Excel file location
const excelFilePath = [
  path.resolve(process.cwd(), 'test data', 'SauceDemoTestData.xlsx'),
  path.resolve(process.cwd(), 'testdata', 'SauceDemoTestData.xlsx'),
  path.resolve(__dirname, '..', 'test data', 'SauceDemoTestData.xlsx'),
  path.resolve(__dirname, '..', 'testdata', 'SauceDemoTestData.xlsx'),
].find(fs.existsSync);

// Check whether the Excel file exists
if (!excelFilePath) {
  throw new Error(
    `Excel file not found. Checked: ${path.resolve(process.cwd(), 'test data', 'SauceDemoTestData.xlsx')} and ${path.resolve(process.cwd(), 'testdata', 'SauceDemoTestData.xlsx')}`
  );
}

// Read the Excel workbook
const workbook = XLSX.readFile(excelFilePath);

// Read the ProductData worksheet
const worksheet = workbook.Sheets['ProductData'];

if (!worksheet) {
  throw new Error('ProductData sheet was not found');
}

// Convert Excel rows into JavaScript objects
const allProductData = XLSX.utils.sheet_to_json<ProductTestData>(
  worksheet,
  {
    defval: '',
    raw: false,
  }
);

// Run only rows where Execute column contains "Yes"
const executableProductData = allProductData.filter(
  data =>
    String(data.Execute).trim().toLowerCase() === 'yes'
);

test.describe('SauceDemo Product Tests Using Excel Data', () => {
  /*
   * Program 4:
   * Validate product name and price from Excel
   */
  for (const data of executableProductData) {
    test(`${data.TestCaseID} - Validate ${data.ProductName} name and price`, async ({
      page,
    }) => {
      // Open SauceDemo
      await page.goto('https://www.saucedemo.com/');

      // Enter login details from Excel
      await page
        .getByPlaceholder('Username')
        .fill(data.Username);

      await page
        .getByPlaceholder('Password')
        .fill(data.Password);

      await page
        .getByRole('button', { name: 'Login' })
        .click();

      // Verify successful login
      await expect(page).toHaveURL(/inventory/);

      await expect(page.locator('.title')).toHaveText(
        'Products'
      );

      // Find the complete product container using product name
      const productContainer = page
        .locator('.inventory_item')
        .filter({
          has: page.getByText(data.ProductName, {
            exact: true,
          }),
        });

      // Verify product is displayed
      await expect(productContainer).toBeVisible();

      // Validate product name
      await expect(
        productContainer.locator('.inventory_item_name')
      ).toHaveText(data.ProductName);

      // Validate product price
      await expect(
        productContainer.locator('.inventory_item_price')
      ).toHaveText(data.ExpectedPrice);
    });
  }

  /*
   * Program 5:
   * Add product to cart using Excel data
   */
  for (const data of executableProductData) {
    test(`${data.TestCaseID} - Add ${data.ProductName} to cart`, async ({
      page,
    }) => {
      // Open SauceDemo
      await page.goto('https://www.saucedemo.com/');

      // Enter login details from Excel
      await page
        .getByPlaceholder('Username')
        .fill(data.Username);

      await page
        .getByPlaceholder('Password')
        .fill(data.Password);

      await page
        .getByRole('button', { name: 'Login' })
        .click();

      // Verify successful login
      await expect(page.locator('.title')).toHaveText(
        'Products'
      );

      // Find the product container
      const productContainer = page
        .locator('.inventory_item')
        .filter({
          has: page.getByText(data.ProductName, {
            exact: true,
          }),
        });

      await expect(productContainer).toBeVisible();

      // Add the selected product to the cart
      await productContainer
        .getByRole('button', { name: 'Add to cart' })
        .click();

      // Verify cart count
      await expect(
        page.locator('.shopping_cart_badge')
      ).toHaveText('1');

      // Open the cart page
      await page.locator('.shopping_cart_link').click();

      // Verify cart page
      await expect(page.locator('.title')).toHaveText(
        'Your Cart'
      );

      // Find the product inside the cart
      const cartItem = page
        .locator('.cart_item')
        .filter({
          has: page.getByText(data.ProductName, {
            exact: true,
          }),
        });

      await expect(cartItem).toBeVisible();

      // Validate product name inside the cart
      await expect(
        cartItem.locator('.inventory_item_name')
      ).toHaveText(data.ProductName);

      // Validate product price inside the cart
      await expect(
        cartItem.locator('.inventory_item_price')
      ).toHaveText(data.ExpectedPrice);
    });
  }
});