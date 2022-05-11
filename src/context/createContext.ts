import { Context, RequestOptions } from '../interfaces';
import { normalizeURL, unreachable } from '../utils';

/**
 * Create initial context by request options
 * @param options
 * @returns
 */
export function createContext(options: RequestOptions): Context {
    const { baseUrl = '', url = '' } = options;

    if (!url) {
        return unreachable('URL is required.');
    }

    const normalizedURL = normalizeURL(baseUrl, url);

    return { ...options, url: normalizedURL };
}
