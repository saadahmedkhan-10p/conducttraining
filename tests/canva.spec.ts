import { test , expect } from "@playwright/test";

test.describe("Canva", () => {
  test("should allow users to create a design", async ({ page }) => {
    await page.goto("https://playwright-automation-practice-app.my.canva.site/");

    // The page content is rendered inside an iframe — use frameLocator to reach it
    const frame = page.frameLocator("iframe");

    // Verify the "Shop Now" button is visible before clicking
    const shopNowBtn = frame.getByRole("button", { name: "Shop Now" });
    await expect(shopNowBtn).toBeVisible();

    // Click the button and verify the products list is visible afterwards
    // force: true bypasses the sticky navbar/hero overlay that intercepts pointer events
    await shopNowBtn.click({ force: true });
    await expect(frame.getByRole("list", { name: "Products" })).toBeVisible();
  });
});