import { UnregisteredMiddlewares, Middleware } from '../interfaces';
import { isFunction } from '../utils';

/**
 * Register Middlewares for fatcher.
 *
 * @param middlewares array of middleware
 * @returns
 */
export async function registerMiddlewares(unregisteredMiddlewares: UnregisteredMiddlewares) {
    let middlewares: Middleware[] = [];

    for await (const middleware of unregisteredMiddlewares) {
        if (Array.isArray(middleware)) {
            middlewares = middlewares.concat(await registerMiddlewares(middleware));
        } else {
            let current: Middleware[] = [isFunction(middleware) ? await middleware() : middleware];

            if (current[0].presets?.length) {
                current = (await registerMiddlewares(current[0].presets)).concat(current);
            }

            middlewares = middlewares.concat(current);
        }
    }

    return middlewares;
}
