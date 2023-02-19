import { defineMiddleware } from '../helpers';

export function aborter(onAbort?: () => void) {
    return defineMiddleware((context, next) => {
        const abortController = new AbortController();

        if (onAbort) {
            abortController.signal.addEventListener('abort', () => onAbort());
        }

        return next({
            signal: abortController.signal,
            abort: abortController.abort.bind(abortController),
        });
    }, 'fatcher-middleware-aborter');
}
