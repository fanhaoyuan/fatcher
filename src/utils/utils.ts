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
export function defineProperties<T extends Record<string, any>, U>(
    data: T,
    descriptor: (item: T[keyof T]) => PropertyDescriptor,
    prototype: object | null = {}
) {
    return Object.defineProperties<U>(
        Object.create(prototype),
        Object.keys(data).reduce<PropertyDescriptorMap>((propertyDescriptorMap, key) => {
            const propertyDescriptor = descriptor.call(null, data[key]);

            return Object.assign({}, propertyDescriptorMap, { [key]: propertyDescriptor });
        }, {})
    );
}
