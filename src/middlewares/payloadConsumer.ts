import { Middleware, RequestMethod } from '../interfaces';

export function payloadConsumer(): Middleware {
    return {
        name: 'fatcher-middleware-payload-consumer',
        use(context, next) {
            const { payload, url, headers = {}, method: customMethod = 'GET', body, params = {} } = context;

            const contentType = headers['Content-Type'];

            const method = customMethod.toUpperCase() as RequestMethod;

            let normalizeUrl = url;

            /**
             * If Request Method is `GET` or `HEAD`.
             *
             * Will ignore headers['Content-Type'].
             *
             * payload will transform into search params.
             */
            if (['GET', 'HEAD'].includes(method)) {
                if (Object.keys(params).length) {
                    normalizeUrl = `${url}?${new URLSearchParams(Object.assign({}, params, body)).toString()}`;
                }

                return next({
                    url: normalizeUrl,
                    body: null,
                });
            }

            let normalizedBody = body;

            if (contentType?.includes('application/json') && payload) {
                normalizedBody = JSON.stringify(payload);
            }

            if (contentType?.includes('application/x-www-form-urlencoded') && payload) {
                normalizedBody = new URLSearchParams(payload);
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
