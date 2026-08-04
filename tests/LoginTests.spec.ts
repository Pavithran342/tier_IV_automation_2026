import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {InventoryPage} from '../pages/InventoryPage';


test.describe('SauceDemo Login Tests', () => {

    test('login with valid credentails',async ({page}) => {

    let loginPageObj = new LoginPage(page);  // its going call constructor of LoginPage class and pass page object to it
    let inventoryPageObj = new InventoryPage(page);

    await loginPageObj.navigateToLoginPage();
    await loginPageObj.verifyLoginPageIsDisplayed();
    await loginPageObj.login('standard_user','secret_sauce');
    await inventoryPageObj.verifyInventoryPageIsDisplayed();
    });




});