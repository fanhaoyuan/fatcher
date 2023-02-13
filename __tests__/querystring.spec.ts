import { fatcher, isFatcherError, json } from '../src';
import fetchMock from 'jest-fetch-mock';
const BASE_URL = 'https://fatcher.virtual';

describe('querystring', () => {
    beforeEach(() => {
        fetchMock.mockIf(new RegExp(`${BASE_URL}/.*`), async request => {
            const [url, searchParams] = request.url.split('?');

            const params = new URLSearchParams(searchParams);

            if (url === `${BASE_URL}/getData`) {
                const id = params.get('id');
                if (id === 'get') {
                    return {
                        body: JSON.stringify({ data: 'ok' }),
                    };
                }

                return {
                    status: 400,
                };
            }

            if (url === `${BASE_URL}/getJoinedData`) {
                const id = params.get('id');
                const name = params.get('name');

                if (id === 'get' && name === 'query') {
                    return {
                        body: JSON.stringify({ data: 'ok' }),
                    };
                }

                return {
                    status: 400,
                };
            }

            return {
                status: 404,
            };
        });

        fetchMock.enableMocks();
    });

    it('With querystring params', async () => {
        const result = await fatcher({
            base: BASE_URL,
            url: '/getData?id=get',
            middlewares: [json()],
        });

        expect(result.status).toBe(200);
        expect(result.data.data).toBe('ok');
    });

    it('With params', async () => {
        const result = await fatcher({
            base: BASE_URL,
            url: '/getData',
            params: { id: 'get' },
            middlewares: [json()],
            method: 'POST',
        });

        expect(result.status).toBe(200);
        expect(result.data.data).toBe('ok');
    });

    it('Without querystring params', async () => {
        try {
            await fatcher({
                base: BASE_URL,
                url: '/getData',
                middlewares: [json()],
            });
        } catch (error: any) {
            expect(isFatcherError(error)).toBe(true);
            expect(error.toJSON().status).toBe(400);
        }
    });

    it('With querystring and params', async () => {
        const result1 = await fatcher({
            base: BASE_URL,
            url: '/getJoinedData?id=get',
            params: { name: 'query' },
            middlewares: [json()],
        });

        expect(result1.status).toBe(200);
        expect(result1.data.data).toBe('ok');

        const result2 = await fatcher({
            base: BASE_URL,
            url: '/getJoinedData?name=query',
            params: { id: 'get' },
            middlewares: [json()],
        });

        expect(result2.status).toBe(200);
        expect(result2.data.data).toBe('ok');
    });

    it(`Params with cover querystring`, async () => {
        const result = await fatcher({
            base: BASE_URL,
            url: '/getData?id=get&name=query',
            middlewares: [json()],
        });

        expect(result.status).toBe(200);
        expect(result.data.data).toBe('ok');

        try {
            await fatcher({
                base: BASE_URL,
                url: '/getData?id=get&name=query',
                params: {
                    id: 'post',
                },
                middlewares: [json()],
            });
        } catch (error: any) {
            expect(isFatcherError(error)).toBe(true);
            expect(error.toJSON().status).toBe(400);
        }
    });

    afterEach(() => fetchMock.disableMocks());
});
