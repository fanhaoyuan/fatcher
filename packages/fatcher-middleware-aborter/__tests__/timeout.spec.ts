import { fatcher } from 'fatcher';
import { aborter, isAbortError, timeout } from '../src';
import { sleep } from './sleep';

describe('Timeout', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(async (request: Request) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        request.signal.addEventListener('abort', () => {
          reject(new DOMException('Aborted', 'AbortError'));
        });

        await sleep(1000);
        resolve(new Response());
      });
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Basic using', async () => {
    const response = await fatcher('https://foo.bar', {
      timeout: 1500,
      middlewares: [aborter, timeout],
    });
    expect(response.body).toBe(null);
  });

  it('Abort on timeout', async () => {
    try {
      await fatcher('https://foo.bar', { timeout: 500, middlewares: [aborter, timeout] });
    } catch (error) {
      expect(isAbortError(error)).toBe(true);
    }
  });
});
