import { FatcherMiddleware } from 'fatcher';
import { AborterOptions } from './types';

export const aborter = (options: AborterOptions = {}): FatcherMiddleware => {
  return async (req, next) => {
    const { onAbort, timeout } = options;
    const abortController = new AbortController();

    if (onAbort) {
      abortController.signal.addEventListener('abort', () => onAbort());
    }

    const promise = next({
      abort: abortController.abort,
      signal: abortController.signal,
    });

    let timer = null;

    if (timeout) {
      timer = setTimeout(() => {
        abortController.abort();
      }, timeout);
    }

    const response = await promise;

    if (timer) {
      clearTimeout(timer);
    }

    return response;
  };
};
