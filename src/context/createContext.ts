import { Context, RequestOptions } from '../interfaces';
import { normalizeURL } from '../utils';

/**
 * Create initial context by request options
 * @param options
 * @returns
 */
export function createContext(options: RequestOptions): Context {
    const { baseUrl = '', url = '' } = options;

    if (!url) {
        throw new Error('__vp__ URL is required.');
    }

    const normalizedURL = normalizeURL(baseUrl, url);

    return { ...options, url: normalizedURL };
}
