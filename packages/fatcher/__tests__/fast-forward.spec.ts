/**
 * @jest-environment jsdom
 */
import { Fatcher, Response } from '../src';
import { BASE_URL } from '../../../shared/setups/utils';

function formatResponse(res: Response<Uint8Array>) {
    return {
        ...res,
        data: JSON.parse(res.data.toString()),
    };
}

test('Fast get', async () => {
    const _ = await Fatcher.get(`${BASE_URL}/methods/get`);
    const res = formatResponse(_);
    expect(res.status).toBe(200);
    expect(res.data.method).toStrictEqual('get');
});

test('Fast post', async () => {
    const _ = await Fatcher.post(`${BASE_URL}/methods/post`);
    const res = formatResponse(_);
    expect(res.status).toBe(200);
    expect(res.data.method).toStrictEqual('post');
});

test('Fast put', async () => {
    const _ = await Fatcher.put(`${BASE_URL}/methods/put`);
    const res = formatResponse(_);
    expect(res.status).toBe(200);
    expect(res.data.method).toStrictEqual('put');
});

test('Fast delete', async () => {
    const _ = await Fatcher.delete(`${BASE_URL}/methods/delete`);
    const res = formatResponse(_);
    expect(res.status).toBe(200);
    expect(res.data.method).toStrictEqual('delete');
});
