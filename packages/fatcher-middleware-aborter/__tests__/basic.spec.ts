import { fatcher } from 'fatcher';
import { aborter, isAbortError } from '../src';
import { sleep } from './sleep';

describe('Basic', () => {
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

  it('Basic Using', async () => {
    const response = await fatcher('https://foo.bar', {
      onAbort: () => console.log('aborted'),
      middlewares: [aborter],
    });
    expect(response.body).toBe(null);
  });

  it('User cancelable', async () => {
    const abortController = new AbortController();
    fatcher('https://foo.bar', {
      abortController,
      onAbort: () => {
        expect(true).toBe(true);
      },
      middlewares: [aborter],
    }).catch(async error => {
      expect(isAbortError(error)).toBe(true);
    });

    abortController.abort();
    await sleep(1000);
  });
});
