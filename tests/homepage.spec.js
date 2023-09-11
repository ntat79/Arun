// @ts-check
const { test, expect } = require('@playwright/test');
import { HomePage } from '../pages/HomePage';


test('has title', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goToHomePage();
  // Expect a title "to contain" a substring.
  await expect(page).toHaveURL('https://jp.mercari.com/');
  await homePage.searchTest()
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
