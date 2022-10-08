import { Context } from '../interfaces';
import { merge } from '@fatcherjs/utils-shared';
import { mergeHeaders } from '../mergeHeaders';

/**
 * Merge context or patch context to a context
 * @param context
 * @param patchContext
 * @returns
 */
export function mergeContext(context: Context, ...patchContext: Partial<Context>[]): Context {
    return merge(context, patchContext, (merged, current) => {
        const { headers } = current;

        /**
         * Deep merge headers
         */
        if (headers) {
            current.headers = mergeHeaders(context.headers, headers);
        }

        return current;
    });
}
