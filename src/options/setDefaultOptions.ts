import { RequestOptions } from '../interfaces';
import { defaultOptions } from './defaultOptions';

/**
 * Set Default Fatcher Request Options.
 *
 * Tips:
 *
 * If change default options, will `effect` any fatcher instances.
 *
 * If you want to have a scope options with fatcher. Use `createScopedRequest` instead.
 *
 * Inline Options `>` Scoped Options `>` Default Options
 */
export function setDefaultOptions<T extends RequestOptions>(patchRequestOptions: Partial<T>) {
    Object.assign(defaultOptions, patchRequestOptions);
}
