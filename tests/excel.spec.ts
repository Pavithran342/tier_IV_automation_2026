import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';
import path from 'path';

const UserDataFile = path.join(__dirname, '../data/UserData.xlsx');

interface UserData {
  email: string;
  password: string;
}

test('@P1 Login to application, Data Driven Test from Excel', async ({ page }) => {

  // Read the Excel file
  const workbook = XLSX.readFile(UserDataFile);
  //const sheetName = workbook.SheetNames[];
  const worksheet = workbook.Sheets["Sheet1"];
  const xlxToJson = XLSX.utils.sheet_to_json<UserData>(worksheet, { header: 1 });
  console.log(xlxToJson);

   await page.goto('https://conduit.bondaracademy.com/');
   await page.getByRole('link', { name: 'Sign in' }).click();
   await page.waitForLoadState('networkidle');
   await page.getByRole('textbox', { name: 'Email' }).fill(`${xlxToJson[1].email}`);
   await page.getByRole('textbox', { name: 'Password' }).fill(`${xlxToJson[1].password}`);
   await page.getByRole('button', { name: 'Sign in' }).click();

  });
