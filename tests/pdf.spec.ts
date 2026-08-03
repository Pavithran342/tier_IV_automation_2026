import { test, expect } from '@playwright/test';
import { PDFParse } from 'pdf-parse';

test('pdf testing', async ({ page }) => {

    const parser = new PDFParse({ url: 'https://www.princexml.com/samples/invoice-plain/index.pdf' });
    await page.waitForLoadState('networkidle');
    const result = await parser.getText();
    const invoiceRegex = /Invoice number:\s*(\d+)/;
    const match = result.text.match(invoiceRegex);
    expect(match![1]).toBe('161126');

});

test('download pdf', async ({ page }) => {

    await page.goto('https://playground.bondaracademy.com/pages/extra-components/pdf-download')
    await page.waitForLoadState('networkidle');

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name: 'Download PDF' }).click()
    ])

    // Create a buffer to read the downloaded PDF
    const buffer = await download.createReadStream().then(stream => {
        return new Promise<Buffer>((resolve, reject) => {
            const chunks: Buffer[] = [];
            stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
            stream.on('error', reject);
            stream.on('end', () => resolve(Buffer.concat(chunks)));
        });
    });

    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    const invoiceRegex = /Invoice number:\s*(\d+)/;
    const match = result.text.match(invoiceRegex);
    expect(match![1]).toBe('161126');

});