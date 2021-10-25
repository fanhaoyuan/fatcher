/**
 * Transform an object to a query string.
 * @param object
 * @returns
 */
export function stringify(object: Record<string, any>) {
    return Object.keys(object)
        .reduce<string[]>((array, key) => {
            let k, v;

            try {
                k = encodeURIComponent(key);
                v = encodeURIComponent(object[key] ?? '');
            } catch {
                return array;
            }

            return array.concat([`${k}=${v}`]);
        }, [])
        .join('&');
}

/**
 * Parse a query string to a plain object
 * @param url
 * @returns
 */
export function parse(url: string) {
    const object: Record<string, any> = {};

    if (!url) {
        return object;
    }

    const matched = url.match(/([^=?#&]+)=?([^&]*)/g);

    if (!matched) {
        return object;
    }

    for (const match of matched) {
        let [key, value] = match.split('=');

        try {
            key = decodeURIComponent(key);
        } catch {
            continue;
        }

        try {
            value = decodeURIComponent(value);
        } catch {
            continue;
        }

        object[key] = value ?? '';
    }

    return object;
}
