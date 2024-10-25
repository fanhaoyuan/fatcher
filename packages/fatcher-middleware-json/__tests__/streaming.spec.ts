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

    const streamingJson = await res.toJson();

    console.log(streamingJson);

    expect(streamingJson).toStrictEqual(result);
  });
});
