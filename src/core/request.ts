import { RequestMethod, MiddlewareResult } from '../interfaces';
import { FatcherError } from './FatcherError';
import { isPlainObject, Querystring } from '../utils/index';
import { defineMiddleware } from '../helpers';

/**
 * A middleware for send http request by using fetch.
 * @returns
 */
export const request = () => {
    const isNonNullBody = (method: RequestMethod) => !['GET', 'HEAD'].includes(method);

    return [
        /**
         * Auto transform body to json string
         */
        defineMiddleware((context, next) => {
            const { body, headers, method } = context;

            if (isNonNullBody(method) && isPlainObject(body)) {
                const type = headers.get('content-type');

                if (type && type.includes('application/json')) {
                    return next({
                        body: JSON.stringify(body),
                    });
                }
            }

            return next();
        }, 'fatcher-middleware-json-body'),

        /**
         * Auto transform body to querystring
         */
        defineMiddleware((context, next) => {
            const { body, headers, method } = context;

            if (isNonNullBody(method) && isPlainObject(body)) {
                const type = headers.get('content-type');

                if (type && type.includes('application/x-www-form-urlencoded')) {
                    return next({
                        body: Querystring.stringify(body as Record<string, any>),
                    });
                }
            }

            return next();
        }, 'fatcher-middleware-querystring-body'),

        /**
         * Clear body when request method is `GET` or `HEAD`.
         */
        defineMiddleware((context, next) => {
            /**
             * If Request Method is `GET` or `HEAD`, will clear body before fetch.
             *
             * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/body
             */
            if (!isNonNullBody(context.method)) {
                return next({
                    body: null,
                });
            }

            return next();
        }, 'fatcher-middleware-body-clearer'),

        /**
         * Sent request by fetch.
         */
        defineMiddleware(async context => {
            const { params, validateCode, body, ...requestRest } = context;

            let url = context.url;

            if (Object.keys(params).length) {
                // Recessive call `toString()` in URLSearchParams
                url += `?${Querystring.stringify(params)}`;
            }

            const response = await fetch(url, { ...requestRest, body: isPlainObject(body) ? body.toString() : body });

            const { ok, status, statusText, headers } = response;

            const result: MiddlewareResult = {
                url,
                status,
                statusText,
                headers,
                data: response,
            };

            if (validateCode ? validateCode(status) : ok) {
                return result;
            }

            /**
             * If response.status is not in range of [200, 300)
             *
             * Throw a FatcherError
             */
            return Promise.reject(new FatcherError(context, response));
        }, 'fatcher-middleware-fetch'),
    ];
};
