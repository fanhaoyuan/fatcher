import fetchMock from 'jest-fetch-mock';
import { BASE_URL } from './utils';
import { fatcher, isFatcherError } from '../src';

describe('Validate Code', () => {
    beforeEach(() => {
        fetchMock.mockIf(new RegExp(`${BASE_URL}/.*`), async request => {
            const [, queryString] = request.url.split('?');

            const params = new URLSearchParams(queryString);

            return {
                // eslint-disable-next-line no-implicit-coercion
                status: +params.get('status')!,
                statusText: 'Custom Status Text',
            };
        });

        fetchMock.enableMocks();
    });

    it('With Custom Validate Code and validate status code', async () => {
        const res = await fatcher({
            baseUrl: BASE_URL,
            url: '/get',
            params: {
                status: '1001',
            },
            validateCode(statusCode) {
                return statusCode === 1001;
            },
        });

        expect(res.status).toBe(1001);
    });

    it('With Custom Validate Code and invalid status code', async () => {
        try {
            await fatcher({
                baseUrl: BASE_URL,
                url: '/get',
                params: {
                    status: '200',
                },
                validateCode(statusCode) {
                    return statusCode === 1001;
                },
            });
        } catch (error: any) {
            expect(isFatcherError(error)).toBe(true);
            expect(error.toJSON().status).toBe(200);
        }
    });

    afterEach(() => fetchMock.disableMocks());
});
