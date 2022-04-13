import { Middleware, MiddlewareResult } from '../interfaces';
import { normalizeURL, normalizeHeaders } from '@fatcherjs/utils-shared';
import { FatcherError } from '../errors';
import { unreachable } from '../utils';

/**
 * A middleware for send http request by using fetch.
 * @returns
 */
export function fetcher(): Middleware {
    return {
        name: 'fatcher-middleware-http-fetcher',
        async use(context) {
            const { baseUrl = '/', url = '', headers = {}, method = 'GET', payload, body, ...rest } = context;

            const _method = method.toUpperCase();

            if (!url) {
                return unreachable('url is not defined.');
            }

            let normalizedURL = normalizeURL(baseUrl, url);

            let consumedBody = body;

            const contentType = headers['Content-Type'];

            const withoutBody = ['GET', 'HEAD'].includes(_method);

            if (payload) {
                if (!withoutBody && contentType?.includes('application/json')) {
                    consumedBody = JSON.stringify(payload);
                }

                if (contentType?.includes('application/x-www-form-urlencoded')) {
                    const [requestUrl, originSearchParamsString] = normalizedURL.split('?');

                    const originSearchParams = new URLSearchParams(originSearchParamsString);

                    Object.keys(payload).forEach(key => originSearchParams.append(key, payload[key]));

                    normalizedURL = `${requestUrl}?${originSearchParams.toString()}`;
                }
            }

            const normalizedHeaders = normalizeHeaders(headers);

            const response = await fetch(normalizedURL, {
                ...rest,
                method: _method,
                headers: normalizedHeaders,
                body: consumedBody,
            });

            const { status, statusText, ok } = response;

            const result: MiddlewareResult = {
                status,
                statusText,
                headers,
                url: normalizedURL,
                data: response,
            };

            if (ok) {
                return result;
            }

            /**
             * If response.status is not in range of [200, 300)
             *
             * Throw a FatcherError
             */
            return Promise.reject(new FatcherError(context, response));
        },
    };
}
