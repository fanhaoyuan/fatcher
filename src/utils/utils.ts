export function uuid(length = 6) {
    const STRING_TEMPLATE = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const coefficient = STRING_TEMPLATE.length;

    let string = '';

    for (let i = 0; i < length; i++) {
        string += STRING_TEMPLATE.charAt(Math.floor(Math.random() * coefficient));
    }
    return string;
}
/**
 * Judgment whether a variable is function
 * @param f var
 * @returns
 */
export function isFunction(f: unknown): f is Function {
    return typeof f === 'function';
}

export function isString(s: unknown): s is string {
    return typeof s === 'string';
}
