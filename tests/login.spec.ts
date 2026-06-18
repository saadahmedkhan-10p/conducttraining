import { test, expect } from '@playwright/test';
import LoginPage from '../pages1/login1.ts'

test.describe('Login', () => {
    test('should allow users to log in with valid credentials', async ({ page }) => {
        await page.goto('https://practicetestautomation.com/practice-test-login/');

        // Fill in the username and password fields
        await page.getByRole('textbox', { name: 'Username' }).fill('student');
        await page.getByRole('textbox', { name: 'Password' }).fill('Password123');

        // Click the submit button
        await page.getByRole('button', { name: 'Submit' });

        //==============================================================================================
        
     //   await page.goto('https://practicetestautomation.com/practice-test-login/');
        
       // const loginPage = new LoginPage(page);

       // await loginPage.enterUsername('student');

       // await expect(page.getByText('You have successfully logged in!')).toBeVisible();



    });
});