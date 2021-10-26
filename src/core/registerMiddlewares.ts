import { Middleware } from '../interfaces';
import { uuid } from '../utils';
import isFunction from 'lodash/isFunction';

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
