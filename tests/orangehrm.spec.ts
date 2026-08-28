import {test, expect} from  '@playwright/test';
import hrmdata from '../testData/tcs.json';

test("orangehrm login test", async ({page})=>{

    await page.goto("https://www.google.com/?zx=1787643871110");
    const firstname1 = page.locator('.gLFyf');
    await firstname1.fill(hrmdata.firstname + hrmdata.lastname);

    await firstname1.waitFor();
    await firstname1.press('Enter');
    console.log("Updated Arvind");
    console.log("prit Arvind");

   
})