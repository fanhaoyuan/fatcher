/**
 * Confirm a url whether is a absolute url.
 * @param url url to confirm
 * @returns
 */
export function isAbsoluteURL(url: string) {
    return /^http(s)?:\/\/.+/.test(url);
}

function normalize(url: string) {
    let protocol: string;

    return url
        .replace(/http(s?):\/\//, (str: string) => {
            protocol = str;
            return '';
        })
        .replace(/\/\/(\/)?/g, '/')
        .replace(/.*\S/, str => (protocol ?? '') + str);
}

/**
 * Normalize a url with `baseURL` and `url`
 *
 * @param baseURL
 * @param url
 */
export function normalizeURL(baseURL: string, url: string) {
    if (!url) {
        return baseURL;
    }
    /**
     * If baseURL is not set and url is a absolute url
     *
     * return url
     */
    if (isAbsoluteURL(url)) {
        return normalize(url);
    }

    if (baseURL === '/') {
        return url;
    }

    return normalize(`${baseURL}/${url}`);
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
