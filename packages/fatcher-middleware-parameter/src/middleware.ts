import { FatcherMiddleware } from 'fatcher';
import { ParameterOptions } from './types';

export const parameter = (options: ParameterOptions = {}): FatcherMiddleware => {
  return async (req, next) => {
    const { params } = options;

    if (!params) {
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

    querystring = Object.keys(params)
      .reduce<string[]>((result, key) => {
        const value = params[key];

        if (typeof value === 'undefined') {
          return result;
        }

        // Avoid some error in querystring. Just like emoji
        return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(value)}`];
      }, [])
      .join('&');

    return next(new Request(`${base}?${querystring}`));
  };
};
