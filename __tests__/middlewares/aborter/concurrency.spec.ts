import { fatcher } from '../../../src';
import fetchMock from 'jest-fetch-mock';
import { aborter, isAbortError } from '../../../src/middlewares/aborter';

describe('Concurrency', () => {
    const BASE_URL = 'https://fatcher.virual';

    beforeEach(() => {
        fetchMock.mockIf(new RegExp(`${BASE_URL}/.*`), async request => {
            if (request.url === `${BASE_URL}/concurrency`) {
                return {
                    status: 200,
                };
            }

            return {
                status: 404,
            };
        });

        fetchMock.enableMocks();
    });

    it('Without Concurrency', async () => {
        const send = () =>
            fatcher({
                base: BASE_URL,
                url: '/concurrency',
                middlewares: [
                    aborter({
                        concurrency: false,
                    }),
                ],
            }).then(res => {
                expect(res.status).toBe(200);
            });

        await Promise.all([send(), send(), send(), send(), send()]);
    });

    it('With Concurrency', async () => {
        const send = async () => {
            try {
                const { status } = await fatcher({
                    base: BASE_URL,
                    url: '/concurrency',
                    middlewares: [
                        aborter({
                            concurrency: true,
                            // onAbort(reason) {
                            //     expect(reason).toBe('concurrency');
                            // },
                        }),
                    ],
                });

                expect(status).toBe(200);
            } catch (error) {
                expect(isAbortError(error)).toBe(true);
                return Promise.reject(error);
            }
        };

        const results = await Promise.allSettled([send(), send(), send()]);

        expect(results[0].status).toBe('rejected'); // Concurrency Aborted.
        expect(results[1].status).toBe('rejected'); // Concurrency Aborted.
        expect(results[2].status).toBe('fulfilled');
    });

    it('Group By Custom Key', async () => {
        const send = async () => {
            try {
                const { status } = await fatcher({
                    base: BASE_URL,
                    url: '/concurrency',
                    middlewares: [
                        aborter({
                            concurrency: true,
                            groupBy(context) {
                                return `${context.url}_${Math.random()}`;
                            },
                        }),
                    ],
                });

                expect(status).toBe(200);
            } catch (error) {
                expect(isAbortError(error)).toBe(true);
                return Promise.reject(error);
            }
        };

        const results = await Promise.allSettled([send(), send(), send()]);

        expect(results[0].status).toBe('fulfilled');
        expect(results[1].status).toBe('fulfilled');
        expect(results[2].status).toBe('fulfilled');
    });

    afterEach(() => fetchMock.disableMocks());
});
