import { FatcherMiddleware } from 'fatcher';
import { defaultSerializer } from './defaultSerializer';

export const parameters: FatcherMiddleware = {
  name: 'fatcher-middleware-parameters',
  use: async (context, next) => {
    const { params = {}, serializer = defaultSerializer } = context;

    if (!Object.keys(params).length) {
      return next();
    }

    // eslint-disable-next-line prefer-const
    let [base, querystring] = context.request.url.split('?');

    if (querystring) {
      for (const [key, value] of new URLSearchParams(querystring)) {
        // Prefer Context Params.
        if (params[key]) {
          continue;
        }

        params[key] = value;
      }
    }

    querystring = serializer(params);

    return next({ params, request: new Request(querystring ? `${base}?${querystring}` : base) });
  },
};
