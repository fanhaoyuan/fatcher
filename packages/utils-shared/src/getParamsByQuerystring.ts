/**
 * Get params object by url search params.
 * @returns
 */
export function getParamsByQuerystring(querystring: string) {
    const params: Record<string, string> = {};

    for (const [key, value] of new URLSearchParams(querystring)) {
        params[key] = value;
    }

    return params;
}
