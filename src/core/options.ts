import { RequestOptions } from '../interfaces';
import { normalizeHeaders } from '../helpers';

/**
 * Merge multi-headers to a headers.
 * @param headers
 * @returns
 */
export function mergeHeaders<T extends HeadersInit>(...headers: T[]): Record<string, string> {
    const mergedHeaders: Record<string, string> = Object.create(null);

    for (const header of headers) {
        const plainHeaders = header instanceof Headers ? normalizeHeaders(header) : header;

        Object.assign(mergedHeaders, plainHeaders);
    }

    return mergedHeaders;
}

/**
 * Merge multi-options to one.
 *
 * A new object of request options.
 */
export function mergeOptions<T extends RequestOptions>(mergedOptions: T, ...options: Partial<T>[]): T {
    const [currentOptions] = options;

    if (!currentOptions) {
        return mergedOptions;
    }

    if (mergedOptions.headers && currentOptions.headers) {
        mergedOptions.headers = mergeHeaders(mergedOptions.headers, currentOptions.headers);
    }

    return mergeOptions(Object.assign({}, mergedOptions, currentOptions), ...options.slice(1));
}
