/**
 * Merge many objects to one.
 */
export function merge<T extends Record<string, any>>(
    initial: T,
    patches: Partial<T>[],
    customMerge: (merged: T, patch: Partial<T>) => Partial<T>
): T {
    return patches.reduce(
        (merged, patch) => Object.assign(merged, customMerge(merged, patch)),
        Object.assign(Object.create(null), initial)
    );
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
