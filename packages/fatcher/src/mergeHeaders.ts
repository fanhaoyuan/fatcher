/**
 * Merge headers into a headers
 * @param headers 
 * @param patchHeaders 
 * @returns 
 */
export function mergeHeaders(headers: Headers, patchHeaders: Headers | Record<string, string>) {
    for (const [key, value] of Object.entries(patchHeaders)) {
        headers.set(key, value);
    }

    return headers;
}
