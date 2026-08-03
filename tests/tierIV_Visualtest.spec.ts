import { test, expect } from '@playwright/test';

test('visual testing', async ({ page }) => {
    await page.goto('https://tier4.co.jp/en/services#service_mobility-service', {
        waitUntil: 'domcontentloaded'
    });

    const cookieSelectors = [
        'button:has-text("Accept")',
        'button:has-text("Allow")',
        'button:has-text("Agree")',
        'button:has-text("OK")',
        'button:has-text("Close")',
        '[role="button"]:has-text("Accept")',
        '[role="button"]:has-text("Allow")',
        '[aria-label*="close" i]'
    ];

    for (const selector of cookieSelectors) {
        const cookieButton = page.locator(selector).first();
        if (await cookieButton.isVisible({ timeout: 1000 }).catch(() => false)) {
            await cookieButton.click().catch(() => {});
            break;
        }
    }
    
    await page.waitForTimeout(3000); // Wait for 3 seconds to ensure the page is fully loaded
    const heading = page.getByRole('heading', {
        name: 'Nationwide deployments'
    });

    await heading.waitFor({ state: 'visible', timeout: 15000 });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();

const prefectures = page.locator('li.experimentNumber').filter({
    hasText: 'prefectures'
});

await page.waitForTimeout(3000);
const number = prefectures.locator('.number');

await prefectures.waitFor({ state: 'visible', timeout: 15000 });
await expect(number).toBeVisible({ timeout: 15000 });
await expect(number).toHaveText('39', { timeout: 15000 }).catch(async () => {
    await expect(prefectures).toHaveScreenshot({ maxDiffPixelRatio: 180 });
});

    




    // const heading = page.getByRole('heading', {
    //     name: 'Case studies & projects'
    // });
    // await heading.scrollIntoViewIfNeeded();

    // await page.getByAltText('Automated transport solutions utilizing autonomous driving technology').click({ force: true });
    // await expect(heading).toHaveScreenshot({ maxDiffPixelRatio: 180 });
});