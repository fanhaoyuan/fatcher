import { describe, it } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import { defineMiddleware, fatcher } from '../src';

describe('Middleware Response Context', () => {
  beforeEach(() => {
    fetchMock.mockIf('https://foo.bar/get', async () => {
      return {};
    });

    fetchMock.enableMocks();
  });

  afterEach(() => fetchMock.disableMocks());

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
          // @ts-expect-error
          res['extraProps'] = extraProps;
          return res;
        }),
      ],
    });

    expect(response.status).toBe(200);
  });
});
