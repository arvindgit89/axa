import { test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test("Login with valid credentials @smoke @regression",  async ({ page }) => {
  const loginpage = new LoginPage(page);
  await loginpage.launchApplication();
  await loginpage.login();
  await loginpage.verifyLoginSuccess();
  
});
