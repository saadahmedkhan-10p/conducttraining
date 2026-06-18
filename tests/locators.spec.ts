import { test, expect } from "@playwright/test";

test.describe("Locators", () => {
  test("should locate elements using different sstrategies", async ({
    page,
  }) => {
    await page.goto("https://demo.playwright.dev/todomvc");

    /*The Locator Priority Pyramid!
Locator Priority (Best to Worst)
•	1st Choice: getByRole() — most semantic, most stable
•	2nd Choice: getByLabel() — great for form inputs
•	3rd Choice: getByPlaceholder() — for inputs without labels
•	4th Choice: getByText() — for buttons with unique text
•	5th Choice: getByTestId() — when devs add data-testid attributes
•	6th Choice: locator(css/xpath) — last resort only*/

    // 1. By role — PREFERRED
    const newTodoInput = page.getByRole("textbox", {
      name: "What needs to be done?",
    });

    // 2. By placeholder
    const input2 = page.getByPlaceholder("What needs to be done?");

    // 3. By text
    const heading = page.getByText("todos");

    // 4. By test ID — add data-testid='submit' in your app
    // const btn = page.getByTestId('submit-btn');

    // 5. CSS selector — last resort
    const todoList = page.locator("#");

    // 6. XPath — only when nothing else works
    const h1 = page.locator("xpath=//h1");

    // 7. Chaining locators — find within a container
    const firstTodo = page.locator(".todo-list li").getByRole('button').first();

    // 8. Filtering locators
    const activeTodos = page
      .locator(".todo-list li")
      .filter({ hasText: /active/ });

    await newTodoInput.fill("Test locators");
    await page.keyboard.press("Enter");
    await expect(page.getByText("Test locators")).toBeVisible();
  });
});
