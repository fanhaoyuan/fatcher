import { Middleware } from 'fatcher';
import { AborterOptions } from './interfaces';

/**
 * A middleware for aborting fatcher request.
 * @param options
 * @returns
 */
export function aborter(options: AborterOptions = {}): Middleware {
    const { timeout = 0, onAbort = null } = options;

    let _timeout = timeout;

    if (isNaN(timeout) || ~~timeout <= 0) {
        console.warn('[fatcher-middleware-aborter] Timeout is not a valid number.');
        _timeout = 0;
    }

    return {
        name: 'fatcher-middleware-aborter',
        async use(context, next) {
            const abortController = new AbortController();

            const requestTask = next({
                signal: abortController.signal,
            });

            if (!_timeout) {
                return requestTask;
            }

            const timer = setTimeout(() => {
                abortController.abort();
                onAbort?.();
            }, _timeout);

            const response = await requestTask;

            clearTimeout(timer);

            return response;
        },
    };
}
