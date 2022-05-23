import { fatcher, isFatcherError } from 'fatcher';
import fetchMock from 'jest-fetch-mock';
import { BASE_URL, json } from './utils';

describe('Basic Request', () => {
    beforeEach(() => {
        fetchMock.mockIf(new RegExp(`${BASE_URL}/.*`), async request => {
            const [path] = request.url.split('?');

            if (path === `${BASE_URL}/getJsonData`) {
                return {
                    status: 200,
                    body: JSON.stringify({
                        id: 'getJsonData',
                        name: 'fatcher',
                    }),
                };
            }

            if (path === `${BASE_URL}/setJsonData`) {
                if (request.method !== 'POST') {
                    return {
                        status: 405,
                    };
                }

                const params = new URLSearchParams(await request.text());

                if (params.get('id') === 'setJsonData') {
                    return {
                        status: 201,
                        body: `fatcher change into ${params.get('name')}`,
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

    it('Basic Request', async () => {
        const { data, status } = await fatcher({
            baseUrl: BASE_URL,
            url: '/getJsonData',
            middlewares: [json()],
        });

        expect(status).toBe(200);
        expect(data).toStrictEqual({
            id: 'getJsonData',
            name: 'fatcher',
        });
    });

    it('POST Request', async () => {
        const name = 'fatcher_1';

        const { data, status } = await fatcher({
            baseUrl: BASE_URL,
            url: '/setJsonData',
            method: 'POST',
            payload: {
                id: 'setJsonData',
                name,
            },
        });

        expect(status).toBe(201);
        //mock env data is Unit8Array, not ReadableStream
        expect(data.toString()).toBe(`fatcher change into ${name}`);
    });

    it('Method not Allow', async () => {
        const name = 'fatcher_1';

        try {
            await fatcher({
                baseUrl: BASE_URL,
                url: '/setJsonData',
                payload: {
                    id: 'setJsonData',
                    name,
                },
            });
        } catch (error: any) {
            if (isFatcherError(error)) {
                expect(error.toJSON().status).toBe(405);
            }
        }
    });

    it('Not Found', async () => {
        try {
            await fatcher({
                baseUrl: BASE_URL,
                url: '/get',
            });
        } catch (error: any) {
            if (isFatcherError(error)) {
                expect(error.toJSON().status).toBe(404);
            }
        }
    });

    afterEach(() => fetchMock.disableMocks());
});
