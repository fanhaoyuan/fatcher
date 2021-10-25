/**
 * Creates an object composed of the picked object properties.
 * @param object
 * @param array
 * @returns
 */
export function pick<T extends Record<string, any>, K extends keyof T>(object: T, array: K[]): Pick<T, K> {
    return (
        Object.keys(object)
            //@ts-expect-error
            .filter(key => array.includes(key))
            .reduce((pre, cur) => {
                return Object.assign({}, pre, { [cur]: object[cur] });
            }, Object.create(null))
    );
}

/**
 * Omit an object composed from the picked object properties.
 * @param object
 * @param array
 * @returns
 */
export function omit<T extends Record<string, any>, K extends keyof T>(object: T, array: K[]) {
    return pick(
        object,
        //@ts-expect-error
        Object.keys(object).filter(key => !array.includes(key))
    ) as Exclude<T, K>;
}

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

export function isPlainObject(o: unknown): o is object {
    return typeof o === 'object' && o !== null && !Array.isArray(o);
}

export function isUndefined(u: unknown): u is undefined {
    return typeof u === 'undefined';
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

    if (isPlainObject(arg)) {
        return Object.keys(arg).reduce((object, key) => {
            return Object.assign({}, object, { [key]: cloneDeep(arg) });
        }, {});
    }

    return arg;
}

/**
 * Deep merge two object to a new object.
 * @param object
 * @param patch
 * @returns
 */
export function merge<T extends Record<string, any>>(object: T, patch: Partial<T> = {}): T {
    for (const key in patch) {
        const source = object[key];
        const target = patch[key];

        if (isPlainObject(patch)) {
            object[key] = merge(source, target);
        }

        // Exclude undefined values
        object[key] = isUndefined(target) ? source : (target as T[Extract<keyof T, string>]);
    }

    return object;
}
