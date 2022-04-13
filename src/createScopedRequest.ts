import { fatcher } from './fatcher';
import { RequestOptions } from './interfaces';
import { mergeOptions } from './options';

/**
 * Create a scope fatcher request.
 * @param scopedOptions
 * @returns
 */
export function createScopedRequest<K = any>(scopedOptions: RequestOptions = {}) {
    return function request<T = K>(url: string, payload?: any, inlineOptions: RequestOptions = {}) {
        const options = mergeOptions(scopedOptions, { ...inlineOptions, url, payload });
        return fatcher<T>(options);
    };
}
