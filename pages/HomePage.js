export class HomePage{
    /**
     * @param {*} page  fixture
     */
    constructor(page){
        this.page=page
        this.searchBar = 'data-testid=search-input';
    }

    // This method navigates user to the home page
    async goToHomePage(){
        await this.page.goto('https://jp.mercari.com/')
    }

    // This method performs click  action in which takes user to the final category verification page
    async searchTest(){
        await this.page.click(this.searchBar);  // Click on the home page search bar
        await this.page.getByRole('link', { name: 'カテゴリーからさがす' }).click(); // Click on the first option shown
        await this.page.getByRole('link', { name: '本・音楽・ゲーム' }).click(); // Click on the '本・音楽・ゲーム' category link
        await this.page.getByTestId('category-list').getByRole('link', { name: '本' }).click(); // Click on the '本' category link
        await this.page.getByRole('link', { name: 'コンピュータ/IT' }).click(); // Click on the 'コンピュータ/IT' category link
    }
}