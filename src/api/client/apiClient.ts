import { APIRequestContext, request } from '@playwright/test';

export class ApiClient {
  private context!: APIRequestContext;

  async init(baseURL: string) {
    this.context = await request.newContext({ baseURL });
  }

  get(url: string) {
    return this.context.get(url);
  }

  post(url: string, body?: unknown) {
    return this.context.post(url, { data: body });
  }

  delete(url: string) {
    return this.context.delete(url);
  }
}
