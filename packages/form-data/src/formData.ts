import { Middleware } from 'fatcher';

/**
 * A middleware for consuming payload to form data.
 * @returns
 */
export function formData(): Middleware {
    return {
        name: 'fatcher-middleware-form-data',
        async use(context, next) {
            const { headers = {}, payload = null } = context;

            const contentType = headers['Content-Type'];

            if (!contentType?.includes('multipart/form-data')) {
                return next();
            }

            let body: FormData | null = null;

            if (payload) {
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

            return next({
                payload: null,
                body,
                headers: {
                    ...headers,
                    'Content-Type': null,
                },
            });
        },
    };
}
