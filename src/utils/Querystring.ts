/**
 * A static class for querystring
 */
export class Querystring {
    /**
     * Get params object by url search params.
     * @returns
     */
    static parse(querystring: string) {
        const params: Record<string, string> = {};

        // Will auto decodeURIComponent with querystring in URLSearchParams
        for (const [key, value] of new URLSearchParams(querystring)) {
            params[key] = value;
        }

        return params;
    }

    /**
     * Get URL search params by params object.
     *
     * Will filter key which is `undefined`.
     * @param params
     * @returns
     */
    static stringify(params: Record<string, string | undefined>) {
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
}
