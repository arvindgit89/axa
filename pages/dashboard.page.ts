import { Page, expect } from "@playwright/test";
import { BaseClass } from "./base.page";

export class DashboardPage extends BaseClass {

    constructor(page: Page) {
        super(page);
    }

    async clickPIM() {
        const pimClick = this.page.getByRole("link", { name: "PIM" });

        await expect(pimClick).toBeVisible();
        await pimClick.click();
    }

    async clickAddEmployee() {
        const addEmp = this.page.getByRole("link", { name: "Add Employee" });
        await expect(addEmp).toBeVisible();
        await addEmp.click();
    }
}