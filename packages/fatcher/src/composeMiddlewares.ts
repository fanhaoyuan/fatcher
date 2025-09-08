import { merge } from './merge';
import { FatcherFunctionalMiddleware, FatcherRequest, FatcherResponse } from './types';

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
 * ```
 */
export function composeMiddlewares(middlewares: FatcherFunctionalMiddleware[]) {
  return function use(init: FatcherRequest) {
    let currentIndex = -1;

    let response: Response;

    let request: FatcherRequest = init;

    async function dispatch(
      index: number,
      patch?: Partial<FatcherRequest>,
    ): Promise<FatcherResponse> {
      if (index <= currentIndex) {
        return response;
      }

      currentIndex = index;

      const middleware = middlewares[index];

      if (!middleware) {
        return response;
      }

      if (patch) {
        const base = patch.url ? new Request(patch.url, request) : request;
        request = merge(new Request(base, patch) as FatcherRequest, request, patch);
      }

      const newResponse = await middleware(request, async _ => dispatch(index + 1, _));
      response = response ? merge(newResponse, response) : newResponse;
      return response;
    }

    return dispatch(0);
  };
}
