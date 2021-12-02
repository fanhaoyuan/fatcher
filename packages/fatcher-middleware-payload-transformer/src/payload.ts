import { Immutable, MiddlewareNext, RequestContext } from 'fatcher';
import { stringifyURL } from 'utils-shared';
import { SupportedContentType } from './interfaces';

/**
 * A middleware for auto transform request payload with `'application/x-www-form-urlencoded'`.
 *
 * This middleware should apply with followings:
 * - If auto transform payload
 * - If request method except `'get'`
 * - If request has payload.
 * - If `Content-Type` one of `'application/x-www-form-urlencoded' | 'multipart/form-data' | 'application/json'`
 *
 * This middleware would change `options.body` and `options.headers['Content-Type']`.
 */
export async function payloadTransformer(context: Immutable<RequestContext>, next: MiddlewareNext) {
    const contentType = context.options.headers['Content-Type'] as SupportedContentType;
    const payload = context.options.payload;

    if (contentType === 'application/x-www-form-urlencoded') {
        return next({
            options: {
                body: stringifyURL(payload),
            },
        });
    }

    if (contentType === 'multipart/form-data') {
        const formData = new FormData();

        for (const key of Object.keys(payload)) {
            formData.append(key, payload[key]);
        }

        return next({
            options: {
                headers: {
                    'Content-Type': null,
                },
                body: formData,
            },
        });
    }

    if (contentType === 'application/json') {
        return next({
            options: {
                body: JSON.stringify(payload),
            },
        });
    }

    return next();
}
