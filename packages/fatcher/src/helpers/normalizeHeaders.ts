/**
 * Format headers to plain object.
 * @param headers
 * @returns
 */
export function normalizeHeaders(headers: Headers | string[][] | Record<string, string>) {
    if (Array.isArray(headers)) {
        return headers.reduce<Record<string, string>>((head, entries) => {
            const [key, value] = entries;
            return Object.assign({}, head, { [key]: value });
        }, {});
    }

    if (headers instanceof Headers) {
        const target: Record<string, string> = Object.create(null);

        for (const [key, value] of headers) {
            target[key] = value;
        }

        return target;
    }

    return headers;
}
