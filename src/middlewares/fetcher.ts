import { fetcher } from '../adapters';
import { clone, FatcherError } from '../core';
import { normalizeHeaders, normalizeURL } from '../helpers';
import { Middleware } from '../interfaces';

export function fetch(): Middleware {
    return {
        name: 'fatcher-middleware-fetch',
        async use(context) {
            const url = normalizeURL(context.options.baseURL, context.options.url);

            const rawOptions = clone(context.options);

            const response = await fetcher(url, rawOptions);

            const baseResponse = {
                status: response.status,
                statusText: response.statusText,
                headers: normalizeHeaders(response.headers),
                options: rawOptions,
            };

            if (response.ok) {
                return Object.assign({}, baseResponse, { data: response.body });
            }

            /**
             * If response.status is not in range of [200, 300)
             *
             * Throw a FatcherError
             */
            return Promise.reject(
                new FatcherError(response.status, response.statusText, response.body, context.options)
            );
        },
    };
}
