import { Page, expect } from "@playwright/test";
import { BaseClass } from "./base.page";

export class AddEmployeePage extends BaseClass {
  private firstName = this.page.locator("input[name='firstName']");
  private middleName = this.page.getByPlaceholder("Middle Name");
  private lastName = this.page.locator("input.orangehrm-lastname");
  private employeeId = this.page.locator("input.oxd-input").nth(4);
  private uploadImage = this.page.locator("input[type='file']");
  private saveButton = this.page.getByRole("button", { name: "Save" });

  constructor(page: Page) {
    super(page);
  }

  async addEmployee() {
    await this.firstName.fill("arvind");
    await expect(this.firstName).toHaveValue("arvind");

    await this.middleName.fill("kumar");
    await expect(this.middleName).toHaveValue("kumar");

    await this.lastName.fill("sharma");
    await expect(this.lastName).toHaveValue("sharma");

   const empId = await this.employeeId.inputValue();
    console.log("Employee Id:", empId); 

    await this.uploadImage.setInputFiles("testData/aks.jpeg");

    await this.saveButton.click();
  }

  async verifyEmployeeCreated() {
    await expect(this.page.locator("h6.orangehrm-main-title")).toBeVisible();
    const mainTitle = await this.page.locator("h6.orangehrm-main-title").textContent();
    console.log("Main Title", mainTitle);
  }
}
