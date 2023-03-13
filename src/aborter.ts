import defineMiddleware from './defineMiddleware';

export default defineMiddleware({
    name: 'fatcher-middleware-aborter',
    use(context, next) {
        const { onAbort } = context;

        const abortController = new AbortController();

        if (onAbort) {
            abortController.signal.addEventListener('abort', () => onAbort());
        }

        return next({
            signal: abortController.signal,
            abort: abortController.abort,
        });
    },
});
