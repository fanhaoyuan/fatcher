import { RequestOptions, Middleware, RequestContext, PatchRequestContext, Response } from '../interfaces';
import { mergeContext } from '../context';
import { isImmutable, immutable } from '../immutable';
import { shouldMiddlewareApply } from './apply';

/**
 * Compose middlewares to a higher-order function.
 *
 * If want to change request context.Should pass a new request context to `next()`.
 *
 * Can not change context which comes from arguments. Because it is Immutable.
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
 * async function use(context: RequestContext, next: MiddlewareNext) {
 *      //pass a new context to lower middlewares.
 *      const response = await next({
 *          options: {
 *              method: 'get',
 *          }
 *      })
 *
 *      // pass response result to upper middlewares
 *      return response;
 * }
 * ```
 */
export function composeMiddlewares(middlewares: Middleware[]) {
    return async function use(initialOptions: RequestOptions) {
        let currentIndex = -1;

        let response: Response;

        let ctx: RequestContext = {
            options: initialOptions,
        };

        async function dispatch(index: number, patchContext?: PatchRequestContext): Promise<Response> {
            if (index <= currentIndex) {
                return Promise.reject(
                    new Error(`Middleware <${middlewares[index - 1].name}> use next() more than once.`)
                );
            }

            currentIndex = index;

            const middleware = middlewares[index];

            if (!middleware) {
                return response;
            }

            // If middleware pass a new context, update it.
            if (patchContext) {
                ctx = mergeContext(ctx, patchContext);
            }

            async function next(inlineContext?: PatchRequestContext) {
                return dispatch.call(null, index + 1, inlineContext);
            }

            try {
                // use readonly context.
                const immutablyContext = isImmutable(ctx) ? ctx : immutable(ctx);

                if (shouldMiddlewareApply(middleware, immutablyContext)) {
                    return (response = (await middleware.use(immutablyContext, next)) ?? response);
                }

                // If middleware should not apply. Auto next.
                return (response = (await next.call(null)) ?? response);
            } catch (error) {
                return Promise.reject(error);
            }
        }

        return (response = await dispatch(0));
    };
}
