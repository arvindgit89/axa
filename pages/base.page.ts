import { Page } from "@playwright/test";
import config from '../config/config.json';


export class BaseClass {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

     async launchApplication() {
        await this.page.goto(config.baseUrl);
    }

    async getTitle() {
         return await this.page.title();
    }

    async waitForElement(selector: string) {
        await this.page.waitForSelector(selector);
    }
}