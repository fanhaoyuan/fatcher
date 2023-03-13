import { Context, Middleware, Result, PatchContext } from './types';
import immutable from './immutable';

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
export default function composeMiddlewares(middlewares: Middleware[]) {
    return function use(initialContext: Context) {
        let currentIndex = -1;

        let result: Result;

        let context: Context = initialContext;

        let immutableContext = immutable(context);

        async function dispatch(index: number, patchContext?: PatchContext): Promise<Result> {
            if (index <= currentIndex) {
                return Promise.reject(
                    new Error(
                        `[fatcher] Middleware <${
                            middlewares[index - 1].name || 'Anonymous'
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
                context = Object.assign(context, patchContext);
                immutableContext = immutable(context);
            }

            return (result = await middleware.use(immutableContext, async patch => dispatch(index + 1, patch)));
        }

        return dispatch(0);
    };
}
