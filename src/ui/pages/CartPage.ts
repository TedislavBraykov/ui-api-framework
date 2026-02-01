import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItemPrices = page.locator('.inventory_item_price');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
  
  // Returns an array of cart item prices as numbers
  async getItemPrices(): Promise<number[]> {
    const pricesText = await this.cartItemPrices.allTextContents();
    return pricesText.map(p => Number(p.replace('$', '')));
  }
}
