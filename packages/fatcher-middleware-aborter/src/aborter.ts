import { FatcherMiddleware } from 'fatcher';
import { abortSignalAny } from './abortSignalAny';

export const aborter: FatcherMiddleware = {
  name: 'fatcher-middleware-aborter',
  use: async (request, next) => {
    const { onAbort, signal } = request;

    const abortController = new AbortController();

    const abort = () => {
      abortController.abort();
      onAbort?.(abortController.signal.reason);
    };

    const response = await next({
      abort: abortController.abort.bind(abortController),
      signal: signal ? abortSignalAny([abortController.signal, signal]) : abortController.signal,
    });

    response.abort = abort;

    return response;
  },
};
