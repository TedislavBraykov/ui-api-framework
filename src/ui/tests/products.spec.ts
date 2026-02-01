import { test, expect } from '../fixtures/Fixtures';
import { users } from '../../data/users';

test.describe('Products - sorting from Z-A', () => {
  test('@ui should sort products by name Z-A', async ({
    loginPage,
    productsPage
  }) => {
    await test.step('Login as standard user', async () => {
      await loginPage.login(users.standardUser);
    });

    await test.step('Sort products by name Z-A', async () => {
      await productsPage.sortByNameZtoA();
    });

    await test.step('Validate products are sorted correctly', async () => {
      const productNames = await productsPage.getProductNames();
      const expectedOrder = [...productNames].sort().reverse();

      expect(productNames).toEqual(expectedOrder);
    });
  });
});
