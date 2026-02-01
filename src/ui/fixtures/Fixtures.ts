import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { HeaderPage } from '../pages/Header';
import { CartPage } from '../pages/CartPage';
import { CheckoutDeliveryPage } from '../pages/CheckoutDeliveryPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

// creating instances of page objects for use in tests

type Fixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  headerPage: HeaderPage;
  cartPage: CartPage;
  checkoutDeliveryPage: CheckoutDeliveryPage;
  checkoutOverviewPage: CheckoutOverviewPage; 
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await use(loginPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  headerPage: async ({ page }, use) => {
    const headerPage = new HeaderPage(page);
    await use(headerPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(new CartPage(page));
},

checkoutDeliveryPage: async ({ page }, use) => {
    const checkoutDeliveryPage = new CheckoutDeliveryPage(page);
    await use(new CheckoutDeliveryPage(page));
},

checkoutOverviewPage: async ({ page }, use) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await use(new CheckoutOverviewPage(page));
}
});

export { expect } from '@playwright/test';
