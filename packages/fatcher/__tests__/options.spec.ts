/**
 * @jest-environment jsdom
 */

import { globalOptions, fatcher, FatcherError } from '../src';

globalOptions.method = 'post';

test('Global options changed', async () => {
    try {
        await fatcher({ url: 'https://fatcher.mock.com/methods/get' });
    } catch (error) {
        const err = error as FatcherError;

        expect(err.status).toBe(405);
        expect(err.statusText).toStrictEqual('Method Not Allowed');
    }

    const res = await fatcher({ url: 'https://fatcher.mock.com/methods/post' });

    expect(res.status).toBe(200);
    expect(res.options.method).toStrictEqual('post');
});
