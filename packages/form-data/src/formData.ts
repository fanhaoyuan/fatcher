import { Middleware } from 'fatcher';

/**
 * A middleware for consuming payload to form data.
 * @returns
 */
export function formData(): Middleware {
    return {
        name: 'fatcher-middleware-form-data',
        async use(context, next) {
            const { requestHeaders: headers, payload = null } = context;

            if (!headers.get('content-type')?.includes('multipart/form-data')) {
                return next();
            }

            let body: FormData | null = null;

            if (payload) {
                if (payload instanceof FormData) {
                    body = payload;
                } else {
                    body = new FormData();

                    for (const key of Object.keys(payload)) {
                        const value = payload[key];

                        if (Array.isArray(value)) {
                            value.forEach(item => body?.append(key, item));
                            continue;
                        }

                        body.append(key, value);
                    }
                }
            }

            headers.delete('content-type');

            return next({
                payload: null,
                body,
            });
        },
    };
}
