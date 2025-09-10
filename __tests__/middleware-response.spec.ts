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

describe('Middleware Response Context', () => {
  it('Middleware can return extra context to prev middleware', async () => {
    const extraProps = 'extraProps';

    const response = await fatcher('https://foo.bar/get', {
      middlewares: [
        defineMiddleware(async (request, next) => {
          const res = await next();
          // @ts-expect-error
          expect(res.extraProps).toBe(extraProps);
          return res;
        }),
        defineMiddleware(async (request, next) => {
          const res = await next();
          res['extraProps'] = extraProps;
          return res;
        }),
      ],
    });

    expect(response.status).toBe(200);
  });
});
