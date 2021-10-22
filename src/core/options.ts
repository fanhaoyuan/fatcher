import { RequestOptions } from '../interfaces';
/**
 * Format headers to plain object.
 * @param headers
 * @returns
 */
export function getPlainHeaders<T extends HeadersInit>(headers: T): Record<string, string> {
    if (Array.isArray(headers)) {
        return Object.fromEntries(headers as string[][]);
    }

    if (headers instanceof Headers) {
        const target: Record<string, string> = Object.create(null);

        for (const [key, value] of headers) {
            target[key] = value;
        }

        return target;
    }

    return headers;
}

/**
 * Merge multi-headers to a headers.
 * @param headers
 * @returns
 */
export function mergeHeaders<T extends HeadersInit>(...headers: T[]): Record<string, string> {
    const mergedHeaders: Record<string, string> = Object.create(null);

    for (const header of headers) {
        const plainHeaders = header instanceof Headers ? getPlainHeaders(header) : header;

        Object.assign(mergedHeaders, plainHeaders);
    }

    return mergedHeaders;
}

/**
 * Merge multi-options to one.
 *
 * A new object of request options.
 */
export function mergeOptions(...options: RequestOptions[]): RequestOptions {
    const [mergedOptions, currentOptions] = options;

    if (!mergedOptions) {
        return {};
    }

    if (!currentOptions) {
        return mergedOptions;
    }

    if (mergedOptions.headers && currentOptions.headers) {
        mergedOptions.headers = mergeHeaders(mergedOptions.headers, currentOptions.headers);
    }

    return mergeOptions(Object.assign({}, mergedOptions, currentOptions), ...options.slice(2));
}
