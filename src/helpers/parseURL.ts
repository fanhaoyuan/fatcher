/**
 * Parse a query string to a plain object
 * @param url
 * @returns
 */
export function parseURL(url: string) {
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
            value = decodeURIComponent(value);
        } catch {
            continue;
        }

        object[key] = value ?? '';
    }

    return object;
}
