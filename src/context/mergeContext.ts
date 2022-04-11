import { Context, PatchContext } from '../interfaces';

/**
 * Merge context or patch context to a context
 * @param defaultContext
 * @param context
 * @returns
 */
export function mergeContext(defaultContext: Context, ...context: (Context | PatchContext)[]): Context {
    return context.reduce((mergedContext, patchContext) => {
        const { headers } = patchContext;

        /**
         * Deep merge headers
         */
        if (headers) {
            patchContext.headers = Object.assign(mergedContext.headers || {}, headers);
        }

        return Object.assign(mergedContext, patchContext);
    }, Object.assign({}, defaultContext));
}
