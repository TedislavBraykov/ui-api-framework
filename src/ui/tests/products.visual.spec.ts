import { test } from '../fixtures/Fixtures';
import percySnapshot from '@percy/playwright';
import { users } from '../../data/users';

test.describe('Products visual tests', () => {
  test('@visual products page visual snapshot', async ({ loginPage, productsPage }) => {
    await test.step('Login as standard user', async () => {
      await loginPage.login(users.standardUser);
    });
    
  // Running visual snapshot after login
    await test.step('Capture Percy snapshot', async () => {
      await percySnapshot(productsPage.page, 'Products Page');
    });
  });
});
