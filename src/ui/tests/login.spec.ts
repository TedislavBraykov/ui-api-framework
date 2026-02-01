import { test, expect } from '../fixtures/Fixtures';
import { users } from '../../data/users';

test.describe('Login - negative scenario', () => {
  test('should show error message for invalid credentials', async ({ loginPage }) => {
    await test.step('Attempt login with invalid credentials', async () => {
      await loginPage.login(users.invalidUser);
    });

    await test.step('Validate error message is displayed', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(
        'Username and password do not match'
      );
    });
  });
});
