import { mergeOptions } from './options';
import { PatchRequestContext, RequestContext } from '../interfaces';
import omit from 'lodash/omit';

/**
 * Merge multi-request context into a context
 * @param context source context
 * @param targetContext patch context
 * @returns
 * A new context of merged.
 */
export function mergeContext(context: RequestContext, targetContext: PatchRequestContext): RequestContext {
    let ctx = targetContext;

    if (ctx.options) {
        context.options = mergeOptions(context.options, ctx.options);

        // Options merged. Omit it.
        ctx = omit(targetContext, ['options']);
    }

    // Plain merge for assign.
    return Object.assign({}, context, ctx);
}
