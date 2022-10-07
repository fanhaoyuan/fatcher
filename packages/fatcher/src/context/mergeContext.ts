import { Context, PatchContext } from '../interfaces';
import { merge } from '@fatcherjs/utils-shared';

/**
 * Merge context or patch context to a context
 * @param context
 * @param patchContext
 * @returns
 */
export function mergeContext(context: Context, ...patchContext: PatchContext[]): Context {
    return merge(context, patchContext, (merged, current) => {
        const { headers } = current;

        /**
         * Deep merge headers
         */
        if (headers) {
            current.headers = Object.assign(merged.headers || {}, headers);

            for (const [key, value] of Object.entries(headers)) {
                if (value) {
                    context.requestHeaders.set(key, value);
                }
            }
        }

        return current;
    });
}
