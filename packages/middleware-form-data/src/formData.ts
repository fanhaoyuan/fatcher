import { defineMiddleware } from 'fatcher';
import { isPlainObject } from '@fatcherjs/utils-shared';

/**
 * A middleware for consuming payload to form data.
 * @returns
 */
export function formData() {
    return defineMiddleware(async (context, next) => {
        const { headers, body } = context;

        const type = headers.get('content-type');

        if (type && type.includes('multipart/form-data')) {
            headers.delete('content-type');

            if (!isPlainObject(body) || body instanceof FormData) {
                return next();
            }

            const form = new FormData();

            for (const [key, value] of Object.entries(body)) {
                if (Array.isArray(value)) {
                    value.forEach(item => form.append(key, item));
                } else {
                    form.append(key, value);
                }
            }

            return next({
                body: form,
            });
        }

        return next();
    }, 'fatcher-middleware-form-data');
}
