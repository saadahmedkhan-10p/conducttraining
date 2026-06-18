import { test, expect } from "@playwright/test";

/*  Playwright Expect Assertion Reference Table
Assertion                          Description
────────────────────────────────────────────────────────────────────────
toBeVisible()                      Element is present and visible in DOM
toBeHidden()                       Element is hidden or not in DOM
toBeEnabled()                      Form field/button is not disabled
toBeDisabled()                     Form field/button is disabled
toBeChecked()                      Checkbox/radio is checked
toBeEmpty()                        Input has no value / element has no children
toHaveText("…")                    Element's inner text exactly matches
toContainText("…")                 Element's inner text contains the string
toHaveValue("…")                   Input/select has the given value
toHaveAttribute("attr", "value")   Element has the given attribute+value
toHaveClass("class-name")          Element has the given CSS class
toHaveCSS("property", "value")     Element has the computed CSS property
toHaveURL("…")                     Page URL matches (string or regex)
toHaveTitle("…")                   Page <title> matches (string or regex)
toHaveCount(n)                     Locator matches exactly n elements
not.toXxx()                        Negative version of any assertion above
*/

// ─────────────────────────────────────────────────────────────────────────────
// SITE: https://practicetestautomation.com/practice-test-login/
// ─────────────────────────────────────────────────────────────────────────────

test.describe("Validations", () => {

  // ── 1. VISIBILITY VALIDATIONS ────────────────────────────────────────────
  test("1 – toBeVisible / toBeHidden", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");

    // Positive: key elements are visible on page load
    await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Password" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit" })).toBeEnabled();

    // Negative: error message should NOT have the "show" class before any action
    // (The #error element exists in DOM but is only shown when it has class="show")
    await expect(page.locator("#error")).not.toHaveClass(/show/);
  });

  // ── 2. TEXT CONTENT VALIDATIONS ──────────────────────────────────────────
  test("2 – toHaveText / toContainText", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");

    // toHaveText — exact match of the element's trimmed text
    await expect(page.getByRole("button", { name: "Submit" })).toHaveText("Submit");

    // toContainText — partial match (useful when text is dynamic or long)
    await expect(page.locator("h2")).toContainText("Test");

    // After successful login, validate the success heading contains expected text
    await page.getByRole("textbox", { name: "Username" }).fill("student");
    await page.getByRole("textbox", { name: "Password" }).fill("Password123");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.locator("h1")).toContainText("Logged In Successfully");
    await expect(page.getByText("Logged in successfully")).toBeVisible();
  });

  // ── 3. URL & TITLE VALIDATIONS ───────────────────────────────────────────
  test("3 – toHaveURL / toHaveTitle", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");

    // toHaveTitle — matches the browser tab title (string or regex)
    // Actual title: "Test Login | Practice Test Automation"
    await expect(page).toHaveTitle(/Test Login/);

    // toHaveURL — validates current URL (string or regex)
    await expect(page).toHaveURL("https://practicetestautomation.com/practice-test-login/");

    // After login, URL should change to the logged-in page
    await page.getByRole("textbox", { name: "Username" }).fill("student");
    await page.getByRole("textbox", { name: "Password" }).fill("Password123");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page).toHaveURL(/practicetestautomation\.com\/logged-in-successfully/);
  });

  // ── 4. INPUT VALUE VALIDATIONS ───────────────────────────────────────────
  test("4 – toHaveValue / toBeEmpty", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");

    const usernameInput = page.getByRole("textbox", { name: "Username" });

    // toBeEmpty — input has no value before typing
    await expect(usernameInput).toBeEmpty();

    // toHaveValue — after filling, verify the exact value in the field
    await usernameInput.fill("student");
    await expect(usernameInput).toHaveValue("student");

    // Clear and confirm empty again
    await usernameInput.clear();
    await expect(usernameInput).toBeEmpty();
  });

  // ── 5. ATTRIBUTE VALIDATIONS ─────────────────────────────────────────────
  test("5 – toHaveAttribute", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");

    const usernameInput = page.getByRole("textbox", { name: "Username" });
    const passwordInput = page.getByRole("textbox", { name: "Password" });

    // Verify HTML attributes on form fields
    await expect(usernameInput).toHaveAttribute("type", "text");
    await expect(passwordInput).toHaveAttribute("type", "password");

    // Verify the Submit button id attribute (this button has no type attribute)
    await expect(page.getByRole("button", { name: "Submit" })).toHaveAttribute("id", "submit");
  });

  // ── 6. ENABLED / DISABLED VALIDATIONS ───────────────────────────────────
  test("6 – toBeEnabled / toBeDisabled", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");

    // All interactive elements should be enabled on page load
    await expect(page.getByRole("textbox", { name: "Username" })).toBeEnabled();
    await expect(page.getByRole("textbox", { name: "Password" })).toBeEnabled();
    await expect(page.getByRole("button", { name: "Submit" })).toBeEnabled();
  });

  // ── 7. ERROR MESSAGE VALIDATIONS (invalid credentials) ──────────────────
  test("7 – validate error messages on invalid login", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");

    // Wrong username
    await page.getByRole("textbox", { name: "Username" }).fill("wrongUser");
    await page.getByRole("textbox", { name: "Password" }).fill("Password123");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.locator("#error")).toBeVisible();
    await expect(page.locator("#error")).toContainText("Your username is invalid!");

    // Wrong password — reload first to reset state
    await page.reload();
    await page.getByRole("textbox", { name: "Username" }).fill("student");
    await page.getByRole("textbox", { name: "Password" }).fill("wrongPassword");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.locator("#error")).toBeVisible();
    await expect(page.locator("#error")).toContainText("Your password is invalid!");
  });

  // ── 8. ELEMENT COUNT VALIDATIONS ─────────────────────────────────────────
  test("8 – toHaveCount (TodoMVC)", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");

    const input = page.getByRole("textbox", { name: "What needs to be done?" });

    // Add three todo items
    await input.fill("Buy groceries");
    await page.keyboard.press("Enter");
    await input.fill("Write tests");
    await page.keyboard.press("Enter");
    await input.fill("Read docs");
    await page.keyboard.press("Enter");

    // toHaveCount — list should now have exactly 3 items
    await expect(page.locator(".todo-list li")).toHaveCount(3);

    // Complete one item, then filter by Active — expect 2 remaining
    await page.locator(".todo-list li").first().locator(".toggle").click();
    await page.getByRole("link", { name: "Active" }).click();
    await expect(page.locator(".todo-list li")).toHaveCount(2);

    // Switch to Completed — expect 1 item
    await page.getByRole("link", { name: "Completed" }).click();
    await expect(page.locator(".todo-list li")).toHaveCount(1);
  });

  // ── 9. NEGATIVE ASSERTIONS ───────────────────────────────────────────────
  test("9 – not.toXxx negative assertions", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");

    // Error message must NOT have the "show" class before interacting
    await expect(page.locator("#error")).not.toHaveClass(/show/);

    // The success text must NOT exist before login
    await expect(page.getByText("Logged In Successfully")).not.toBeVisible();

    // After successful login the error must NOT appear
    await page.getByRole("textbox", { name: "Username" }).fill("student");
    await page.getByRole("textbox", { name: "Password" }).fill("Password123");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.locator("#error")).not.toBeVisible();
    await expect(page.getByText("Logged In Successfully")).toBeVisible();
  });

  // ── 10. CSS VALIDATION ───────────────────────────────────────────────────
  test("10 – toHaveCSS", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");

    // After an invalid login, the error banner turns red — verify computed colour
    await page.getByRole("textbox", { name: "Username" }).fill("bad");
    await page.getByRole("textbox", { name: "Password" }).fill("bad");
    await page.getByRole("button", { name: "Submit" }).click();

    const errorBanner = page.locator("#error");
    await expect(errorBanner).toBeVisible();

    // toHaveCSS checks the *computed* style — useful for visual regressions
    await expect(errorBanner).toHaveCSS("background-color", "rgb(227, 72, 72)");
  });

});