import { canActivate, defineMiddleware } from 'fatcher';

/**
 * A middleware for transforming stream into json
 *
 * If response.body never used, will try to transform into json.
 *
 * But if transform error. Will return a origin response.
 */
export function json() {
    return defineMiddleware(async (context, next) => {
        const result = await next();

        if (canActivate(result.data)) {
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
    }, 'fatcher-middleware-json');
}
