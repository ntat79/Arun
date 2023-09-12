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
        this.browsingHistory = page.locator("//*[@data-testid='search-history']//a")
        this.searchButton = page.getByTestId('search-input').getByLabel('検索', { exact: true })
    }

    // This method navigates user to the home page
    async goToHomePage(){
        await this.page.goto('https://jp.mercari.com/')
    }

    // This method creates book/music category as a first search history
    async createFirstSearchHistory(){
        await this.page.click(this.searchBar);  // Click on the home page search bar
        await this.searchByCategoryLink.click(); // Click on the first option shown
        await this.booksMusicCategoryLink.click(); // Click on the '本・音楽・ゲーム' category link
        await this.page.getByTestId('category-list').getByRole('link', { name: '本' }).click(); // Click on the '本' category link
        await this.computerITCategoryLink.click(); // Click on the 'コンピュータ/IT' category link
    }

    // This method creates smartphone category as a second search history
    async createSecondSearchHistory(){
        await this.page.click(this.searchBar);  // Click on the home page search bar
        await this.searchByCategoryLink.click(); // Click on the first option shown
        await this.smartPhonesCameraApplicancesCategoryLink.click();
        await this.smartPhonesCategoryLink.click();
        await this.smartPhoneBodyCategoryLink.click();
    }

    // This method helps to keep the expected order of the browsing history
    async arrangeTheSearchHistoryOrder(){
        await this.createSecondSearchHistory();
        await this.goToHomePage();
        await this.createFirstSearchHistory();
    }

    // This method verifies browsing history order
    // 1st: コンピュータ/IT 
    // 2nd: スマートフォン本体
    async verifyBrowingHistory(){
        await expect(this.browsingHistory).toHaveCount(2);
        await expect(this.browsingHistory).toHaveText(['コンピュータ/IT', 'スマートフォン本体']);
        await this.page.pause();
        
    }

    async goToFirstCategory(){
        await this.page.getByPlaceholder('なにをお探しですか？').click()
        await this.browsingHistory.first().click();
    }

    async goToSecondCategory(){
        await this.page.click(this.searchBar);
        await this.firstBrowsingHistory.click();
    }

    /**
     * This method adds a new browing history and then verified the count of browser history
     * this method also verifies the order of the browsing history
     * @param {*} manual_search_text search item name
     */
    async searchManuallyAndCountTheBrowingHistory(manual_search_text){
        await this.page.getByPlaceholder('なにをお探しですか？').fill(manual_search_text); // search for item
        await this.searchButton.click()
        await this.goToHomePage() // Go to mercari home page
        await this.page.getByPlaceholder('なにをお探しですか？').click()
        await expect(this.browsingHistory).toHaveCount(3); // count of browser history shown
        // order of browing history
        await expect(this.browsingHistory).toHaveText(['javascript, コンピュータ/IT', 'コンピュータ/IT', 'スマートフォン本体']); 
    }

    /**
     * This method verified that the dropdown shows the correct category
     * @param {*} value Value is the index no from the dropdown
     */
    async verifyfirstCategoryResult(value){
        await expect(this.page.locator("(//*[@id='accordion_content']//select)[1]")).toHaveValue(value)
    }
    
    /**
     * This method verified that the dropdown shows the correct category
     * @param {*} value Value is the index no from the dropdown
     */
    async verifySecondCategoryResult(value){
        await expect(this.page.getByRole('combobox').nth(1)).toHaveValue(value)
    }
}