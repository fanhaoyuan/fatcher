import { mergeOptions } from './options';
import { RequestContext } from '../interfaces';
import { omit } from '../utils';

/**
 * Merge multi-request context into a context
 * @param context source context
 * @param targetContext patch context
 * @returns
 * A new context of merged.
 */
export function mergeContext<T extends RequestContext>(context: T, targetContext: Partial<T>): T {
    let ctx = targetContext;

    if (ctx.options) {
        context.options = mergeOptions(context.options, ctx.options);

        // Options merged. Omit it.
        ctx = omit(targetContext, ['options']);
    }

    // Plain merge for assign.
    return Object.assign({}, context, ctx);
}
