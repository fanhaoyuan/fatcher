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
