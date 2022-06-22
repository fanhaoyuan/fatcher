import { Middleware } from '../interfaces';

export function payloadConsumer(): Middleware {
    return {
        name: 'fatcher-middleware-payload-consumer',
        use(context, next) {
            const { payload, url, requestHeaders, method, body, params = {} } = context;

            const contentType = requestHeaders.get('content-type');

            let normalizeUrl = url;

            /**
             * If Request Method is `GET` or `HEAD`.
             *
             * Will ignore headers['Content-Type'].
             *
             * payload will transform into search params.
             */
            if (['GET', 'HEAD'].includes(method!)) {
                if (Object.keys(params).length) {
                    normalizeUrl = `${url}?${new URLSearchParams(Object.assign({}, params, body)).toString()}`;
                }

                return next({
                    url: normalizeUrl,
                    body: null,
                });
            }

            let normalizedBody = body;

            if (payload) {
                if (contentType?.includes('application/json')) {
                    normalizedBody = JSON.stringify(payload);
                }

                if (contentType?.includes('application/x-www-form-urlencoded')) {
                    normalizedBody = new URLSearchParams(payload);
                }
            }

            if (Object.keys(params).length) {
                normalizeUrl = `${url}?${new URLSearchParams(params).toString()}`;
            }

            return next({
                url: normalizeUrl,
                body: normalizedBody,
            });
        },
    };
}
