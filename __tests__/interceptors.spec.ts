import { defineMiddleware, fatcher, json } from '../src';
import fetchMock from 'jest-fetch-mock';

const BASE_URL = 'https://fatcher.virtual';

describe('Custom Interceptors', () => {
    const ResponseErrMsg = 'Response Error';

    const responseData = {
        id: 'interceptor',
        timestamp: Date.now(),
    };

    beforeEach(() => {
        fetchMock.mockIf(new RegExp(`${BASE_URL}/.*`), async request => {
            if (request.url === `${BASE_URL}/interceptor/response/error`) {
                return {
                    status: 200,
                    body: JSON.stringify({ status: 50000, errMeg: ResponseErrMsg }),
                };
            }

            if (request.url === `${BASE_URL}/interceptor/response/success`) {
                return {
                    status: 200,
                    body: JSON.stringify({ status: 20000, data: responseData }),
                };
            }

            return {
                status: 404,
            };
        });
        fetchMock.enableMocks();
    });

    it('Request Interceptor', async () => {
        const payloadErrMsg = 'Payload is not defined';
        const methodErrMsg = 'Method is not POST';

        function requestInterceptor() {
            return defineMiddleware((context, next) => {
                if (!context.body) {
                    throw new Error(payloadErrMsg);
                }

                if (context.method !== 'POST') {
                    throw new Error(methodErrMsg);
                }

                // ...

                return next();
            });
        }

        try {
            await fatcher({
                base: BASE_URL,
                url: '/foo/bar',
                middlewares: [requestInterceptor()],
                body: {
                    test: 1,
                },
            });
        } catch (err: any) {
            expect(err.message).toBe(methodErrMsg);
        }

        try {
            await fatcher({
                base: BASE_URL,
                url: '/foo/bar',
                middlewares: [requestInterceptor()],
                method: 'POST',
            });
        } catch (err: any) {
            expect(err.message).toBe(payloadErrMsg);
        }
    });

    it('Response Interceptor', async () => {
        function responseInterceptor() {
            return defineMiddleware(async (context, next) => {
                const result = await next();

                if (result.data.status === 50000) {
                    return Promise.reject(result.data);
                }

                return result;
            });
        }

        try {
            await fatcher({
                base: BASE_URL,
                url: '/interceptor/response/error',
                middlewares: [responseInterceptor(), json()],
            });
        } catch (err: any) {
            expect(err.status).toBe(50000);
            expect(err.errMeg).toBe(ResponseErrMsg);
        }

        const { data, status } = await fatcher({
            base: BASE_URL,
            url: '/interceptor/response/success',
            middlewares: [responseInterceptor(), json()],
        });

        expect(status).toBe(200);
        expect(data.status).toBe(20000);
        expect(data.data).toStrictEqual(responseData);
    });
    afterEach(() => fetchMock.disableMocks());
});
