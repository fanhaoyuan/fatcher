import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { defineMiddleware, fatcher } from '../src';

const server = setupServer(
  http.get('https://foo.bar/get', async () => {
    return HttpResponse.json({});
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Adapter', () => {
  it('Middleware can be an new adapter', async () => {
    const name = 'New Adapter';

    const response = await fatcher('https://foo.bar/get', {
      middlewares: [
        defineMiddleware(async () => {
          return new Response(name);
        }),
      ],
    });

    expect(response.status).toBe(200);
    expect(await response.text()).toBe(name);
  });
});
