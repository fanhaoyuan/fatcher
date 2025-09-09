/* eslint-disable max-nested-callbacks */
import { describe } from '@jest/globals';
import { fatcher } from 'fatcher';
import { progress } from '../src';

describe('Basic', () => {
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
          headers: {
            'content-length': `${result.length * 6}`,
          },
        },
      );
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Basic Using', async () => {
    let i = 0;

    const response = await fatcher('https://foo.bar', {
      middlewares: [progress],
      onDownloadProgress: (current, total) => {
        expect(current).toBe(6 * (i + 1));
        expect(total).toBe(result.length * 6);
        i++;
      },
    });
    expect(await response.text()).toBe(result.join(''));
  });
});
