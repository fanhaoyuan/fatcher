import { Immutable } from '../interfaces';

/**
 * Deep defineProperties.
 * @param data a object
 * @param descriptor
 * @returns
 *
 * A new object with custom descriptor.
 */
function defineProperties<T extends Record<string, any>, U>(
    data: T,
    descriptor: (item: T[keyof T]) => PropertyDescriptor
) {
    return Object.defineProperties<U>(
        Object.create(null),
        Object.keys(data).reduce<PropertyDescriptorMap>((propertyDescriptorMap, key) => {
            const propertyDescriptor = descriptor.call(null, data[key]);

            return Object.assign({}, propertyDescriptorMap, { [key]: propertyDescriptor });
        }, {})
    );
}

/**
 * Set a plain object to readonly.
 * @param rawData
 * @returns
 */
export function immutable<T extends Record<string, any>>(rawData: T): Immutable<T> {
    return defineProperties<T, Immutable<T>>(rawData, item => {
        return {
            value: typeof item === 'object' ? immutable(item) : item,
            writable: false,
            enumerable: true,
            configurable: false,
        };
    });
}

/**
 * Reset a readonly object to plain.
 * @param immutableData
 * @returns
 */
export function toRaw<T extends Record<string, any>>(immutableData: Immutable<T>): T {
    return defineProperties<Immutable<T>, T>(immutableData, item => {
        return {
            value: typeof item === 'object' ? toRaw(item) : item,
            writable: true,
            enumerable: true,
            configurable: true,
        };
    });
}
