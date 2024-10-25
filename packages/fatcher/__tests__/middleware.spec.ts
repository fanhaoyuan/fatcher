import { describe, it } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import { defineMiddleware, fatcher } from '../src';

describe('Middleware', () => {
  beforeEach(() => {
    fetchMock.mockIf('https://foo.bar/get', async () => {
      return {};
    });

    fetchMock.enableMocks();
  });

  afterEach(() => fetchMock.disableMocks());

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
