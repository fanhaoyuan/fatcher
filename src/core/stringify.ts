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
