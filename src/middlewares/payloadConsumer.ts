import { Middleware, RequestMethod } from '../interfaces';

function wrapperSearchParams(url: string, params: Record<string, any>) {
    const [requestUrl, originSearchParamsString] = url.split('?');

    const originSearchParams = new URLSearchParams(originSearchParamsString);

    Object.keys(params).forEach(key => originSearchParams.append(key, params[key]));

    return `${requestUrl}?${originSearchParams.toString()}`;
}

export function payloadConsumer(): Middleware {
    return {
        name: 'fatcher-middleware-payload-consumer',
        use(context, next) {
            const { payload, url, headers = {}, method: customMethod = 'GET', body } = context;

            let normalizedURL = url;
            let normalizedBody = body;

            const contentType = headers['Content-Type'];

            if (!payload || !url) {
                return next();
            }

            const method = customMethod.toUpperCase() as RequestMethod;

            /**
             * If Request Method is `GET` or `HEAD`.
             * 
             * Will ignore headers['Content-Type'].
             * 
             * payload will transform into search params.
             */
            if (['GET', 'HEAD'].includes(method)) {
                normalizedURL = wrapperSearchParams(url, payload);
                normalizedBody = null;

                return next({
                    url: normalizedURL,
                    body: normalizedBody,
                });
            }

            if (contentType?.includes('application/json')) {
                normalizedBody = JSON.stringify(payload);
            }

            if (contentType?.includes('application/x-www-form-urlencoded')) {
                normalizedURL = wrapperSearchParams(url, payload);
                normalizedBody = null;
            }

            return next({
                url: normalizedURL,
                body: normalizedBody,
            });
        },
    };
}
