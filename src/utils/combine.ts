import { merge } from './merge';
import { Context, RequestOptions } from '../interfaces';

/**
 * Merge headers into a headers
 * @param headers
 * @param patchHeaders
 * @returns
 */
export function mergeHeaders(headers: HeadersInit, patchHeaders: HeadersInit) {
    const h = headers instanceof Headers ? headers : new Headers();

    for (const [key, value] of Object.entries(patchHeaders)) {
        h.set(key, value);
    }

    return h;
}

export function combine<T extends RequestOptions | Context>(record: T, ...patches: Partial<T>[]): T {
    return merge(record, patches, (merged, patch) => {
        if (patch.headers) {
            patch.headers = mergeHeaders(merged.headers || new Headers(), patch.headers);
        }

        return patch;
    });
}
