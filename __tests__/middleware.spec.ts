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

describe('Middleware', () => {
  it('Middleware can call next lot of times, but get same response', async () => {
    const response = await fatcher('https://foo.bar/get', {
      middlewares: [
        defineMiddleware(async (req, next) => {
          const res1 = await next();
          const res2 = await next();

          expect(res1).toBe(res2);
          return res1;
        }),
      ],
    });

    expect(response.status).toBe(200);
  });
});
