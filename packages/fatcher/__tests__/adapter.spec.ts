import { describe, it } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import { defineMiddleware, fatcher } from '../src';

describe('Adapter', () => {
  beforeEach(() => {
    fetchMock.mockIf('https://foo.bar/get', async () => {
      return {};
    });

    fetchMock.enableMocks();
  });

  afterEach(() => fetchMock.disableMocks());

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
