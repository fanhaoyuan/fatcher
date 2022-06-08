import { Context, RequestOptions } from '../interfaces';
import { normalizeURL } from '../utils';

/**
 * Create initial context by request options
 * @param options
 * @returns
 */
export function createContext(options: RequestOptions): Context {
    const { baseUrl = '', url = '', params = {}, headers = {} } = options;

    if (!url) {
        throw new Error('__vp__ URL is required.');
    }

    const [normalizedURL, querystring] = normalizeURL(baseUrl, url).split('?');

    if (querystring) {
        for (const [key, value] of new URLSearchParams(querystring)) {
            params[key] = value;
        }
    }

    const requestHeaders = new Headers();

    for (const [key, value] of Object.entries(headers)) {
        if (value) {
            requestHeaders.set(key, value);
        }
    }

    return { ...options, url: normalizedURL, params, requestHeaders };
}
