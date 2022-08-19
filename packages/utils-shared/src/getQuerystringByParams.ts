/**
 * Get URL search params by params object.
 *
 * Will filter key which is `undefined`.
 * @param params
 * @returns
 */
export function getQuerystringByParams(params: Record<string, string | undefined>) {
    const array = Object.keys(params).reduce<string[]>((result, key) => {
        const value = params[key];

        if (typeof value === 'undefined') {
            return result;
        }

        return [...result, `${key}=${value}`];
    }, []);

    return array.join('&');
}
