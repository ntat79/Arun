exports.HomePage = class HomePage{
    constructor(page){
        this.page=page
        this.searchBar = 'data-testid=search-input';
        this.firstOption = "//p[contains(text(),'カテゴリーからさがす')]";
    }
    async goToHomePage(){
        await this.page.goto('https://jp.mercari.com/')
    }

    async searchTest(){
        await this.page.click(this.searchBar);
        await this.page.click(this.firstOption)
    }
}