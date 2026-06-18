import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should allow users to log in with valid credentials', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');


    // Fill in the username and password fields
    await page.getByRole    

    //select button
    await page.getByRole('button', { name: 'Submit' }).click();
  });
});