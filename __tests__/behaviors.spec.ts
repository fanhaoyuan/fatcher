import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { fatcher } from '../src';

const server = setupServer(
  http.get('https://foo.bar/get', async () => {
    return HttpResponse.json({});
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Request behavior with fetch', () => {
  it('[Success] Same behavior with fetch', async () => {
    const input = 'https://foo.bar/get';
    const res = await fatcher(input);
    const res1 = await fetch(input);

    expect(await res.json()).toStrictEqual(await res1.json());
  });

  it('[Fail] Same behavior with fetch', async () => {
    const input = '/get';
    let err, err1;
    try {
      await fatcher(input);
    } catch (error) {
      err = error;
    }

    try {
      await fetch(input);
    } catch (error) {
      err1 = error;
    }

    expect(err.message).toBe(err1.message);
  });
});
