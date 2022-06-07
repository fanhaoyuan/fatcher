import { createScopedRequest, isFatcherError } from '../src';
import fetchMock from 'jest-fetch-mock';
import { BASE_URL, json } from './utils';

describe('Scoped Request', () => {
    const fetch = createScopedRequest({
        baseUrl: BASE_URL,
        method: 'POST',
        middlewares: [json()],
    });

    beforeEach(() => {
        fetchMock.mockIf(new RegExp(`${BASE_URL}/.*`), async request => {
            if (request.url === `${BASE_URL}/checkHeaders`) {
                if (request.headers.get('content-type') === 'application/x-www-form-urlencoded') {
                    return {
                        status: 200,
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

    it('Headers cover', async () => {
        try {
            await fetch('/checkHeaders', null, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error: any) {
            expect(isFatcherError(error)).toBe(true);
            expect(error.toJSON().status).toBe(400);
        }

        const result = await fetch('checkHeaders', null);

        expect(result.status).toBe(200);
    });

    afterEach(() => {
        fetchMock.disableMocks();
    });
});
