import { fatcher } from '../core';
import { RequestBody, RequestOptions } from '../interfaces';
import { combine } from '../utils';

/**
 * Create a scope fatcher request.
 * @param scopedOptions
 * @returns
 */
export function createScopedRequest<K = any>(scopedOptions: RequestOptions = {}) {
    return function request<T = K>(url: string, body?: RequestBody, inlineOptions: RequestOptions = {}) {
        const options = combine(scopedOptions, { ...inlineOptions, url, body });
        return fatcher<T>(options);
    };
}
