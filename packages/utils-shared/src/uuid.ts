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
