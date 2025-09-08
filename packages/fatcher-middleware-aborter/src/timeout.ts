import { FatcherMiddleware } from 'fatcher';

export const timeout: FatcherMiddleware = {
  name: 'fatcher-middleware-timeout',
  use: async (req, next) => {
    const { abort, timeout: _timeout } = req;

    let timer = null;

    if (_timeout) {
      timer = setTimeout(() => {
        abort();
      }, _timeout);
    }

    let response;

    try {
      response = await next();
    } catch (error) {
      if (timer) {
        clearTimeout(timer);
      }
      throw error;
    }

    return response;
  },
};
