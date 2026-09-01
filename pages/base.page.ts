import { Page } from "@playwright/test";
import config from '../config/config.json';

export class BaseClass {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async launchApplication() {
        const environmentName = ((globalThis as any).process?.env?.ENVIRONMENT ?? config.defaultEnvironment ?? 'qa') as string;
        const environment = environmentName.toLowerCase();
        const selectedUrl = (config.environments as Record<string, string>)[environment] || config.baseUrl;

        await this.page.goto(selectedUrl);
    }

    async getTitle() {
        return await this.page.title();
    }

    async waitForElement(selector: string) {
        await this.page.waitForSelector(selector);
    }
}