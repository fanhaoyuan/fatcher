import { Context, Middleware, MiddlewareResult, PatchContext } from '../interfaces';
import { immutable, combine } from '../utils';

/**
 * Compose middlewares to a higher-order function.
 *
 * If want to change request context.Should pass a new request context to `next()`.
 *
 * If don't want to change result, should return `next()`
 *
 * @param middlewares array of middlewares.
 * @returns
 * A async function of promise chain.
 *
 * @examples
 *
 * ```ts
 * async function use(context: Context, next: Next) {
 *      //pass a new context to lower middlewares.
 *      const result = await next({
 *          method: 'GET',
 *      })
 *
 *      // pass result to upper middlewares
 *      return result;
 * }
 *
 * use.displayName = 'fatcher-middleware-use';
 * ```
 */
export function composeMiddlewares(middlewares: Middleware[]) {
    return function use(initialContext: Context) {
        let currentIndex = -1;

        let result: MiddlewareResult;

        let context: Context = initialContext;

        let immutableContext = immutable(context);

        async function dispatch(index: number, patchContext?: PatchContext): Promise<MiddlewareResult> {
            if (index <= currentIndex) {
                return Promise.reject(
                    new Error(
                        `[fatcher] Middleware <${
                            middlewares[index - 1].displayName || 'Anonymous'
                        }> called next() more than once.`
                    )
                );
            }

            currentIndex = index;

            const middleware = middlewares[index];

            if (!middleware) {
                return result;
            }

            if (patchContext) {
                context = combine(context, patchContext);
                immutableContext = immutable(context);
            }

            try {
                return (result = await middleware(immutableContext, async patch => dispatch(index + 1, patch)));
            } catch (error) {
                return Promise.reject(error);
            }
        }

        return dispatch(0);
    };
}
