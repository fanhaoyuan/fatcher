/**
 * Confirm a data can be transform.
 * @param response
 * @returns
 */
export function canActivate(data: unknown): data is Response {
    return data instanceof Response && !data.bodyUsed && !!data.body;
}
