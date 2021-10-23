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

/**
 * Clone a new data from source data deeply.
 * @param arg source data
 * @returns
 */
export function cloneDeep(arg: any): any {
    if (Array.isArray(arg)) {
        return arg.map(item => cloneDeep(item));
    }

    if (isFunction(arg)) {
        return arg.bind(null);
    }

    if (arg === null) {
        return arg;
    }

    if (typeof arg === 'object') {
        return Object.keys(arg).reduce((object, key) => {
            return Object.assign({}, object, { [key]: cloneDeep(arg) });
        }, {});
    }

    return arg;
}
