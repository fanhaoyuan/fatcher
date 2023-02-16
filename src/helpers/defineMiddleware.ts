import { Middleware } from '../interfaces';

/**
 * A helper function for defineMiddleware
 * @param middleware
 * @param displayName
 * @returns
 */
export function defineMiddleware(middleware: Middleware, displayName?: string): Middleware {
    middleware.displayName = displayName || 'Anonymous';
    return middleware;
}
