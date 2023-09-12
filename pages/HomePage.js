const { expect } = require('@playwright/test');

export class HomePage{
    /**
     * @param {*} page  fixture
     */
    constructor(page){
        this.page=page
        this.searchBar = 'data-testid=search-input';
        this.searchByCategoryLink = page.locator('a', { hasText: 'カテゴリーからさがす' });
        this.booksMusicCategoryLink = page.locator('a', { hasText: '本・音楽・ゲーム' });
        this.computerITCategoryLink = page.locator('a', { hasText: 'コンピュータ/IT' });
        this.smartPhonesCameraApplicancesCategoryLink = page.locator('a', { hasText: '家電・スマホ・カメラ' });
        this.smartPhonesCategoryLink = page.locator('a', { hasText: 'スマートフォン/携帯電話' }); 
        this.smartPhoneBodyCategoryLink = page.locator('a', { hasText: 'スマートフォン本体' });
        this.browsingHistory = page.locator("//section[@data-testid='search-history']//a")
        this.searchButton = page.getByTestId('search-input').getByLabel('検索', { exact: true })
    }

    // This method navigates user to the home page
    async goToHomePage(){
        await this.page.goto('https://jp.mercari.com/')
    }

    // This method performs click  action in which takes user to the books category verification page
    async createFirstSearchHistory(){
        await this.page.click(this.searchBar);  // Click on the home page search bar
        await this.searchByCategoryLink.click(); // Click on the first option shown
        await this.booksMusicCategoryLink.click(); // Click on the '本・音楽・ゲーム' category link
        await this.page.getByTestId('category-list').getByRole('link', { name: '本' }).click(); // Click on the '本' category link
        await this.computerITCategoryLink.click(); // Click on the 'コンピュータ/IT' category link
    }

    // This method performs click  action in which takes user to the smartphone category verification page
    async createSecondSearchHistory(){
        await this.page.click(this.searchBar);  // Click on the home page search bar
        await this.searchByCategoryLink.click(); // Click on the first option shown
        await this.smartPhonesCameraApplicancesCategoryLink.click();
        await this.smartPhonesCategoryLink.click();
        await this.smartPhoneBodyCategoryLink.click();
    }

    async arrangeTheSearchHistoryOrder(){
        await this.createSecondSearchHistory();
        await this.goToHomePage();
        await this.createFirstSearchHistory();
    }

    async verifyBrowingHistory(){
        await expect(this.browsingHistory).toHaveCount(2);
        await expect(this.browsingHistory).toHaveText(['コンピュータ/IT', 'スマートフォン本体']);
    }

    async goToFirstCategory(){
        await this.page.click(this.searchBar);
        await this.browsingHistory.first().click();
    }

    async goToSecondCategory(){
        await this.page.click(this.searchBar);
        await this.firstBrowsingHistory.click();
    }

    async searchManuallyAndCountTheBrowingHistory(){
        await this.page.getByPlaceholder('なにをお探しですか？').fill('javascript');
        await this.searchButton.click()
        await this.goToHomePage()
        await this.page.getByPlaceholder('なにをお探しですか？').click()
        await expect(this.browsingHistory).toHaveCount(3);
        await expect(this.browsingHistory).toHaveText(['javascript, コンピュータ/IT', 'コンピュータ/IT', 'スマートフォン本体']);
    }

    async verifyfirstCategoryResult(value){
        await expect(this.page.locator("(//*[@id='accordion_content']//select)[1]")).toHaveValue(value)
    }

    async verifySecondCategoryResult(value){
        await expect(this.page.getByRole('combobox').nth(1)).toHaveValue(value)
    }
}