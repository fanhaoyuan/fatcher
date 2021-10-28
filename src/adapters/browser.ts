import { RequestOptions } from '../interfaces';

/**
 * Return `Browser` or `Node` environment http fetcher.
 * @param url request url
 * @param requestOptions request options
 * @returns
 */
export function fetcher(url: string, requestOptions?: RequestOptions) {
    return window.fetch(url, requestOptions);
}
