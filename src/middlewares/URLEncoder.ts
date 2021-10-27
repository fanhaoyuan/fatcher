import { stringifyURL } from '../helpers';
import { Middleware } from '../interfaces';

/**
 * A middleware for auto transform request payload with `'application/x-www-form-urlencoded'`.
 *
 * This middleware should apply with followings:
 * - If auto transform payload
 * - If request method except `'get'`
 * - If request has payload.
 * - If `Content-Type` is `'application/x-www-form-urlencoded'`
 *
 * This middleware would change `body`.
 */
export function URLEncoder(): Middleware {
    return {
        name: 'fatch-middleware-url-encoder',
        apply({ options }) {
            return (
                options.autoTransformPayload &&
                options.method !== 'get' &&
                options.headers['Content-Type'].includes('application/x-www-form-urlencoded') &&
                !!Object.keys(options.payload).length
            );
        },
        use(context, next) {
            return next({
                options: {
                    body: stringifyURL(context.options.payload),
                },
            });
        },
    };
}
