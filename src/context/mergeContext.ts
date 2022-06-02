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

            for (const [key, value] of Object.entries(headers)) {
                if (value) {
                    defaultContext.requestHeaders.set(key, value);
                }
            }
        }

        return Object.assign(mergedContext, patchContext);
    }, Object.assign(Object.create(null), defaultContext));
}
