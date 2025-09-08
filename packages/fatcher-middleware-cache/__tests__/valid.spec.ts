import { fatcher } from 'fatcher';
import { cache } from '../src';
import { sleep } from './sleep';

let id = 0;

describe('Valid', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(async () => {
      return new Response(JSON.stringify({ responseTime: Math.random() }));
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Valid Cached out of ttl', async () => {
    const url = `https://foo.bar?id=${id++}`;
    const response = await fatcher(url, { ttl: 1000, middlewares: [cache] });
    const result = await response.json();

    await sleep(1000);

    const response1 = await fatcher(url, { middlewares: [cache] });
    const result1 = await response1.json();

    expect(result.responseTime === result1.responseTime).toBe(false);
  });
});
