import { describe, expect, it } from '@jest/globals';
import { fatcher } from 'fatcher';
import { json } from '../src';

describe('fatcher-middleware-json', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((request: Request) => {
      if (request.url === 'https://foo.bar/get') {
        return new Response();
      }

      if (request.url === 'https://foo.bar/non-json') {
        return new Response('non-json');
      }
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Provide a json read function', async () => {
    const res = await fatcher('https://foo.bar/get', {
      middlewares: [json()],
    });

    expect(typeof res.readStreamAsJson).toEqual('function');
  });

  it('Return null with empty body', async () => {
    const res = await fatcher('https://foo.bar/get', {
      middlewares: [json()],
    });

    expect(await res.readStreamAsJson()).toBe(null);
  });

  it('Return null with used body', async () => {
    const res = await fatcher('https://foo.bar/get', {
      middlewares: [
        json(),
        async (req, next) => {
          const response = await next();
          await response.text();
          return response;
        },
      ],
    });

    expect(await res.readStreamAsJson()).toBe(null);
  });

  it('Return null with non-json data', async () => {
    const res = await fatcher('https://foo.bar/non-json', {
      middlewares: [json()],
    });

    expect(await res.readStreamAsJson()).toBe(null);
  });
});
