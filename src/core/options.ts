import { RequestOptions } from '../interfaces';
import mergeWith from 'lodash/mergewith';

/**
 * Merge multi-options to one.
 *
 * A new object of request options.
 */
export function mergeOptions<T extends RequestOptions>(mergedOptions: T, ...options: Partial<T>[]): T {
    const [currentOptions, ...rest] = options;

    if (!currentOptions) {
        return mergedOptions;
    }

    const merged = mergeWith(mergedOptions, currentOptions);

    return mergeOptions(merged, ...rest);
}
