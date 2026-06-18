import {Page, Locator} from '@playwright/test'

export default class LoginPage {

    readonly loginField: Locator;
    readonly passwordField: Locator;
    readonly submitButton: Locator;


    constructor(page: Page){

        this.loginField = page.getByRole('textbox', { name: 'Username' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
    }

    async enterUsername(username: string) {
        await this.loginField.fill(username);
    }
}