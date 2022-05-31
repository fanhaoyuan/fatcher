import { Middleware, MiddlewareResult } from '../interfaces';
import { FatcherError } from '../errors';

/**
 * A middleware for send http request by using fetch.
 * @returns
 */
export function fetcher(): Middleware {
    return {
        name: 'fatcher-middleware-http-fetcher',
        async use(context) {
            const { url = '', headers = {}, ...rest } = context;

            const requestHeaders = Object.keys(headers).reduce<Record<string, string>>((_headers, key) => {
                const value = headers[key];

                return value ? { ..._headers, [key]: value } : _headers;
            }, Object.create(null));

            const response = await fetch(url, {
                ...rest,
                headers: requestHeaders,
            });

            const { status, statusText, ok, headers: responseHeaders } = response;

            const result: MiddlewareResult = {
                status,
                statusText,
                headers: responseHeaders,
                url,
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
