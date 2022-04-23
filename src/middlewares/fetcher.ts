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
            const {
                baseUrl = '/',
                url = '',
                headers = {},
                method = 'GET',
                credentials = 'same-origin',
                ...rest
            } = context;

            if (!url) {
                return unreachable('url is not defined.');
            }

            const normalizedURL = normalizeURL(baseUrl, url);

            const normalizedHeaders = normalizeHeaders(headers);

            const response = await fetch(normalizedURL, {
                ...rest,
                method,
                headers: normalizedHeaders,
                credentials,
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
