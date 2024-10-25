import { describe, it } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import { defineMiddleware, fatcher } from '../src';

describe('Middleware Request Context', () => {
  beforeEach(() => {
    fetchMock.mockIf('https://foo.bar/get', async () => {
      return {};
    });

    fetchMock.enableMocks();
  });

  afterEach(() => fetchMock.disableMocks());

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
