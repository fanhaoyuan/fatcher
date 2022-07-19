/**
 * Normalize a url with `baseURL` and `url`
 *
 * Supports relative url like `../` and `./`
 *
 * @param baseURL
 * @param url
 */
export function normalizeURL(baseURL: string, url: string) {
    let _url = `${baseURL}/${url}`;
    let schema = '';

    // Check a string whether is `<schema>://`
    const [a, b] = _url.matchAll(/([a-z][a-z\d+\-.]*:)\/\//gi);

    if (b) {
        return url;
    }

    if (a) {
        schema = a[0];
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

    return `${schema || '/'}${paths.join('/')}`;
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
 * Set a plain object to readonly.
 * @param rawData
 * @returns
 */
export function immutable<T extends Record<string, any>>(record: T): Readonly<T> {
    return new Proxy(record, {
        set() {
            return true;
        },
    });
}

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
