import { defineMiddleware } from '../../helpers';
import { AborterMiddlewareContext, AborterOptions, RoadMap } from './interfaces';

const roadMap: RoadMap = {};

/**
 * A middleware for aborting fatcher request.
 * @param options
 * @returns
 */
export function aborter(options: AborterOptions = {}) {
    const { timeout = 0, concurrency, groupBy } = options;

    let _timeout = timeout;

    if (isNaN(_timeout) || ~~_timeout < 0) {
        console.warn('[fatcher-middleware-aborter] Timeout is not a valid number.');
        _timeout = 0;
    }

    const middlewares = [];

    if (_timeout) {
        middlewares.push(timeoutAborter);
    }

    if (concurrency) {
        middlewares.push(concurrencyAborter);
    }

    return middlewares;
}
