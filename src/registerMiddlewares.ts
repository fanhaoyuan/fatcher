import { MiddlewareRegister, Middleware } from './interfaces';

function _filter(registers: MiddlewareRegister[]) {
    return registers.filter((item): item is Middleware | (Middleware | null)[] => !!item);
}

/**
 * Register Middlewares for fatcher.
 *
 * @param middlewares array of middleware
 * @returns
 */
export function registerMiddlewares(registers: MiddlewareRegister[]) {
    let middlewares: Middleware[] = [];

    for (const middleware of _filter(registers)) {
        if (Array.isArray(middleware)) {
            middlewares = middlewares.concat(registerMiddlewares(middleware));
        } else {
            middlewares.push(middleware);
        }
    }

    return middlewares;
}
