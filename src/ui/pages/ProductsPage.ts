import { Page, Locator } from "@playwright/test";

export class ProductsPage {
    readonly page: Page;
    readonly sortDropdown: Locator;
    readonly productNames: Locator;
    readonly addToCartButtons: Locator;
    readonly productCards: Locator;
    readonly cartBadge: Locator;

    constructor(page:Page){
        this.page = page;
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productNames = page.locator('.inventory_item_name');
        this.addToCartButtons = page.locator('button.btn_inventory'); 
        this.productCards = page.locator('.inventory_item'); 
        this.cartBadge = page.locator('.shopping_cart_badge'); 

    }

    async sortByNameZtoA(){
        await this.sortDropdown.selectOption('za');
}

    async getProductNames(): Promise<string[]> {
        return this.productNames.allTextContents();
    }

    // Adds the specified number of products to the cart, with validation
   async addMultipleProductsToCart(count: number) {
    if (count < 2) {
      throw new Error('Count must be at least 2');
    }

    const total = await this.productCards.count();

    if (count > total) {
      throw new Error(`Cannot add ${count} items, only ${total} available`);
    }

    for (let i = 0; i < count; i++) {
      await this.productCards
        .nth(i)
        .locator('button.btn_inventory')
        .click();
    }
  }

  getCartBadgeLocator() {
    return this.cartBadge;
  }

}