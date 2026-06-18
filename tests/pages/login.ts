import { Page, expect, test, Locator } from "@playwright/test";

export default class Login{

    readonly loginField: Locator;

    constructor(page: Page) {
       // super(page);

        this.loginField = page.getByRole('textbox', { name: 'Username' });
    }

    async enterUsername(username: string) {
        await this.loginField.fill(username);
    }
    

}