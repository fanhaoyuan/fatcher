/**
 * Transform an object to a query string.
 * @param object
 * @returns
 */
export function stringifyURL(object: Record<string, any>) {
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
