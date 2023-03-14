/**
 * Check current env whether in node.js
 */
export const isNodeJS = () => !!(typeof process !== 'undefined' && process.versions && process.versions.node);

/**
 * Get URL search params by params object.
 *
 * Will filter key which is `undefined`.
 * @param params
 * @returns
 */
export function stringify(params: Record<string, string | undefined>) {
    return Object.keys(params)
        .reduce<string[]>((result, key) => {
            const value = params[key];

            if (typeof value === 'undefined') {
                return result;
            }

            // Avoid some error in querystring. Just like emoji
            return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(value)}`];
        }, [])
        .join('&');
}

/**
 * Get params object by url search params.
 * @returns
 */
export function parse(querystring: string) {
    const params: Record<string, string> = {};

    // Will auto decodeURIComponent with querystring in URLSearchParams
    for (const [key, value] of new URLSearchParams(querystring)) {
        params[key] = value;
    }

    return params;
}

/**
 * Parse a url with `base` and `url`
 *
 * Supports relative url like `../` and `./`
 */
export function parseURL(base: string, url: string) {
    // eslint-disable-next-line prefer-const
    let [_url, querystring] = `${base || '/'}/${url || '/'}`.split('?');

    // Check a string whether is `<schema>://`
    const [schema, isAbsoluteURL] = _url.match(/([a-z][a-z\d+\-.]*:)\/\//gi) || [];

    if (isAbsoluteURL) {
        return url;
    }

    if (schema) {
        if (!_url.startsWith(schema)) {
            return url;
        }

        _url = _url.replace(schema, '');
    }

    const paths: string[] = [];

    for (const path of _url.split('/')) {
        if (path === '..') {
            paths.pop();
        } else if (path && path !== '.') {
            paths.push(path);
        }
    }

    _url = `${schema || '/'}${paths.join('/')}`;

    if (querystring) {
        return `${_url}?${querystring}`;
    }

    return _url;
}

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
