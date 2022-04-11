import { canActivate } from '../utils';
import { Middleware } from '../interfaces';

/**
 * A middleware for transform stream into json.
 *
 * If response.body never used, will try to transform into json.
 *
 * But if transform error. Will return a origin readableStream.
 */
export function json(): Middleware {
    return {
        name: 'fatcher-middleware-json',
        async use(context, next) {
            const result = await next();

            if (canActivate(result.data)) {
                const response = result.data.clone();

                try {
                    const data = await response.json();

                    return {
                        ...result,
                        data,
                    };
                } catch {
                    return {
                        ...result,
                        data: result.data.body,
                    };
                }
            }

            return result;
        },
    };
}
