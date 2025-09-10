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

describe('Middleware Request Context', () => {
  it('Middleware can pass extra context to next middleware', async () => {
    const extraProps = 'extraProps';

    const response = await fatcher('https://foo.bar/get', {
      middlewares: [
        defineMiddleware(async (request, next) => {
          return next({
            // @ts-expect-error
            extraProps,
          });
        }),

        defineMiddleware(async (request, next) => {
          // @ts-expect-error
          expect(request.extraProps).toBe(extraProps);
          return next();
        }),
      ],
    });

    expect(response.status).toBe(200);
  });
});
