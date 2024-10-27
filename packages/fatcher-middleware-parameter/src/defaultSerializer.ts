import { RequestParameters } from './types';

export function defaultSerializer(params: RequestParameters) {
  return Object.keys(params)
    .reduce<string[]>((result, key) => {
      const value = params[key];

      if (typeof value === 'undefined') {
        return result;
      }

      return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(value)}`];
    }, [])
    .join('&');
}
