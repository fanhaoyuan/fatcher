import { RequestOptions } from '../interfaces';

export function mergeOptions(
    defaultOptions: RequestOptions,
    ...patchOptions: Partial<RequestOptions>[]
): RequestOptions {
    return patchOptions.reduce((mergedOptions, options) => {
        const { headers } = options;

        if (headers) {
            options.headers = Object.assign({}, mergedOptions.headers || {}, headers);
        }

        return Object.assign(mergedOptions, options);
    }, Object.assign({}, defaultOptions));
}
