const { test, expect } = require('@playwright/test');
import { HomePage } from '../pages/HomePage';

test('Verify the Search conditions are set correctly.', async ({ page }) => {
  const homePage = new HomePage(page); 
  await homePage.goToHomePage();
  await expect(page).toHaveURL('https://jp.mercari.com/');  // Expect the URL to match "https://jp.mercari.com/"
  await homePage.createFirstSearchHistory()
  await homePage.verifyfirstCategoryResult("5") // Verify the dropdown has correct selected option using value i.e "72"
  await homePage.verifySecondCategoryResult("72") // Verify the dropdown has correct selected option using value i.e "72"
  expect(await page.locator("input[value='674']").isChecked()).toBeTruthy() // verifying that the checkbox is checked
});

test('Search conditions are set correctly from the latest browsing history', async ({ page }) => {
  const homePage = new HomePage(page); 
  await homePage.goToHomePage();
  await homePage.arrangeTheSearchHistoryOrder()
  await homePage.verifyBrowingHistory()
  await homePage.goToFirstCategory()
  await homePage.verifyfirstCategoryResult("5") // Verify the dropdown has correct selected option using value i.e "72"
  await homePage.verifySecondCategoryResult("72") // Verify the dropdown has correct selected option using value i.e "72"
  expect(await page.locator("input[value='674']").isChecked()).toBeTruthy() // verifying that the checkbox is checked
  await homePage.searchManuallyAndCountTheBrowingHistory()
});
