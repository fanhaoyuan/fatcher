import { FatcherMiddleware } from 'fatcher';

export const aborter = () => {
  return (async (req, next) => {
    const { onAbort, abortController = new AbortController() } = req.options;

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
  }) as FatcherMiddleware;
};
