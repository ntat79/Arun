const { test, expect } = require('@playwright/test');
import { HomePage } from '../pages/HomePage';

test('Verify the Search conditions are set correctly.', async ({ page }) => {
  const homePage = new HomePage(page); 
  await homePage.goToHomePage();
  await expect(page).toHaveURL('https://jp.mercari.com/');  // Expect the URL to match "https://jp.mercari.com/"
  await homePage.createFirstSearchHistory()
  await expect(homePage.firstCategory).toHaveValue("5") //Verify the dropdown shows correct selected option using value
  await expect(page.getByRole('combobox').nth(1)).toHaveValue("72") // Verify the dropdown has correct selected option using value
  expect(await page.locator("input[value='674']").isChecked()).toBeTruthy() // verifying that the checkbox is checked
});

test('Search conditions are set correctly from the latest browsing history', async ({ page }) => {
  const homePage = new HomePage(page); 
  await homePage.goToHomePage();
  await homePage.arrangeTheSearchHistoryOrder()
  await expect(homePage.browsingHistory).toHaveCount(2);
  await expect(homePage.browsingHistory).toHaveText(['コンピュータ/IT', 'スマートフォン本体'])
  await homePage.goToFirstCategory()
  await expect(homePage.firstCategory).toHaveValue("5") // Verify the dropdown has correct selected option using value
  await expect(page.getByRole('combobox').nth(1)).toHaveValue("72")  // Verify the dropdown has correct selected option using value
  expect(await page.locator("input[value='674']").isChecked()).toBeTruthy() // verifying that the checkbox is checked
  await homePage.searchManuallyAndCountTheBrowingHistory('javascript')
  await expect(homePage.browsingHistory).toHaveCount(3); // count of browser history shown
  await expect(homePage.browsingHistory).toHaveText(['javascript, コンピュータ/IT', 'コンピュータ/IT', 'スマートフォン本体']); // order of browing history
});
