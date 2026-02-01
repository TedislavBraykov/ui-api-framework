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
  test('successful login returns token', async () => {
    const response = await api.post('/auth/login', validUser);

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(body.token).not.toBe('');
  });

  // Get product and validate content
  test('get product and validate fields', async () => {
    const response = await api.get('/products/1');

    expect(response.status()).toBe(200);

    const product = await response.json();

    expect(product).toHaveProperty('id', 1);
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
    expect(product.price).toBeGreaterThan(0);
    expect(product).toHaveProperty('category');
  });

  // Create new cart
  test('create new cart with existing product', async () => {
    const response = await api.post('/carts', newCart);

    expect(response.status()).toBe(201);

    const cart = await response.json();

    expect(cart).toHaveProperty('id');
    expect(cart.products[0].productId).toBe(1);
    expect(cart.products[0].quantity).toBe(2);
  });

  // Delete a user
  test('delete user successfully', async () => {
    const response = await api.delete('/users/1');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
  });

  // Negative scenario 1 — invalid login
  test('login fails with invalid credentials', async () => {
    const response = await api.post('/auth/login', invalidUser);

    expect(response.status()).toBe(401);
  });

  // Negative scenario 2 — product not found
  test('get non-existing product returns 404', async () => {
    const response = await api.get('/products/%%');

    expect(response.status()).toBe(400);
  });

  // Testing product data schema validation with zod
  test('get product schema is valid', async () => {
    const response = await api.get('/products/1');
    const body = await response.json();

    const result = ProductSchema.safeParse(body);
    expect(result.success).toBe(true);
});

});
