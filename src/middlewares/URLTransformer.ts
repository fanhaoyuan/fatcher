import { Middleware } from '../interfaces';
import { parseURL, stringifyURL } from '../helpers';

/**
 * A middleware for auto transform request url payload.
 *
 * This middleware should apply with followings:
 * - If auto transform payload
 * - If request method is `'get'`
 * - If request has payload.
 *
 * This middleware would change url.
 */
export function URLTransformer(): Middleware {
    return {
        name: 'fatch-middleware-url-transform',
        apply({ options }) {
            return options.autoTransformPayload && options.method === 'get' && !!Object.keys(options.payload).length;
        },
        use(context, next) {
            const url = context.options.url;

            const payload = context.options.payload;

            const [clearURL, inlineParams] = url.split('?');

            if (!inlineParams) {
                return next({
                    options: {
                        url: `${url}?${stringifyURL(payload)}`,
                    },
                });
            }

            const params = parseURL(inlineParams);

            return next({
                options: {
                    url: `${clearURL}?${stringifyURL({ ...params, ...payload })}`,
                },
            });
        },
    };
}
