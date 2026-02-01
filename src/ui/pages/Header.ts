import { Page, Locator } from '@playwright/test';


export class HeaderPage {
  readonly page: Page;
  readonly cartQuantity: Locator;
  readonly cartIcon: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.cartQuantity = page.locator('.shopping_cart_badge'); 
    this.cartIcon = page.locator('#shopping_cart_container');
  }
  
   getCartQuantity() {
    return this.cartQuantity;
  }
    async goToCart() {
    await this.cartIcon.click();
    }

}
