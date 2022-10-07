import { getParamsByQuerystring } from '@fatcherjs/utils-shared';
import { Context, RequestOptions } from '../interfaces';
import { parseURL } from '../utils';

/**
 * Create initial context by request options
 * @param options
 * @returns
 */
export function createContext(options: RequestOptions): Context {
    const { baseUrl = '', url = '', headers = {} } = options;

    let params = options.params || {};

    if (!url) {
        throw new Error('__vp__ URL is required.');
    }

    const [normalizedURL, querystring] = parseURL(baseUrl, url).split('?');

    if (querystring) {
        params = Object.assign({}, params, getParamsByQuerystring(querystring));
    }

    const requestHeaders = new Headers();

    for (const [key, value] of Object.entries(headers)) {
        if (value) {
            requestHeaders.set(key, value);
        }
    }

    return { ...options, url: normalizedURL, params, requestHeaders };
}
