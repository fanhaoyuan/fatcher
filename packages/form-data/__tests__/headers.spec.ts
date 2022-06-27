import { fatcher, Middleware } from 'fatcher';
import { formData } from '../src';

describe('Headers', () => {
    it('Not resolve with other headers', async () => {
        const checker = (): Middleware => {
            return {
                name: 'fatcher-middleware-checker',
                use(context) {
                    expect(context.requestHeaders.get('content-type')).toBe('application/json');

                    return {
                        status: 200,
                        statusText: 'ok',
                        data: null,
                        headers: context.requestHeaders,
                        url: context.url!,
                    };
                },
            };
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
        const checker = (): Middleware => {
            return {
                name: 'fatcher-middleware-checker',
                use(context) {
                    expect(context.requestHeaders.get('content-type')).toBeNull();

                    return {
                        status: 200,
                        statusText: 'ok',
                        data: null,
                        headers: context.requestHeaders,
                        url: context.url!,
                    };
                },
            };
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
