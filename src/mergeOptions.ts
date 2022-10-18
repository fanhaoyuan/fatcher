import { RequestOptions } from './interfaces';
import { merge } from '@fatcherjs/utils-shared';

export function mergeOptions(options: RequestOptions, ...patchOptions: Partial<RequestOptions>[]): RequestOptions {
    return merge(options, patchOptions, (merged, current) => {
        const { headers } = current;

        if (headers) {
            current.headers = Object.assign({}, merged.headers || {}, headers);
        }

        return current;
    });
}
