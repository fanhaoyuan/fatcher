/**
 * Check a value whether is a plain object.
 *
 * Reference to `lodash.isPlainObject`
 *
 * @license MIT
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 *
 * Based on Underscore.js, copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors <http://underscorejs.org/>
 */
export function isPlainObject(value: unknown): value is Record<string, any> {
    if (
        !(Object.prototype.toString.call(value) === '[object Object]') ||
        !(typeof value === 'object' && value !== null)
    ) {
        return false;
    }

    if (Object.getPrototypeOf(value) === null) {
        return true;
    }

    let proto = value;

    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(value) === proto;
}
