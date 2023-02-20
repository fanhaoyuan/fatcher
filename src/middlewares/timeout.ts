import { defineMiddleware } from '../helpers';
import { isFunction } from '../utils';

export function timeout(time = 60 * 1000) {
    if (isNaN(time) || ~~time < 0) {
        return null;
    }

    return defineMiddleware(async (context, next) => {
        let { signal, abort } = context;

        // Never used aborter.
        if (!signal) {
            // If env supports AbortSignal.timeout. Use it.
            if (isFunction(AbortSignal.timeout)) {
                return next({
                    signal: AbortSignal.timeout(time),
                });
            }

            const controller = new AbortController();

            signal = controller.signal;

            if (!abort) {
                abort = controller.abort;
            }
        }

        let timer: NodeJS.Timeout | null = null;

        const release = () => {
            if (timer) {
                clearTimeout(timer);
            }

            timer = null;
        };

        signal.addEventListener('abort', release);

        const result = await next({
            signal,
            abort,
        });

        release();

        return result;
    }, 'fatcher-middleware-timeout');
}
