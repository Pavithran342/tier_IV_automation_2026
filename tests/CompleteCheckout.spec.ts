import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

interface CheckoutTestData {
  TestCaseID: string;
  Username: string;
  Password: string;
  ProductName: string;
  FirstName: string;
  LastName: string;
  PostalCode: string;
  ExpectedMessage: string;
  Execute: string;
}

const excelFilePath = [
  path.resolve(process.cwd(), 'test data', 'SauceDemoTestData.xlsx'),
  path.resolve(process.cwd(), 'testdata', 'SauceDemoTestData.xlsx'),
  path.resolve(__dirname, '..', 'test data', 'SauceDemoTestData.xlsx'),
  path.resolve(__dirname, '..', 'testdata', 'SauceDemoTestData.xlsx'),
].find(fs.existsSync);

if (!excelFilePath) {
  throw new Error(
    `Excel file not found. Checked: ${path.resolve(process.cwd(), 'test data', 'SauceDemoTestData.xlsx')} and ${path.resolve(process.cwd(), 'testdata', 'SauceDemoTestData.xlsx')}`
  );
}

const workbook = XLSX.readFile(excelFilePath);

const worksheet = workbook.Sheets['CheckoutData'];

if (!worksheet) {
  throw new Error('CheckoutData sheet was not found');
}

const checkoutData =
  XLSX.utils.sheet_to_json<CheckoutTestData>(
    worksheet,
    {
      defval: '',
      raw: false,
    }
  );

const executableRows = checkoutData.filter(
  data =>
    String(data.Execute).trim().toLowerCase() === 'yes'
);

for (const data of executableRows) {
  test(`${data.TestCaseID} - Complete checkout for ${data.ProductName}`, async ({
    page,
  }) => {
    // Open application
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page
      .getByPlaceholder('Username')
      .fill(data.Username);

    await page
      .getByPlaceholder('Password')
      .fill(data.Password);

    await page
      .getByRole('button', { name: 'Login' })
      .click();

    await expect(page.locator('.title')).toHaveText(
      'Products'
    );

    // Find the required product
    const productContainer = page
      .locator('.inventory_item')
      .filter({
        has: page.getByText(data.ProductName, {
          exact: true,
        }),
      });

    await expect(productContainer).toBeVisible();

    // Add product to cart
    await productContainer
      .getByRole('button', { name: 'Add to cart' })
      .click();

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('1');

    // Open cart
    await page.locator('.shopping_cart_link').click();

    await expect(page.locator('.title')).toHaveText(
      'Your Cart'
    );

    await expect(
      page.getByText(data.ProductName, {
        exact: true,
      })
    ).toBeVisible();

    // Click checkout
    await page
      .getByRole('button', { name: 'Checkout' })
      .click();

    await expect(page.locator('.title')).toHaveText(
      'Checkout: Your Information'
    );

    // Enter customer information from Excel
    await page
      .getByPlaceholder('First Name')
      .fill(data.FirstName);

    await page
      .getByPlaceholder('Last Name')
      .fill(data.LastName);

    await page
      .getByPlaceholder('Zip/Postal Code')
      .fill(String(data.PostalCode));

    await page
      .getByRole('button', { name: 'Continue' })
      .click();

    // Validate checkout overview
    await expect(page.locator('.title')).toHaveText(
      'Checkout: Overview'
    );

    await expect(
      page.getByText(data.ProductName, {
        exact: true,
      })
    ).toBeVisible();

    // Finish order
    await page
      .getByRole('button', { name: 'Finish' })
      .click();

    // Validate order confirmation
    await expect(page.locator('.complete-header')).toHaveText(
      data.ExpectedMessage
    );
  });
}
