const { expect } = require('@playwright/test');

export class HomePage{
    /**
     * @param {*} page  fixture
     */
    constructor(page){
        this.page=page
        this.searchBar = 'data-testid=search-input';
        this.searchByCategoryLink = page.locator('a').filter({ hasText: 'カテゴリーからさがす' });
        this.booksMusicCategoryLink = page.locator('a').filter({ hasText: '本・音楽・ゲーム' });
        this.computerITCategoryLink = page.locator('a').filter( { hasText: 'コンピュータ/IT' });
        this.smartPhonesCameraApplicancesCategoryLink = page.locator('a').filter( { hasText: '家電・スマホ・カメラ' });
        this.smartPhoneBodyCategoryLink = page.locator('a').filter( { hasText: 'スマートフォン本体' });
        this.browsingHistory = page.locator("//*[@data-testid='search-history']//a");
        this.searchButton = page.getByTestId('search-input').getByLabel('検索', { exact: true })
        this.firstCategory= page.locator("xpath=(//*[@id='accordion_content']//select)[1]")
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
        await expect(this.page).toHaveURL('https://jp.mercari.com/search?category_id=674');
    }

    // This method creates smartphone category as a second search history
    async createSecondSearchHistory(){
        await this.page.click(this.searchBar);  // Click on the home page search bar
        await this.searchByCategoryLink.click(); // Click on the first option shown
        await this.smartPhonesCameraApplicancesCategoryLink.click();
        await this.page.getByTestId('category-list').getByRole('link', { name: 'スマートフォン/携帯電話' }).click(); // Click on the 'スマートフォン/携帯電話' category link
        await this.smartPhoneBodyCategoryLink.click();
        await expect(this.page).toHaveURL('https://jp.mercari.com/search?category_id=859');
    }

    // This method helps to keep the expected order of the browsing history
    async arrangeTheSearchHistoryOrder(){
        await this.createSecondSearchHistory();
        await this.goToHomePage();
        await this.createFirstSearchHistory();
    }

    async goToFirstCategory(){
        await this.page.getByPlaceholder('なにをお探しですか？').click()
        await this.browsingHistory.first().click();
        await expect(this.page).toHaveURL('https://jp.mercari.com/search?category_id=674');
    }

    async goToSecondCategory(){
        await this.page.click(this.searchBar);
        await this.firstBrowsingHistory.click();
        await expect(this.page).toHaveURL('https://jp.mercari.com/search?category_id=859');
    }

    /**
     * This method adds a new browing history
     * @param {*} manual_search_text search item name
     */
    async searchManuallyAndCountTheBrowingHistory(manual_search_text){
        await this.page.getByPlaceholder('なにをお探しですか？').fill(manual_search_text); // search for item
        await this.searchButton.click()
        await this.goToHomePage() // Go to mercari home page
        await this.page.getByPlaceholder('なにをお探しですか？').click()
    }
}