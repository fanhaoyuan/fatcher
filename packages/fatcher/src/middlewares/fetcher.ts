import { Middleware, MiddlewareResult } from '../interfaces';
import { FatcherError } from '../errors';

/**
 * A middleware for send http request by using fetch.
 * @returns
 */
export function fetcher(): Middleware {
    return {
        name: 'fatcher-middleware-fetch',
        async use(context) {
            // eslint-disable-next-line prefer-const
            let { url = '', requestHeaders: headers, payload, method = 'GET', body, params = {}, ...rest } = context;

            const contentType = headers.get('content-type');

            /**
             * If Request Method is `GET` or `HEAD`.
             *
             * Will ignore headers['Content-Type'].
             *
             * payload will transform into search params.
             */
            if (['GET', 'HEAD'].includes(method)) {
                params = Object.assign({}, params, body);
                body = null;
            } else if (payload && contentType) {
                if (contentType.includes('application/json')) {
                    body = JSON.stringify(payload);
                }

                if (contentType.includes('application/x-www-form-urlencoded')) {
                    body = new URLSearchParams(payload);
                }
            }

            if (Object.keys(params).length) {
                url = `${url}?${new URLSearchParams(params).toString()}`;
            }

            const response = await fetch(url, {
                ...rest,
                headers,
                body,
                method,
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
