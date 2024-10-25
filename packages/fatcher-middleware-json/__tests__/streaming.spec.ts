import { describe, expect, it } from '@jest/globals';
import { fatcher } from 'fatcher';
import { json } from '../src';

describe('fatcher-middleware-json', () => {
  const result = {
    key: 'test',
  };

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((request: Request) => {
      if (request.url === 'https://foo.bar/get') {
        return new Response(JSON.stringify(result));
      }
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Response json with json data', async () => {
    const res = await fatcher('https://foo.bar/get', {
      middlewares: [json()],
    });

    const streamingJson = await res.readStreamAsJson();
    expect(streamingJson).toStrictEqual(result);
  });

  it('Read string data with chunk', async () => {
    const res = await fatcher('https://foo.bar/get', {
      middlewares: [json()],
    });

    const streamingJson = await res.readStreamAsJson((string, buffer) => {
      expect(typeof string).toBe('string');
      expect(buffer instanceof Uint8Array).toBe(true);
    });

    expect(streamingJson).toStrictEqual(result);
  });
});
