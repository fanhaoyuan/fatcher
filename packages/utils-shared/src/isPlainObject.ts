/**
 * Confirm a value whether is a plain object
 * @param value value to confirm
 * @returns
 */
export function isPlainObject(value: unknown): value is Record<string, any> {
    return Function.prototype.call.bind(Object.prototype.toString)(value) === '[object Object]';
}
