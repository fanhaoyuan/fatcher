import { isPlainObject } from './isPlainObject';

/**
 * Source objects are applied from left to right. Subsequent sources overwrite property assignments of previous sources.
 */
export function merge<T extends Record<string, any>, K extends Record<string, any>>(record: T, source: K): T & K;
export function merge<T extends Record<string, any>, K extends Record<string, any>, P extends Record<string, any>>(
    record: T,
    source1: K,
    source: P
): T & K & P;
export function merge<
    T extends Record<string, any>,
    K extends Record<string, any>,
    P extends Record<string, any>,
    U extends Record<string, any>
>(record: T, source1: K, source2: P, source3: U): T & K & P & U;
export function merge<
    T extends Record<string, any>,
    K extends Record<string, any>,
    P extends Record<string, any>,
    U extends Record<string, any>,
    V extends Record<string, any>
>(record: T, source1: K, source2: P, source3: U, source4: V): T & K & P & U & V;
export function merge(object: any, ...sources: any[]): any;
export function merge(object: Record<string, any>, ...sources: Record<string, any>[]) {
    const [source] = sources;

    if (!source) {
        return object;
    }

    for (const key in source) {
        const value = source[key];

        if (typeof value === 'undefined') {
            continue;
        }

        if (isPlainObject(value)) {
            object[key] = merge(object[key] ?? {}, value);
            continue;
        }

        object[key] = value;
    }

    return merge(object, ...sources.slice(1));
}
