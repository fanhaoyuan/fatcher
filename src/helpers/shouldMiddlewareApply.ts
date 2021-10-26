import { Middleware, Immutable, RequestContext } from '../interfaces';
import isFunction from 'lodash/isFunction';

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
