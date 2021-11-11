import { MockerOptions } from './interfaces';

/**
 * Merge many options to a object of mocker options.
 * @param options a array of mocker options
 * @returns
 */
export function mergeOptions(...options: MockerOptions[]): MockerOptions {
    const [mergedOptions, currentOptions] = options;

    if (!currentOptions) {
        return mergedOptions;
    }

    return mergeOptions(Object.assign(mergedOptions, currentOptions), ...options.slice(1));
}
