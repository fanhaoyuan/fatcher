export const isDev = process.env.NODE_ENV === 'development';

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

const VerbosityPrefix = '[Fatcher]';

export function log(message: string) {
    if (isDev) {
        console.log(`${VerbosityPrefix} ${message}`);
    }
}

export function warn(message: string) {
    if (isDev) {
        console.warn(`${VerbosityPrefix} ${message}`);
    }
}

export function error(message: string) {
    console.error(`${VerbosityPrefix} ${message}`);
}

export function unreachable(reason: string): never {
    throw new Error(`${VerbosityPrefix} ${reason}`);
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
export function immutable<T extends Record<string, any>>(record: T): T {
    return new Proxy(record, {
        set(key) {
            warn(`Immutable object, ${key} can not be assigned.`);

            return false;
        },
    });
}
