import { test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { DashboardPage } from "../pages/dashboard.page";

test("Verify PIM and Add Employee navigation", async ({ page }) => {

    const loginpage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginpage.launchApplication();
    await loginpage.login();

    await dashboardPage.clickPIM();
    await dashboardPage.clickAddEmployee();

});