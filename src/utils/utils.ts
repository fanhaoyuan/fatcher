/**
 * Judgment whether a variable is function
 * @param f var
 * @returns
 */
export function isFunction(f: unknown): f is Function {
    return typeof f === 'function';
}
