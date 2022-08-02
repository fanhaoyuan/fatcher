/* eslint-disable max-depth */
import Schema from 'async-validator';
import { MockConfig } from '../interfaces';
import { parser } from '../parser';
import { MOCK_HEADER_KEY } from '../utils';

declare let self: ServiceWorkerGlobalScope;
declare let mockConfig: MockConfig[];

self.addEventListener('install', self.skipWaiting);

self.addEventListener('activate', async () => {
    self.clients.claim();

    const clients = await self.clients.matchAll();

    clients.forEach(client => client.postMessage([client.id, 'activated']));
});

const responseMap = {
    100: 'Continue',
    101: 'Switching Protocols',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    300: 'Multiple Choice',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Request Entity Too Large',
    414: 'Request-URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Requested Range Not Satisfiable',
    417: 'Expectation Failed',
    422: 'Unprocessable Entity',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
};

function responseInit(status: keyof typeof responseMap, init: ResponseInit = {}) {
    return {
        status,
        statusText: responseMap[status],
        ...init,
    };
}

/** Inject Mock Schema Code */

const mockMap = new Map<string, MockConfig>();

for (const config of mockConfig) {
    mockMap.set(config.url, config);
}

self.addEventListener('fetch', async event => {
    const request = event.request;

    const [u, querystring] = request.url.split('?');

    const url = u.replace(self.origin, '');

    if (request.headers.get(MOCK_HEADER_KEY)) {
        const contentType = request.headers.get('content-type')!;

        if (mockMap.has(url)) {
            const { validator, result } = mockMap.get(url)!;

            /**
             * Check it is a valid request.
             */
            if (validator) {
                const { method = 'GET', params, body } = validator;

                /**
                 * If Method is not match. Response with 405.
                 */
                if (request.method !== method) {
                    event.respondWith(new Response(null, responseInit(400)));
                    return;
                }

                /**
                 * Check request params. Response with 400 when it is invalid.
                 */
                if (params) {
                    const requestParams = Object.fromEntries(new URLSearchParams(querystring));

                    try {
                        await new Schema(params).validate(requestParams);
                    } catch (error) {
                        event.respondWith(new Response(null, responseInit(400)));
                        return;
                    }
                }

                /**
                 * Check request payload. Response with 400 when it is invalid.
                 *
                 * If method is GET/HEAD, Do not check request payload.
                 */
                // 如果是 GET、HEAD 请求 忽略 body 的验证
                if (!['GET', 'HEAD'].includes(request.method) && body) {
                    let requestBody;

                    if (contentType.includes('application/json')) {
                        requestBody = await request.json();
                    } else if (contentType.includes('multipart/form-data')) {
                        //    const formData  = await request.formData();
                        // TODO.
                    } else if (contentType.includes('application/x-www-form-urlencoded')) {
                        requestBody = Object.fromEntries(new URLSearchParams(await request.text()));
                    }

                    try {
                        await new Schema(body).validate(requestBody);
                    } catch (error) {
                        event.respondWith(new Response(null, { status: 400, statusText: 'Bad Request' }));
                        return;
                    }
                }
            }

            /**
             * Response mock data with 200.
             */

            let data = null;

            if (result?.body) {
                data = parser(result.body);
            }

            event.respondWith(
                new Response(
                    JSON.stringify(data),
                    responseInit(200, {
                        headers: {
                            'content-type': 'application/json',
                        },
                    })
                )
            );
            return;
        }

        // Not match any url. Do not mock.
    }
});
