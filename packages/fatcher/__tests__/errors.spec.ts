/**
 * @jest-environment jsdom
 */
import { FatcherError, fatcher } from '../src';

test('Internal Server Error', async () => {
    try {
        await fatcher('https://fatcher.mock.com/errors/500');
    } catch (error) {
        const err = error as FatcherError;
        expect(err.status).toBe(500);
        expect(err.statusText).toStrictEqual('Internal Server Error');
    }
});

test('Bad Request', async () => {
    try {
        await fatcher('https://fatcher.mock.com/errors/400', {
            method: 'post',
            payload: {
                a: '1',
            },
        });
    } catch (error) {
        const err = error as FatcherError;
        expect(err.status).toBe(400);
        expect(err.statusText).toStrictEqual('Bad Request');
    }
});

test('Not Found', async () => {
    try {
        await fatcher('https://fatcher.mock.com/errors/404');
    } catch (error) {
        const err = error as FatcherError;
        expect(err.status).toBe(404);
        expect(err.statusText).toStrictEqual('Not Found');
    }
});
