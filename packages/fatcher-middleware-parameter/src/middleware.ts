import { FatcherMiddleware } from 'fatcher';
import { defaultSerializer } from './defaultSerializer';
import { ParameterOptions } from './types';

export const parameter = (options: ParameterOptions = {}) => {
  const { serializer = defaultSerializer } = options;

  return (async (req, next) => {
    const {
      options: { params = {} },
    } = req;

    if (!Object.keys(params).length) {
      return next();
    }

    // eslint-disable-next-line prefer-const
    let [base, querystring] = req.url.split('?');

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

    return next(new Request(querystring ? `${base}?${querystring}` : base));
  }) as FatcherMiddleware;
};
