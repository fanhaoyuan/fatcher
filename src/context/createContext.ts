import { Querystring } from '@fatcherjs/utils-shared';
import { Context, RequestMethod, RequestOptions } from '../interfaces';
import { mergeHeaders } from '../mergeHeaders';
import { parseURL } from '../utils';

/**
 * Create initial context by request options
 * @param options
 * @returns
 */
export function createContext(options: RequestOptions): Context {
    const { base = '', url = '', headers = {}, method = 'GET' } = options;

    const defaultHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headers,
    };

    let params = options.params || {};

    const [normalizedURL, querystring] = parseURL(base, url).split('?');

    if (querystring) {
        params = Object.assign({}, params, Querystring.parse(querystring));
    }

    return {
        credentials: 'same-origin',
        cache: 'default',
        redirect: 'follow',
        referrerPolicy: 'no-referrer-when-downgrade',
        mode: 'cors',
        ...options,
        url: normalizedURL,
        params,
        headers: mergeHeaders(new Headers(), defaultHeaders),
        middlewares: [],
        method: method.toUpperCase() as RequestMethod,
    };
}
