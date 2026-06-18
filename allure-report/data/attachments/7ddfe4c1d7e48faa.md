# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: canva.spec.ts >> Canva >> should allow users to create a design
- Location: tests\canva.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('iframe').contentFrame().getByRole('button', { name: 'Shop Now' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('iframe').contentFrame().getByRole('button', { name: 'Shop Now' })

```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e7]:
    - iframe [ref=e26]:
      
    - generic [ref=e29]:
      - button "Terms & Support" [ref=e30]
      - button "Privacy Policy" [ref=e31]
      - link "Designed with Canva" [ref=e32] [cursor=pointer]:
        - /url: https://www.canva.com
        - img [ref=e34]
        - text: Designed with
        - img [ref=e55]
```

# Test source

```ts
  1  | import { test , expect } from "@playwright/test";
  2  | 
  3  | test.describe("Canva", () => {
  4  |   test("should allow users to create a design", async ({ page }) => {
  5  |     await page.goto("https://playwright-automation-practice-app.my.canva.site/");
  6  | 
  7  |     // The page content is rendered inside an iframe — use frameLocator to reach it
  8  |     const frame = page.frameLocator("iframe");
  9  | 
  10 |     // Verify the "Shop Now" button is visible before clicking
  11 |     const shopNowBtn = frame.getByRole("button", { name: "Shop Now" });
> 12 |     await expect(shopNowBtn).toBeVisible();
     |                              ^ Error: expect(locator).toBeVisible() failed
  13 | 
  14 |     // Click the button and verify the products list is visible afterwards
  15 |     // force: true bypasses the sticky navbar/hero overlay that intercepts pointer events
  16 |     await shopNowBtn.click({ force: true });
  17 |     await expect(frame.getByRole("list", { name: "Products" })).toBeVisible();
  18 |   });
  19 | });
```