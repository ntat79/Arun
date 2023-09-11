// @ts-check
const { test, expect } = require('@playwright/test');
import { HomePage } from '../pages/HomePage';


test('Verify the Search conditions are set correctly.', async ({ page }) => {
  const homePage = new HomePage(page); 
  await homePage.goToHomePage();
  // Expect the URL to mathc "https://jp.mercari.com/"
  await expect(page).toHaveURL('https://jp.mercari.com/');
  await homePage.searchTest()

  const firstCategory = await page.locator("(//*[@id='accordion_content']//select)[1]")
  expect(await firstCategory.inputValue()).toBe("5") // Verify the dropdown has correct selected option using value i.e "5"

  const secondCategory = await page.locator("(//*[@id='accordion_content']//select)[2]")
  expect(await secondCategory.inputValue()).toBe("72") // Verify the dropdown has correct selected option using value i.e "72"

  expect(await page.locator("input[value='674']").isChecked()).toBeTruthy() // verifying that the checkbox is checked
});
