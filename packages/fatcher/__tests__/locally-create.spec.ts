/**
 * @jest-environment jsdom
 */
import { Fatcher, globalOptions } from '../src';
import { BASE_URL } from '../../../shared/setups/utils';

globalOptions.method = 'put';

const sendRequest = Fatcher.create({
    baseURL: `${BASE_URL}/mock/`,
    method: 'post',
    headers: {
        Authorization: 'Authorization',
    },
});

test('Locally Options', async () => {
    const res = await sendRequest('/getAccountInfo');

    expect(res.options.method).toStrictEqual('post');
    expect(res.status).toBe(200);
});

test('Compose options', async () => {
    const res = await sendRequest(
        '/getAccountInfo',
        {},
        {
            method: 'get',
            headers: {
                Authorization: 'Inline Authorization',
            },
        }
    );

    expect(res.options.method).toStrictEqual('get');
    expect(res.status).toBe(200);
});
