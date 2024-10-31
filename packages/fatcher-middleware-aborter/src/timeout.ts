import { FatcherMiddleware, FatcherResponse } from 'fatcher';

export const timeout = () => {
  return (async (req, next) => {
    const {
      abort,
      options: { timeout: _timeout },
    } = req;

    let timer = null;

    if (_timeout) {
      timer = setTimeout(() => {
        abort();
      }, _timeout);
    }

    let response: FatcherResponse;

    try {
      response = await next();
    } catch (error) {
      if (timer) {
        clearTimeout(timer);
      }
      throw error;
    }

    return response;
  }) as FatcherMiddleware;
};
