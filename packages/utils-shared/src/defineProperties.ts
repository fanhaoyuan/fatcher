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
