/**
 * Confirm a value whether is a plain object
 * @param value value to confirm
 * @returns
 */
export function isPlainObject(value: unknown): value is Record<string, any> {
    return Function.prototype.call.bind(Object.prototype.toString)(value) === '[object Object]';
}

/**
 * Confirm a value whether is a string
 * @param value value to confirm
 * @returns
 */
export function isString(value: unknown): value is string {
    return typeof value === 'string';
}

/**
 * Confirm a value whether is a function
 * @param value value to confirm
 * @returns
 */
export function isFunction(value: unknown): value is (...args: any[]) => any {
    return typeof value === 'function';
}

/**
 * Create a random string.
 * @param length
 * @returns
 */
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
 * Deep defineProperties.
 * @param data a object
 * @param descriptor
 * @returns
 *
 * A new object with custom descriptor.
 */
export function defineProperties<T extends Record<string, any>>(
    data: T,
    descriptor: (item: T[keyof T]) => PropertyDescriptor,
    prototype: object | null = {}
) {
    return Object.defineProperties(
        Object.create(prototype),
        Object.keys(data).reduce<PropertyDescriptorMap>((propertyDescriptorMap, key) => {
            const propertyDescriptor = descriptor.call(null, data[key]);

            return Object.assign({}, propertyDescriptorMap, { [key]: propertyDescriptor });
        }, {})
    );
}

/**
 * Creates an object composed of the picked `object` properties.
 * @param record
 * @param picks
 * @returns
 */
export function pick<T extends Record<string, any>, K extends keyof T>(record: T, picks: K[]): Pick<T, K> {
    return Object.keys(record)
        .filter(key => picks.includes(key as K))
        .reduce((result, key) => Object.assign({}, result, { [key]: record[key] }), Object.create({}));
}

/**
 * This method creates an object composed of the own and inherited enumerable properties of object that are not omitted.
 * @param record
 * @param omits
 */
export function omit<T extends Record<string, any>, K extends keyof T>(record: T, omits: K[]): Omit<T, K> {
    return pick(
        record,
        Object.keys(record).filter(key => !omits.includes(key as K))
    ) as Omit<T, K>;
}

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
            object[key] = merge(object[key], value);
            continue;
        }

        object[key] = source[key];
    }

    return object;
}

/**
 * Creates a deeply clone of value.
 * @param value value to clone
 */
export function cloneDeep<T>(value: T): T {
    let clonedData;

    if (isPlainObject(value)) {
        clonedData = {};

        for (const key in value) {
            clonedData[key] = cloneDeep(value[key]);
        }

        return clonedData;
    }

    if (Array.isArray(value)) {
        clonedData = [];

        for (const item of value as unknown[]) {
            clonedData.push(cloneDeep(item));
        }

        return clonedData;
    }

    return value;
}
