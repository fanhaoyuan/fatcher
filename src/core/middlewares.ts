import { Middleware, Immutable, RequestContext } from '../interfaces';
import { uuid, isFunction } from '../utils';

/**
 * Return boolean for should middleware apply with context.
 * @param middleware
 * @param context
 * @returns
 */
export function shouldMiddlewareApply(middleware: Middleware, context: Immutable<RequestContext>) {
    if (isFunction(middleware.apply)) {
        return middleware.apply(context) ?? true;
    }

    return middleware.apply ?? true;
}

/**
 * Register Middlewares of fetch.
 *
 * Will Filter `middleware.apply` is `false`
 * @param middlewares array of middleware
 * @returns
 */
export function registerMiddlewares(middlewares: ((() => Middleware) | Middleware)[]) {
    return middlewares.reduce<Middleware[]>((effectMiddlewares, currentMiddleware) => {
        const middleware = isFunction(currentMiddleware) ? currentMiddleware() : currentMiddleware;

        if (middleware.apply === false) {
            return effectMiddlewares;
        }

        middleware.name ??= `fatch-middleware-${uuid(12)}`;

        return effectMiddlewares.concat([middleware]);
    }, []);
}
