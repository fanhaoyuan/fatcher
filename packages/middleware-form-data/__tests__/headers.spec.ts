import { defineMiddleware, fatcher } from 'fatcher';
import { formData } from '../src';

describe('Headers', () => {
    it('Not resolve with other headers', async () => {
        const checker = () => {
            return defineMiddleware(context => {
                expect(context.headers.get('content-type')).toBe('application/json');

                return {
                    status: 200,
                    statusText: 'ok',
                    data: null,
                    headers: context.headers,
                    url: context.url!,
                    options: {},
                };
            });
        };

        await fatcher({
            url: '/form-data',
            middlewares: [formData(), checker()],
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });

    it('Headers Changed', async () => {
        const checker = () => {
            return defineMiddleware(context => {
                expect(context.headers.get('content-type')).toBeNull();

                return {
                    status: 200,
                    statusText: 'ok',
                    data: null,
                    headers: context.headers,
                    url: context.url!,
                    options: {},
                };
            });
        };

        await fatcher({
            url: '/form-data',
            middlewares: [formData(), checker()],
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    });
});
