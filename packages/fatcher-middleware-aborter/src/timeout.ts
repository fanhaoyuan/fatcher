import { FatcherMiddleware } from 'fatcher';
import { abortSignalAny } from './abortSignalAny';
import { abortSignalTimeout } from './abortSignalTimeout';

export const timeout: FatcherMiddleware = {
  name: 'fatcher-middleware-timeout',
  use: async (context, next) => {
    const { timeout: _timeout = 60000, signal, onTimeout } = context;

    const timeoutSignal = abortSignalTimeout(_timeout);

    const composedSignal = signal ? abortSignalAny([timeoutSignal, signal]) : timeoutSignal;

    composedSignal.addEventListener('abort', () => {
      if (timeoutSignal.aborted) {
        onTimeout?.();
        return;
      }
    });

    return next({
      request: new Request(context.request, { signal: composedSignal }),
    });
  },
};
