# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.ts >> simple post request
- Location: tests\api.spec.ts:19:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 422
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('has title', async ({ page }) => {
  4  |   await page.goto('https://playwright.dev/');
  5  | 
  6  |   // Expect a title "to contain" a substring.
  7  |   await expect(page).toHaveTitle(/Playwright/);
  8  | });
  9  | 
  10 | test('simple get request', async ({ request }) => {
  11 |   const response = await request.get('https://conduit-api.bondaracademy.com/api/tags');
  12 |   const responseBody = await response.json();
  13 |   console.log(responseBody);
  14 |   expect(responseBody.tags[0]).toEqual('Test');
  15 |   expect(response.status()).toBe(200);
  16 |   expect(responseBody.tags).toHaveLength(10);
  17 | });
  18 | 
  19 | test('simple post request', async ({ request }) => {
  20 |   const response = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
  21 |     headers: {
  22 |       "Authorization": "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2Mjg4NX0sImlhdCI6MTc4NTczNzA0OSwiZXhwIjoxNzkwOTIxMDQ5fQ.a_PDPIzWoU7SXQIJyKEggjff9lGkvwMmaXLsBmcMWiQ"
  23 |     },
  24 |     data: {
  25 |       "article":{"title":"TEST TITLE","description":"Myself","body":"Pavithran Jagadeesan","tagList":[]}
  26 |     },
  27 |   });
  28 |   const responseBody = await response.json();
> 29 |   expect(response.status()).toBe(201);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  30 |   console.log(responseBody);
  31 | });
  32 | 
  33 | 
```