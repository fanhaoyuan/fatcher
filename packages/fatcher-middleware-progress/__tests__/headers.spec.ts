/* eslint-disable max-nested-callbacks */
import { describe } from '@jest/globals';
import { fatcher } from 'fatcher';
import { progress } from '../src';

describe('Response Headers', () => {
  const result = Array.from({ length: 10 }, () => Math.random().toString(36).slice(-6));

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Response(
        new ReadableStream({
          async start(controller) {
            for await (const chunk of result) {
              await new Promise(resolve => {
                setTimeout(() => {
                  controller.enqueue(Buffer.from(chunk));
                  resolve(chunk);
                }, 100 * Math.random());
              });
            }
            controller.close();
          },
        }),
        {
          headers: {},
        },
      );
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Never process callback when response content-length invalid', async () => {
    const response = await fatcher('https://foo.bar', {
      middlewares: [progress()],
      onDownloadProgress: () => {
        throw new Error('processed');
      },
    });
    expect(await response.text()).toBe(result.join(''));
  });
});
