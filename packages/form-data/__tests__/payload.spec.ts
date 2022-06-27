import { fatcher, Middleware } from 'fatcher';
import { formData } from '../src';

describe('Payload', () => {
    it('Object change to formData', async () => {
        const payload = {
            name: 'form-data',
            titles: ['a', 'b', 'c'],
        };

        const checker = (): Middleware => {
            return {
                name: 'fatcher-middleware-checker',
                use(context) {
                    expect(context.body instanceof FormData).toBe(true);
                    expect((context.body as FormData).get('name')).toBe(payload.name);
                    expect(context.payload).toBeNull();
                    expect((context.body as FormData).getAll('titles')).toEqual(payload.titles);

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
            payload,
        });
    });

    it('FormData ignore to change', async () => {
        const payload = new FormData();

        const name = 'form-data';

        payload.append('name', name);

        const checker = (): Middleware => {
            return {
                name: 'fatcher-middleware-checker',
                use(context) {
                    expect(context.body instanceof FormData).toBe(true);
                    expect(context.payload).toBeNull();
                    expect(context.body).toBe(payload);
                    expect((context.body as FormData).get('name')).toBe(name);

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
            payload,
        });
    });
});
