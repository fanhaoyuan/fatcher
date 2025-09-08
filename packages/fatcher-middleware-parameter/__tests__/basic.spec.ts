import { describe, it } from '@jest/globals';
import { fatcher } from 'fatcher';
import { parameters } from '../src';

describe('Basic Usage', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((request: Request) => {
      const [, querystring] = request.url.split('?');
      return new Response(querystring ?? null);
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Base', async () => {
    const response = await fatcher('https://foo.bar', {
      params: {
        foo: 'bar',
      },
      middlewares: [parameters],
    });

    const result = await response.text();
    expect(result).toBe('foo=bar');
  });

  it('Merge Origin Querystring', async () => {
    const response = await fatcher('https://foo.bar?count=1', {
      params: {
        foo: 'bar',
      },
      middlewares: [parameters],
    });

    const result = await response.text();
    expect(result).toBe('foo=bar&count=1');
  });

  it('Cover Same Name Params', async () => {
    const response = await fatcher('https://foo.bar?foo=count', {
      params: {
        foo: 'bar',
      },
      middlewares: [parameters],
    });

    const result = await response.text();
    expect(result).toBe('foo=bar');
  });

  it('Do nothing when params is empty', async () => {
    const response = await fatcher('https://foo.bar', {
      middlewares: [parameters],
    });

    expect(response.body).toBe(null);
  });
});
