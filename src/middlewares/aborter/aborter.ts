import { defineMiddleware } from '../..';
import { AborterMiddlewareContext, AborterOptions, RoadMap } from './interfaces';

const roadMap: RoadMap = {};

/**
 * A middleware for aborting fatcher request.
 * @param options
 * @returns
 */
export function aborter(options: AborterOptions = {}) {
    const { timeout = 0, onAbort = null, concurrency, groupBy } = options;

    let _timeout = timeout;

    if (isNaN(_timeout) || ~~_timeout < 0) {
        console.warn('[fatcher-middleware-aborter] Timeout is not a valid number.');
        _timeout = 0;
    }

    const baseAborter = defineMiddleware(async (context, next) => {
        const abortController = new AbortController();

        if (onAbort) {
            abortController.signal.addEventListener('abort', () => onAbort());
        }

        return next({
            signal: abortController.signal,
            abort: abortController.abort.bind(abortController),
        });
    }, 'fatcher-middleware-aborter');

    const timeoutAborter = defineMiddleware(async (context, next) => {
        const { signal, abort } = context as AborterMiddlewareContext;

        let timer: NodeJS.Timeout | null = setTimeout(abort, _timeout);

        const release = () => {
            if (timer) {
                clearTimeout(timer);
            }

            timer = null;
        };

        // Manual abort or timeout abort.
        signal.addEventListener('abort', release);

        const result = await next();

        // Release timer when request successfully
        release();

        return result;
    }, 'fatcher-middleware-timeout-aborter');

    const concurrencyAborter = defineMiddleware(async (context, next) => {
        const { signal, abort } = context as AborterMiddlewareContext;

        const group = groupBy
            ? groupBy(context)
            : `${context.url}_${context.method}_${new URLSearchParams(context.params)}`;

        // Resolve concurrency
        if (roadMap[group] && roadMap[group].length) {
            roadMap[group].forEach(item => item.abort());
        }

        // Setup current request
        if (!roadMap[group]) {
            roadMap[group] = [];
        }

        roadMap[group].push({ abort, signal });

        const release = () => {
            roadMap[group] = roadMap[group].filter(item => {
                // Keep signals which is not aborted.
                return item.signal !== signal;
            });

            if (!roadMap[group].length) {
                delete roadMap[group];
            }
        };

        // Cleanup with abort event triggered.
        signal.addEventListener('abort', release);

        const result = await next();

        // Release current request
        release();

        return result;
    }, 'fatcher-middleware-concurrency-aborter');

    const middlewares = [baseAborter];

    if (_timeout) {
        middlewares.push(timeoutAborter);
    }

    if (concurrency) {
        middlewares.push(concurrencyAborter);
    }

    return middlewares;
}
