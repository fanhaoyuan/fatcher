import { Context, Middleware, MiddlewareResult, PatchContext } from '../interfaces';
import { mergeContext } from '../context';
import { immutable } from '@fatcherjs/utils-shared';
import { BaseError } from '../errors/BaseError';

/**
 * Compose middlewares to a higher-order function.
 *
 * If want to change request context.Should pass a new request context to `next()`.
 *
 * If don't want to change response, should return `next()`
 *
 * @param middlewares array of middlewares.
 * @returns
 * A async function of promise chain.
 *
 * @examples
 *
 * ```ts
 * async function use(context: Context, next: MiddlewareNext) {
 *      //pass a new context to lower middlewares.
 *      const response = await next({
 *          method: 'GET',
 *      })
 *
 *      // pass response result to upper middlewares
 *      return response;
 * }
 * ```
 */
export function composeMiddlewares(middlewares: Middleware[]) {
    return function use(initialContext: Context) {
        let currentIndex = -1;

        let response: MiddlewareResult;

        let context: Context = initialContext;

        let immutableContext: Context = immutable(context);

        async function dispatch(index: number, patchContext?: PatchContext) {
            if (index <= currentIndex) {
                return Promise.reject(
                    new BaseError(`Middleware <${middlewares[index - 1].name}> call next() more than once.`)
                );
            }

            currentIndex = index;

            const middleware = middlewares[index];

            if (!middleware) {
                return response;
            }

            if (patchContext) {
                context = mergeContext(context, patchContext);
                immutableContext = immutable(context);
            }

            try {
                response = await middleware.use(immutableContext, async patch => dispatch(index + 1, patch));

                return response;
            } catch (error) {
                return Promise.reject(error);
            }
        }

        return dispatch(0);
    };
}
