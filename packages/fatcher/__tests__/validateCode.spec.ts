import { afterEach, beforeEach, describe } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';

describe('Validate Code', () => {
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

  // it('Request successfully with code 10001', async () => {
  //   const res = await fatcher('https://foo.bar/get?code=10001', {
  //     middlewares: [
  //       exception({
  //         validateCode: code => code === 10001,
  //       }),
  //     ],
  //   });

  //   expect(res.status).toBe(10001);
  // });
});
