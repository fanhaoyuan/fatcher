import { isSameOriginURL } from '../helpers';
import { RequestOptions } from '../interfaces';
import { pick } from '../utils';

/**
 * Get credential from request options
 * @param withCredentials
 * @param url
 * @returns
 */
function getCredentials(withCredentials: 'auto' | boolean, url: string): RequestCredentials {
    if (withCredentials === 'auto') {
        if (isSameOriginURL(url)) {
            return 'include';
        }

        return 'omit';
    }

    if (withCredentials) {
        return 'include';
    }

    return 'omit';
}

/**
 * Get headers from request options
 * @param headers
 * @returns
 */
function getHeaders(headers: Record<string, any>): Headers {
    const h = new Headers();

    for (const key of Object.keys(headers)) {
        const value = headers[key];

        if (value) {
            h.append(key, headers[key]);
        }
    }

    return h;
}

/**
 * Return `Browser` or `Node` environment http fetcher.
 * @param url request url
 * @param requestOptions request options
 * @returns
 */
export function fetcher(url: string, requestOptions: RequestOptions) {
    const requestInit: RequestInit = pick(requestOptions, ['body', 'method', 'signal']);

    requestInit.credentials = getCredentials(requestOptions.withCredentials, requestOptions.url);

    requestInit.headers = getHeaders(requestOptions.headers);

    return window.fetch(url, requestInit);
}
