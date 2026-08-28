import { test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { DashboardPage } from "../pages/dashboard.page";
import { AddEmployeePage } from "../pages/addEmployee.page";


test("Add Employee Test", async({page})=>{

    const loginpage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const addEmployeePage = new AddEmployeePage(page);


    await loginpage.launchApplication();
    await loginpage.login();

    await dashboardPage.clickPIM();
    await dashboardPage.clickAddEmployee();

    await addEmployeePage.addEmployee();
    await addEmployeePage.verifyEmployeeCreated();

});