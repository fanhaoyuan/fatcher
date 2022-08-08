/* eslint-disable max-depth */
import Schema from 'async-validator';
import { MockConfig } from '../interfaces';
import { parser } from '../parser';
import { MOCK_HEADER_KEY, getResponseStatus, isRequestWithoutBody } from '../utils';
import { paramsValidator } from '../validator';

declare let self: ServiceWorkerGlobalScope;
declare let mockConfig: MockConfig[];

self.addEventListener('install', self.skipWaiting);

self.addEventListener('activate', async () => {
    self.clients.claim();

    const clients = await self.clients.matchAll();

    clients.forEach(client => client.postMessage([client.id, 'activated']));
});

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
                    event.respondWith(new Response(null, getResponseStatus(405)));
                    return;
                }

                /**
                 * Check request params. Response with 400 when it is invalid.
                 */
                if (params) {
                    try {
                        await paramsValidator(querystring, params);
                    } catch (error) {
                        event.respondWith(new Response(null, getResponseStatus(400)));
                        return;
                    }
                }

                /**
                 * Check request payload. Response with 400 when it is invalid.
                 *
                 * If method is GET/HEAD, Do not check request payload.
                 */
                // 如果是 GET、HEAD 请求 忽略 body 的验证
                if (!isRequestWithoutBody(request.method) && body) {
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
                        event.respondWith(new Response(null, getResponseStatus(400)));
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
                new Response(JSON.stringify(data), {
                    ...getResponseStatus(200),
                    headers: {
                        'content-type': 'application/json',
                    },
                })
            );
            return;
        }

        // Not match any url. Do not mock.
    }
});
