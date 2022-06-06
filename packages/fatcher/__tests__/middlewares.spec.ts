import { fatcher, Middleware, isFatcherError, canActivate, readStreamByChunk } from '../src';
import fetchMock from 'jest-fetch-mock';
import { BASE_URL } from './utils';

describe('Custom Middlewares', () => {
    const TEXT_LENGTH = 1_000_000;

    let longText = '';

    beforeEach(() => {
        fetchMock.mockIf(new RegExp(`${BASE_URL}/.*`), async request => {
            if (request.url === `${BASE_URL}/getLongText`) {
                if (request.method !== 'POST') {
                    return {
                        status: 405,
                    };
                }

                while (longText.length < TEXT_LENGTH) {
                    longText += Math.random().toString(36).slice(-5);
                }

                return {
                    status: 200,
                    body: longText,
                };
            }

            return {
                status: 404,
            };
        });

        fetchMock.enableMocks();
    });

    function pre(): Middleware {
        return {
            name: 'fatcher-middleware-pre',
            use(context, next) {
                if (context.url === `${BASE_URL}/get`) {
                    return next({
                        url: `${BASE_URL}/getLongText`,
                        method: 'POST',
                    });
                }

                return next();
            },
        };
    }

    it("Don't use pre middleware", async () => {
        try {
            await fatcher({
                baseUrl: BASE_URL,
                url: '/get',
            });
        } catch (error: any) {
            expect(isFatcherError(error)).toBe(true);

            const json = error.toJSON();

            expect(json.status).toBe(404);
        }
    });

    it('Using pre middleware', async () => {
        const { status, data } = await fatcher({
            baseUrl: BASE_URL,
            url: '/get',
            middlewares: [pre()],
        });

        expect(status).toBe(200);
        expect(data.toString()).toBe(longText);
    });

    function post(cof: number): Middleware {
        let index = 0;

        return {
            name: 'fatcher-middleware-post',
            async use(context, next) {
                const { data: response, ...rest } = await next();

                if (!canActivate(response)) {
                    return {
                        data: response,
                        ...rest,
                    };
                }

                const text = await response.text();

                const stream = new ReadableStream({
                    start(controller) {
                        (function push() {
                            const currentText = text.slice(index * cof, (index + 1) * cof);

                            if (!currentText) {
                                controller.close();
                                return;
                            }

                            index++;

                            controller.enqueue(currentText);
                            push();
                        })();
                    },
                });

                return {
                    ...rest,
                    response,
                    data: stream,
                };
            },
        };
    }

    it('Compose Middlewares', async () => {
        const COF = 1000;

        const { data } = await fatcher<ReadableStream<string>>({
            baseUrl: BASE_URL,
            url: '/get',
            middlewares: [pre(), post(COF)],
        });

        const result: string[] = [];
        await readStreamByChunk(data, str => result.push(str));
        expect(result[0].length).toBe(COF);
        expect(result.length).toBe(longText.length / COF);
        expect(result.join('')).toBe(longText);
    });

    afterEach(() => fetchMock.disableMocks());
});
