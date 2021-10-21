import { Immutable } from '../interfaces';

/**
 * Return `Browser` or `Node` environment http fetcher.
 * @param url request url
 * @param requestOptions request options
 * @returns
 */
export function fetcher<T extends ResponseInit>(url: string, requestOptions?: Immutable<T> | T) {
    return globalThis.fetch(url, requestOptions);
}
