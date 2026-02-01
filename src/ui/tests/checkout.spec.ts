import { test, expect } from "../fixtures/Fixtures";
import { checkoutInfo } from "../../data/checkout";
import { users } from "../../data/users";

test.describe("Checkout - complete purchase flow", () => {
  test("complete checkout and validate total price", async ({
    loginPage,
    productsPage,
    headerPage,
    cartPage,
    checkoutDeliveryPage,
    checkoutOverviewPage,
  }) => {
    const itemsToAdd = 3;

    await test.step("Login as standard user", async () => {
      await loginPage.login(users.standardUser);
    });

    await test.step("Add products and validate cart quantity", async () => {
      await productsPage.addMultipleProductsToCart(itemsToAdd);
      await expect(headerPage.getCartQuantity()).toHaveText(
        String(itemsToAdd)
      );
    });

    const expectedItemsTotal = await test.step(
      "Capture cart item prices",
      async () => {
        await headerPage.goToCart();

        const prices = await cartPage.getItemPrices();
        expect(prices).toHaveLength(itemsToAdd);

        return prices.reduce((sum, price) => sum + price, 0);
      }
    );

    await test.step("Proceed to checkout", async () => {
      await cartPage.proceedToCheckout();
      await checkoutDeliveryPage.fillCheckoutInfo(checkoutInfo);
    });

    await test.step("Validate item total, tax, and final total", async () => {
      const itemTotal = await checkoutOverviewPage.getItemTotal();
      const tax = await checkoutOverviewPage.getTax();
      const total = await checkoutOverviewPage.getTotal();

      expect(itemTotal).toBeCloseTo(expectedItemsTotal, 2);
      expect(total).toBeCloseTo(itemTotal + tax, 2);
    });

    await test.step("Finish checkout", async () => {
      await checkoutOverviewPage.finishCheckout();
    });
  });
});
