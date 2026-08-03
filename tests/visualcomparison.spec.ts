import { test, expect } from '@playwright/test';

test('visual testing', async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/pages/forms/layouts')

    const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'})
    await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true})
    await expect(usingTheGridForm).toHaveScreenshot({ maxDiffPixelRatio: 180 });
});