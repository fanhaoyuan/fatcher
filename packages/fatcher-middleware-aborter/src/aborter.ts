import { FatcherMiddleware } from 'fatcher';

export const aborter: FatcherMiddleware = {
  name: 'fatcher-middleware-aborter',
  use: async (ctx, next) => {
    const { onAbort, abortController = new AbortController() } = ctx;

    const handler = () => {
      onAbort?.(abortController.signal.reason);
      abortController.signal.removeEventListener('abort', handler);
    };

    if (onAbort) {
      abortController.signal.addEventListener('abort', handler);
    }

    const response = await next({
      abort: abortController.abort.bind(abortController),
      signal: abortController.signal,
    });

    if (onAbort) {
      abortController.signal.removeEventListener('abort', handler);
    }

    return response;
  },
};
