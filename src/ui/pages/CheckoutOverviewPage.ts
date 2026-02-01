import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async getItemTotal(): Promise<number> {
    const text = await this.itemTotal.textContent();
    return Number(text!.replace('Item total: $', ''));
  }

  async getTax(): Promise<number> {
    const text = await this.tax.textContent();
    return Number(text!.replace('Tax: $', ''));
  }

  async getTotal(): Promise<number> {
    const text = await this.total.textContent();
    return Number(text!.replace('Total: $', ''));
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}
