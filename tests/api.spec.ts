import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('simple get request', async ({ request }) => {
  const response = await request.get('https://conduit-api.bondaracademy.com/api/tags');
  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.tags[0]).toEqual('Test');
  expect(response.status()).toBe(200);
  expect(responseBody.tags).toHaveLength(10);
});

test('simple post request', async ({ request }) => {
  const response = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    headers: {
      "Authorization": "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2Mjg4NX0sImlhdCI6MTc4NTczNzA0OSwiZXhwIjoxNzkwOTIxMDQ5fQ.a_PDPIzWoU7SXQIJyKEggjff9lGkvwMmaXLsBmcMWiq"
    },
    data: {
      "article":{"title":"TEST TITLE","description":"Myself","body":"Pavithran Jagadeesan","tagList":[]}
    },
  });
  const responseBody = await response.json();
  //expect(response.status()).toBe(201);
  console.log(responseBody);
});

