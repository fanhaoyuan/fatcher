/**
 * Get params object by url search params.
 * @returns
 */
export function parse(querystring: string) {
    const params: Record<string, string> = {};

    // Will auto decodeURIComponent with querystring in URLSearchParams
    for (const [key, value] of new URLSearchParams(querystring)) {
        params[key] = value;
    }

    return params;
}
