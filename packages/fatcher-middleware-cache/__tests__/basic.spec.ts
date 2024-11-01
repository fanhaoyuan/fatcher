import { fatcher } from 'fatcher';
import { cache } from '../src';

let id = 0;

describe('Basic', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(async () => {
      return new Response(JSON.stringify({ responseTime: Math.random() }));
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Ignore cache when ttl is not a number value', async () => {
    const url = `https://foo.bar?id=${id++}`;

    const response = await fatcher(url, { middlewares: [cache()] });
    const result = await response.json();

    const response1 = await fatcher(url, { middlewares: [cache()] });
    const result1 = await response1.json();

    expect(result.responseTime === result1.responseTime).toBe(false);
  });

  it('Cached With ttl options', async () => {
    const url = `https://foo.bar?id=${id++}`;

    const response = await fatcher(url, { ttl: 2000, middlewares: [cache()] });
    const result = await response.json();

    const response1 = await fatcher(url, { middlewares: [cache()] });
    const result1 = await response1.json();

    expect(result.responseTime === result1.responseTime).toBe(true);
  });

  it('Ignore Cached Response With flush options', async () => {
    const url = `https://foo.bar?id=${id++}`;

    const response = await fatcher(url, { ttl: 2000, middlewares: [cache()] });
    const result = await response.json();

    const response1 = await fatcher(url, { flush: true, middlewares: [cache()] });
    const result1 = await response1.json();

    expect(result.responseTime === result1.responseTime).toBe(false);
  });
});
