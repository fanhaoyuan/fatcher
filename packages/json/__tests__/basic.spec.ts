import { fatcher } from 'fatcher';
import fetchMock from 'jest-fetch-mock';
import { json } from '../src';

describe('Json', () => {
    const BASE_URL = 'https://virual.com';

    const jsonData = {
        date: `${Date.now()}`,
        id: 'json_test',
    };

    beforeEach(() => {
        fetchMock.mockIf(new RegExp(`${BASE_URL}/.*`), async request => {
            if (request.url === `${BASE_URL}/getJson`) {
                return {
                    body: JSON.stringify(jsonData),
                };
            }

            if (request.url === `${BASE_URL}/getString`) {
                return {
                    body: 'getString',
                };
            }

            return {
                status: 404,
            };
        });

        fetchMock.enableMocks();
    });

    it('basic', async () => {
        const result = await fatcher({
            url: `${BASE_URL}/getJson`,
            middlewares: [json()],
        });

        expect(result.data).toStrictEqual(jsonData);
    });

    it('not used', async () => {
        const result = await fatcher({
            url: `${BASE_URL}/getJson`,
            middlewares: [],
        });

        /**
         * Fetch mock will return an buffer, not a ReadableStream
         */
        expect(result.data instanceof Buffer).toBe(true);
    });

    it('Does not convert data that is not JSON', async () => {
        const result = await fatcher({
            url: `${BASE_URL}/getString`,
            middlewares: [json()],
        });

        expect(result.data instanceof Buffer).toBe(true);
        expect(result.data.toString()).toBe('getString');
    });

    afterEach(() => fetchMock.disableMocks());
});
