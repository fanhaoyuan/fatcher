/**
 * @jest-environment jsdom
 */
import { fatcher, FatcherError, RequestMethod, RequestOptions } from '../src';
import { BASE_URL } from '../../../shared/setups/utils';

async function send(method: RequestMethod, options: Partial<RequestOptions> = {}) {
    const res = await fatcher<Uint8Array>(`${BASE_URL}/methods/${method}`, {
        method,
        ...options,
    });

    return {
        ...res,
        data: JSON.parse(res.data.toString()),
    };
}

test('Method get', async () => {
    const res = await send('get');
    expect(res.status).toBe(200);
    expect(res.data.method).toStrictEqual('get');
});

test('Method post', async () => {
    const res = await send('post');
    expect(res.status).toBe(200);
    expect(res.data.method).toStrictEqual('post');
});

test('Method put', async () => {
    const res = await send('put');
    expect(res.status).toBe(200);
    expect(res.data.method).toStrictEqual('put');
});

test('Method delete', async () => {
    const res = await send('delete');
    expect(res.status).toBe(200);
    expect(res.data.method).toStrictEqual('delete');
});

test('Method head', async () => {
    const res = await send('head');
    expect(res.status).toBe(200);
    expect(res.data.method).toStrictEqual('head');
});

test('Method options', async () => {
    const res = await send('options');
    expect(res.status).toBe(200);
    expect(res.data.method).toStrictEqual('options');
});

test('Method patch', async () => {
    const res = await send('patch');
    expect(res.status).toBe(200);
    expect(res.data.method).toStrictEqual('patch');
});

test('Method Not Allowed', async () => {
    try {
        await send('post', { method: 'get' });
    } catch (error: any) {
        const err = error as FatcherError;

        expect(err.status).toBe(405);
        expect(err.statusText).toStrictEqual('Method Not Allowed');
    }
});
