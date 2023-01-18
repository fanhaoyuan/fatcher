import { defineMiddleware, fatcher, Middleware } from 'fatcher';
import { formData } from '../src';

describe('Payload', () => {
    it('Object change to formData', async () => {
        const body = {
            name: 'form-data',
            titles: ['a', 'b', 'c'],
        };

        const checker = () => {
            return defineMiddleware(context => {
                expect(context.body instanceof FormData).toBe(true);
                expect((context.body as FormData).get('name')).toBe(body.name);
                expect((context.body as FormData).getAll('titles')).toEqual(body.titles);

                return {
                    status: 200,
                    statusText: 'ok',
                    data: null,
                    headers: context.headers,
                    url: context.url!,
                };
            });
        };

        await fatcher({
            url: '/form-data',
            middlewares: [formData(), checker()],
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body,
        });
    });

    it('FormData ignore to change', async () => {
        const body = new FormData();

        const name = 'form-data';

        body.append('name', name);

        const checker = (): Middleware => {
            return defineMiddleware(context => {
                expect(context.body instanceof FormData).toBe(true);
                expect(context.body).toBe(body);
                expect((context.body as FormData).get('name')).toBe(name);

                return {
                    status: 200,
                    statusText: 'ok',
                    data: null,
                    headers: context.requestHeaders,
                    url: context.url!,
                };
            });
        };

        await fatcher({
            url: '/form-data',
            middlewares: [formData(), checker()],
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body,
        });
    });
});
