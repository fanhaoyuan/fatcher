import { RequestOptions } from '../interfaces';
import merge from 'lodash/merge';

/**
 * Merge multi-options to one.
 *
 * A new object of request options.
 */
export function mergeOptions<T extends RequestOptions>(mergedOptions: T, ...options: Partial<T>[]): T {
    return merge({}, mergedOptions, ...options);
}
