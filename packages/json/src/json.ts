import { canActivate, Middleware } from 'fatcher';

/**
 * A middleware for transforming stream into json
 *
 * If response.body never used, will try to transform into json.
 *
 * But if transform error. Will return a origin response.
 */
export function json(): Middleware {
    return {
        name: 'fatcher-middleware-json',
        async use(context, next) {
            const result = await next();

            if (canActivate(result.data)) {
                /**
                 * Clone a response to try.
                 */
                const clonedResponse = result.data.clone();

                try {
                    const data = await clonedResponse.json();

                    return Object.assign(result, { data });
                } catch {
                    /**
                     * If transform error.
                     *
                     * Return origin result.
                     */
                }
            }

            return result;
        },
    };
}
