import defineMiddleware from './defineMiddleware';

export default defineMiddleware({
    name: 'fatcher-middleware-timeout',
    async use(context, next) {
        const { timeout = 60 * 1000 } = context;
        let { signal, abort } = context;

        if (timeout <= 0) {
            return next();
        }

        // Never used aborter.
        if (!signal) {
            // If env supports AbortSignal.timeout. Use it.
            if (typeof AbortSignal.timeout === 'function') {
                return next({
                    signal: AbortSignal.timeout(timeout),
                });
            }

            const controller = new AbortController();

            signal = controller.signal;

            if (!abort) {
                abort = controller.abort;
            }
        }

        let timer: NodeJS.Timeout | null = null;

        const clear = () => {
            if (timer) {
                clearTimeout(timer);
            }

            timer = null;
        };

        signal.addEventListener('abort', clear);

        const response = await next({
            signal,
            abort,
        });

        clear();

        return response;
    },
});
