import { Page, expect } from "@playwright/test";
import { BaseClass } from "./base.page";
import logindata from "../testData/loginData.json";

export class LoginPage extends BaseClass {

  constructor(page: Page) {
    super(page);
  }

    private usernameInput = 'input[name="username"]';
    private passwordInput = 'input[name="password"]';
    private loginButton = 'button[type="submit"]';

    async login() {

        await this.page.fill(this.usernameInput, logindata.loginid);
        await this.page.fill(this.passwordInput, logindata.password);
        await this.page.click(this.loginButton);
    }

    async verifyLoginSuccess() {
        await expect(this.page.locator("//h6[normalize-space()='Dashboard']")).toBeVisible();
    }
}