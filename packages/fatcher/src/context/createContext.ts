import { Querystring } from '@fatcherjs/utils-shared';
import { Context, RequestMethod, RequestOptions } from '../interfaces';
import { parseURL } from '../utils';

/**
 * Create initial context by request options
 * @param options
 * @returns
 */
export function createContext(options: RequestOptions): Context {
    const { base = '', url = '', headers = {}, method = 'GET' } = options;

    let params = options.params || {};

    const [normalizedURL, querystring] = parseURL(base, url).split('?');

    if (querystring) {
        params = Object.assign({}, params, Querystring.parse(querystring));
    }

    return {
        ...options,
        url: normalizedURL,
        params,
        headers: new Headers(headers),
        middlewares: [],
        method: method.toUpperCase() as RequestMethod,
    };
}
