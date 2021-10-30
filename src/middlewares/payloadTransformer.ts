import { stringifyURL } from '../helpers';
import { Middleware, SupportedContentType } from '../interfaces';

const supportedContentTypes: SupportedContentType[] = [
    'application/x-www-form-urlencoded',
    'multipart/form-data',
    'application/json',
];

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
export function payloadTransformer(): Middleware {
    return {
        name: 'fatcher-middleware-payload-transformer',
        apply({ options }) {
            if (!options.autoTransformPayload) {
                return false;
            }

            if (options.method === 'get') {
                return false;
            }

            if (!Object.keys(options.payload).length) {
                return false;
            }

            if (supportedContentTypes.every(type => !options.headers['Content-Type']?.includes(type))) {
                return false;
            }

            return true;
        },
        use(context, next) {
            const contentType = context.options.headers['Content-Type'] as SupportedContentType;
            const payload = context.options.payload;

            if (supportedContentTypes[0].includes(contentType)) {
                return next({
                    options: {
                        body: stringifyURL(payload),
                    },
                });
            }

            if (supportedContentTypes[1].includes(contentType)) {
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

            if (supportedContentTypes[2].includes(contentType)) {
                return next({
                    options: {
                        body: JSON.stringify(payload),
                    },
                });
            }

            return next();
        },
    };
}
