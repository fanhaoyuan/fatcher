import { FatcherMiddleware } from 'fatcher';
import { FatcherError } from './FatcherError';

export const exception: FatcherMiddleware = {
  name: 'fatcher-middleware-exception',
  use: async (context, next) => {
    const { validateCode } = context;

    const response = await next();

    if (validateCode?.(response.status)) {
      return response;
    }

    if (response.ok) {
      return response;
    }

    return Promise.reject(new FatcherError(context, response));
  },
};
