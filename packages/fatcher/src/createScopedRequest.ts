import { fatcher } from './fatcher';
import { RequestBody, RequestOptions } from './interfaces';
import { mergeOptions } from './options';

/**
 * Create a scope fatcher request.
 * @param scopedOptions
 * @returns
 */
export function createScopedRequest<K = any>(scopedOptions: RequestOptions = {}) {
    return function request<T = K>(url: string, body?: RequestBody, inlineOptions: RequestOptions = {}) {
        const options = mergeOptions(scopedOptions, { ...inlineOptions, url, body });
        return fatcher<T>(options);
    };
}
