/* 
    在vue中使用Fatcher
*/

import { Fatcher } from 'fatcher';

const request = Fatcher.create({
    //配置项
    method: 'post',
    baseURL: 'api',
    middlewares: [
        {
            name: 'carry token',
            apply() {
                return !!sessionStorage.getItem('token');
            },
            async use(context, next) {
                const response = await next({
                    options: {
                        headers: {
                            Authorization: sessionStorage.getItem('token'),
                        },
                    },
                });
                return {
                    ...response,
                };
            },
        },
        {
            name: 'data stream handle',
            async use(context, next) {
                const response = await next();

                const [stream, returnStream] = response.data.tee();

                const _res = new Response(stream, { headers: response.headers });

                const responseJSON = await _res.json();

                console.log('response', responseJSON);
                if (responseJSON.code === 401) {
                    return { ...response, data: returnStream };
                }
                if (!responseJSON.success) {
                    return Promise.reject(new Error());
                }

                return {
                    ...response,
                    data: returnStream,
                };
            },
        },
    ],
});

export function login(data: { loginCode: string; password: string }) {
    return request('/group/groupList', data, {
        headers: {
            SystemType: 'onlineBookKeeping',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
}

export function getCheckInfo() {
    return request(
        '/check/getCheckInfo',
        {},
        {
            method: 'get',
        }
    );
}
