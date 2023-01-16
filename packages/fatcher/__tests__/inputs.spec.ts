import { fatcher, Middleware } from '../src';

describe('Inputs', () => {
    const url = 'https://fatcher.virtual/input';

    const checker: Middleware = context => {
        expect(context.url).toBe(url);

        return {
            url: context.url,
            data: context.url,
            status: 200,
            statusText: 'Ok',
            headers: new Headers(),
        };
    };

    it('String input', async () => {
        const res = await fatcher(url, {
            middlewares: [checker],
        });

        expect(res.data).toBe(url);
    });

    it('Request options input', async () => {
        const res = await fatcher({
            url,
            middlewares: [checker],
        });

        expect(res.data).toBe(url);
    });
});
