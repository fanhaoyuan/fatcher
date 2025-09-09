import { fatcher } from 'fatcher';
import { cache } from '../src';

let id = 0;

describe('Method', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(async () => {
      return new Response(JSON.stringify({ responseTime: Math.random() }));
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Cached Response with GET', async () => {
    const url = `https://foo.bar?id=${id++}`;
    const response = await fatcher(url, { ttl: 2000, middlewares: [cache] });
    const result = await response.json();

    const response1 = await fatcher(url, { middlewares: [cache] });
    const result1 = await response1.json();

    expect(result.responseTime === result1.responseTime).toBe(true);
  });

  it('Will not cache with POST', async () => {
    const url = `https://foo.bar?id=${id++}`;
    const response = await fatcher(url, { ttl: 2000, middlewares: [cache], method: 'POST' });
    const result = await response.json();

    const response1 = await fatcher(url, { middlewares: [cache], method: 'POST' });
    const result1 = await response1.json();

    expect(result.responseTime === result1.responseTime).toBe(false);
  });

  it('Will not cache with PUT', async () => {
    const url = `https://foo.bar?id=${id++}`;
    const response = await fatcher(url, { ttl: 2000, middlewares: [cache], method: 'PUT' });
    const result = await response.json();

    const response1 = await fatcher(url, { middlewares: [cache], method: 'PUT' });
    const result1 = await response1.json();

    expect(result.responseTime === result1.responseTime).toBe(false);
  });

  it('Will not cache with DELETE', async () => {
    const url = `https://foo.bar?id=${id++}`;

    const response = await fatcher(url, { ttl: 2000, middlewares: [cache], method: 'DELETE' });
    const result = await response.json();

    const response1 = await fatcher(url, { middlewares: [cache], method: 'DELETE' });
    const result1 = await response1.json();

    expect(result.responseTime === result1.responseTime).toBe(false);
  });

  it('Will not cache with HEAD', async () => {
    const url = `https://foo.bar?id=${id++}`;
    const response = await fatcher(url, { ttl: 2000, middlewares: [cache], method: 'HEAD' });
    const result = await response.json();

    const response1 = await fatcher(url, { middlewares: [cache], method: 'HEAD' });
    const result1 = await response1.json();

    expect(result.responseTime === result1.responseTime).toBe(false);
  });
});
