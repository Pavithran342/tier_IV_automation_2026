# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visualcomparison.spec.ts >> visual testing
- Location: tests\visualcomparison.spec.ts:3:5

# Error details

```
Error: expect(locator).toHaveScreenshot(expected) failed

Locator: locator('nb-card').filter({ hasText: 'Using the Grid' })
  Expected an image 461px by 383px, received 459px by 382px. 

Call log:
  - Expect "toHaveScreenshot" with timeout 5000ms
    - verifying given screenshot expectation
  - waiting for locator('nb-card').filter({ hasText: 'Using the Grid' })
    - locator resolved to <nb-card _nghost-scq-c61="" _ngcontent-scq-c194="">…</nb-card>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - Expected an image 461px by 383px, received 459px by 382px.
  - waiting 100ms before taking screenshot
  - waiting for locator('nb-card').filter({ hasText: 'Using the Grid' })
    - locator resolved to <nb-card _nghost-scq-c61="" _ngcontent-scq-c194="">…</nb-card>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - captured a stable screenshot
  - Expected an image 461px by 383px, received 459px by 382px.

```

# Page snapshot

```yaml
- generic [ref=e7]:
  - navigation [ref=e9]:
    - generic [ref=e10]:
      - generic [ref=e11]:
        - generic [ref=e12]:
          - link [ref=e13] [cursor=pointer]:
            - /url: "#"
          - link "Playground" [ref=e23] [cursor=pointer]:
            - /url: "#"
        - button "Light" [ref=e25] [cursor=pointer]
      - generic [ref=e34]:
        - button [ref=e37] [cursor=pointer]
        - link [ref=e45] [cursor=pointer]:
          - /url: "#"
        - link [ref=e53] [cursor=pointer]:
          - /url: "#"
        - generic [ref=e60]: Nick Jones
  - generic [ref=e66]:
    - list [ref=e71]:
      - listitem [ref=e72]:
        - link "IoT Dashboard" [ref=e73] [cursor=pointer]:
          - /url: /pages/iot-dashboard
      - listitem [ref=e80]:
        - generic [ref=e81]: FEATURES
      - listitem [ref=e82]:
        - link "Forms" [expanded] [ref=e83] [cursor=pointer]:
          - /url: "#"
        - list [ref=e97]:
          - listitem [ref=e98]:
            - link "Form Layouts" [ref=e99] [cursor=pointer]:
              - /url: /pages/forms/layouts
          - listitem [ref=e100]:
            - link "Datepicker" [ref=e101] [cursor=pointer]:
              - /url: /pages/forms/datepicker
      - listitem [ref=e102]:
        - link "Modal & Overlays" [ref=e103] [cursor=pointer]:
          - /url: "#"
        - list:
          - listitem [ref=e118]:
            - link "Dialog" [ref=e119] [cursor=pointer]:
              - /url: /pages/modal-overlays/dialog
          - listitem [ref=e120]:
            - link "Window" [ref=e121] [cursor=pointer]:
              - /url: /pages/modal-overlays/window
          - listitem [ref=e122]:
            - link "Popover" [ref=e123] [cursor=pointer]:
              - /url: /pages/modal-overlays/popover
          - listitem [ref=e124]:
            - link "Toastr" [ref=e125] [cursor=pointer]:
              - /url: /pages/modal-overlays/toastr
          - listitem [ref=e126]:
            - link "Tooltip" [ref=e127] [cursor=pointer]:
              - /url: /pages/modal-overlays/tooltip
      - listitem [ref=e128]:
        - link "Extra Components" [ref=e129] [cursor=pointer]:
          - /url: "#"
        - list:
          - listitem [ref=e145]:
            - link "Calendar" [ref=e146] [cursor=pointer]:
              - /url: /pages/extra-components/calendar
          - listitem [ref=e147]:
            - link "Drag & Drop" [ref=e148] [cursor=pointer]:
              - /url: /pages/extra-components/drag-drop
          - listitem [ref=e149]:
            - link "PDF Download" [ref=e150] [cursor=pointer]:
              - /url: /pages/extra-components/pdf-download
      - listitem [ref=e151]:
        - link "Charts" [ref=e152] [cursor=pointer]:
          - /url: "#"
        - list:
          - listitem [ref=e166]:
            - link "Echarts" [ref=e167] [cursor=pointer]:
              - /url: /pages/charts/echarts
      - listitem [ref=e168]:
        - link "Tables & Data" [ref=e169] [cursor=pointer]:
          - /url: "#"
        - list:
          - listitem [ref=e185]:
            - link "Smart Table" [ref=e186] [cursor=pointer]:
              - /url: /pages/tables/smart-table
          - listitem [ref=e187]:
            - link "Tree Grid" [ref=e188] [cursor=pointer]:
              - /url: /pages/tables/tree-grid
      - listitem [ref=e189]:
        - link "Auth" [ref=e190] [cursor=pointer]:
          - /url: "#"
        - list:
          - listitem [ref=e204]:
            - link "Login" [ref=e205] [cursor=pointer]:
              - /url: /auth/login
          - listitem [ref=e206]:
            - link "Register" [ref=e207] [cursor=pointer]:
              - /url: /auth/register
          - listitem [ref=e208]:
            - link "Request Password" [ref=e209] [cursor=pointer]:
              - /url: /auth/request-password
          - listitem [ref=e210]:
            - link "Reset Password" [ref=e211] [cursor=pointer]:
              - /url: /auth/reset-password
    - generic [ref=e212]:
      - generic [ref=e216]:
        - generic [ref=e219]:
          - generic [ref=e220]: Inline form
          - generic [ref=e222]:
            - textbox "Jane Doe" [ref=e223]
            - textbox "Email" [ref=e224]
            - generic [ref=e226]:
              - checkbox "Remember me" [ref=e227]
              - generic [ref=e229]: Remember me
            - button "Submit" [ref=e230] [cursor=pointer]
        - generic [ref=e231]:
          - generic [ref=e232]:
            - generic [ref=e233]:
              - generic [ref=e234]: Using the Grid
              - generic [ref=e236]:
                - generic [ref=e237]:
                  - generic [ref=e238]: Email
                  - textbox "Email" [ref=e240]
                - generic [ref=e241]:
                  - generic [ref=e242]: Password
                  - textbox "Password" [ref=e244]
                - generic [ref=e245]:
                  - generic [ref=e246]: Radios
                  - generic [ref=e248]:
                    - generic [ref=e250]:
                      - radio "Option 1" [ref=e251]
                      - generic [ref=e254]: Option 1
                    - generic [ref=e256]:
                      - radio "Option 2" [checked] [active] [ref=e257]
                      - generic [ref=e260]: Option 2
                    - generic [ref=e262]:
                      - radio "Disabled Option" [disabled] [ref=e263]
                      - generic [ref=e266]: Disabled Option
                - button "Sign in" [ref=e269] [cursor=pointer]
            - generic [ref=e270]:
              - generic [ref=e271]: Form without labels
              - generic [ref=e273]:
                - textbox "Recipients" [ref=e275]
                - textbox "Subject" [ref=e277]
                - textbox "Message" [ref=e279]
                - button "Send" [ref=e280] [cursor=pointer]
          - generic [ref=e281]:
            - generic [ref=e282]:
              - generic [ref=e283]: Basic form
              - generic [ref=e285]:
                - generic [ref=e286]:
                  - generic [ref=e287]: Email address
                  - textbox "Email address" [ref=e288]:
                    - /placeholder: Email
                - generic [ref=e289]:
                  - generic [ref=e290]: Password
                  - textbox "Password" [ref=e291]
                - generic [ref=e294]:
                  - checkbox "Check me out" [ref=e295]
                  - generic [ref=e297]: Check me out
                - button "Submit" [ref=e298] [cursor=pointer]
            - generic [ref=e299]:
              - generic [ref=e300]: Block form
              - generic [ref=e301]:
                - generic [ref=e302]:
                  - generic [ref=e304]:
                    - generic [ref=e305]: First Name
                    - textbox "First Name" [ref=e306]
                  - generic [ref=e308]:
                    - generic [ref=e309]: Last Name
                    - textbox "Last Name" [ref=e310]
                - generic [ref=e311]:
                  - generic [ref=e313]:
                    - generic [ref=e314]: Email
                    - textbox "Email" [ref=e315]
                  - generic [ref=e317]:
                    - generic [ref=e318]: Website
                    - textbox "Website" [ref=e319]
                - button "Submit" [ref=e320] [cursor=pointer]
        - generic [ref=e323]:
          - generic [ref=e324]: Horizontal form
          - generic [ref=e326]:
            - generic [ref=e327]:
              - generic [ref=e328]: Email
              - textbox "Email" [ref=e330]
            - generic [ref=e331]:
              - generic [ref=e332]: Password
              - textbox "Password" [ref=e334]
            - generic [ref=e339]:
              - checkbox "Remember me" [ref=e340]
              - generic [ref=e342]: Remember me
            - button "Sign in" [ref=e345] [cursor=pointer]
      - navigation [ref=e347]:
        - generic [ref=e348]:
          - generic [ref=e349]:
            - text: Created by
            - link "Akveo" [ref=e351] [cursor=pointer]:
              - /url: https://akveo.page.link/8V2f
            - text: . Modified by
            - link "Bondar Academy" [ref=e353] [cursor=pointer]:
              - /url: https://www.bondaracademy.com
            - text: .
          - generic [ref=e354]:
            - link "" [ref=e355] [cursor=pointer]:
              - /url: "#"
            - link "" [ref=e356] [cursor=pointer]:
              - /url: "#"
            - link "" [ref=e357] [cursor=pointer]:
              - /url: "#"
            - link "" [ref=e358] [cursor=pointer]:
              - /url: "#"
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 | 
  3 | test('visual testing', async ({ page }) => {
  4 |     await page.goto('https://playground.bondaracademy.com/pages/forms/layouts')
  5 |     const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'})
  6 |     await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true})
> 7 |     await expect(usingTheGridForm).toHaveScreenshot({ maxDiffPixelRatio: 0.1});
    |                                    ^ Error: expect(locator).toHaveScreenshot(expected) failed
  8 | });
```