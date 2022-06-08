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
            const { url = '', requestHeaders: headers, ...rest } = context;

            const response = await fetch(url, {
                ...rest,
                headers,
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
