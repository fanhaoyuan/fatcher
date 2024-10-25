import { beforeEach, describe, expect, it } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import { exception, fatcher, isFatcherError } from '../src';

describe('Fatcher Error Instance', () => {
  beforeEach(() => {
    fetchMock.mockIf(/^https:\/\/foo.bar\/get/, async request => {
      const [, queryString] = request.url.split('?');
      const params = new URLSearchParams(queryString);

      return {
        status: Number(params.get('code'))!,
      };
    });

    fetchMock.enableMocks();
  });

  afterEach(() => fetchMock.disableMocks());

  it('Normal Fetch is successful in out of 200-299', async () => {
    const res = await fatcher('https://foo.bar/get?code=500');
    expect(res.status).toBe(500);
  });

  it('Receive a fatcher error when response code is not 2xx', async () => {
    try {
      await fatcher('https://foo.bar/get?code=500', { middlewares: [exception()] });
    } catch (error) {
      if (isFatcherError(error)) {
        expect(error.snapshot.response.status).toBe(500);
      }
    }
  });

  it('successfully fetch with code 200', async () => {
    const response = await fatcher('https://foo.bar/get?code=200');
    expect(response.status).toBe(200);
  });
});
