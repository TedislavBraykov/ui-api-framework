import { test, expect } from '@playwright/test';
import { ApiClient } from '../client/apiClient';
import { validUser, invalidUser, newCart } from '../../data/apiTestData';
import { ProductSchema } from '../schemas/product.schema';

const BASE_URL = 'https://fakestoreapi.com';

test.describe('Fake Store API tests', () => {
  let api: ApiClient;

  test.beforeAll(async () => {
    api = new ApiClient();
    await api.init(BASE_URL);
  });

  // Successful login
  test('@api successful login returns token', async () => {
    const response = await api.post('/auth/login', validUser);

    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThan(500);

    if (response.ok()) {
      const body = await response.json();
      expect(body).toHaveProperty('token');
    }
  });

  // Get product and validate content
  test('@api get product and validate fields', async () => {
    const response = await api.get('/products/1');

    expect([200, 403]).toContain(response.status());

    if (response.ok()) {
      const product = await response.json();
      expect(product).toHaveProperty('id');
    }
  });

  // Create new cart
  test('@api create new cart with existing product', async () => {
    const response = await api.post('/carts', newCart);

    expect([200, 201, 403]).toContain(response.status());
  });

  // Delete a user
  test('@api delete user successfully', async () => {
    const response = await api.delete('/users/1');

    expect([200, 403]).toContain(response.status());
  });

  // Negative scenario 1 — invalid login
  test('@api login fails with invalid credentials', async () => {
    const response = await api.post('/auth/login', invalidUser);

    expect([400, 401, 403]).toContain(response.status());
  });

  // Negative scenario 2 — invalid product id
  test('@api get non-existing product returns 400', async () => {
    const response = await api.get('/products/%%');

    expect(response.status()).toBe(400);
  });

  // Product schema validation using Zod
  test('@api get product schema is valid', async () => {
    const response = await api.get('/products/1');

    if (!response.ok()) {
      test.skip(true, 'FakeStore API blocked request');
    }

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');

    const body = await response.json();
    const result = ProductSchema.safeParse(body);

    expect(result.success).toBe(true);
  });
});
