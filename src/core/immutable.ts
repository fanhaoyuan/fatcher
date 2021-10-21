import { Immutable } from '../interfaces';

/**
 * Set a plain object to readonly.
 * @param rawData
 * @returns
 */
export function immutable<T extends Record<string, any>>(rawData: T) {
    return Object.defineProperties<Immutable<T>>(
        Object.create(null),
        Object.keys(rawData).reduce<PropertyDescriptorMap>((propertyDescriptorMap, key) => {
            const value = rawData[key];

            const propertyDescriptor: PropertyDescriptor = {
                value: typeof value === 'object' ? immutable(value) : value,
                writable: false,
                enumerable: true,
                configurable: false,
            };

            return Object.assign({}, propertyDescriptorMap, { [key]: propertyDescriptor });
        }, {})
    );
}

/**
 * Reset a readonly object to plain.
 * @param immutableData
 * @returns
 */
export function toRaw<T extends Record<string, any>>(immutableData: Immutable<T>): T {
    return Object.defineProperties<T>(
        Object.create(null),
        Object.keys(immutableData).reduce<PropertyDescriptorMap>((propertyDescriptorMap, key) => {
            const value = immutableData[key];

            const propertyDescriptor: PropertyDescriptor = {
                value: typeof value === 'object' ? toRaw(value) : value,
                writable: true,
                enumerable: true,
                configurable: true,
            };

            return Object.assign({}, propertyDescriptorMap, { [key]: propertyDescriptor });
        }, {})
    );
}
