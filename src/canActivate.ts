/**
 * Confirm a value can be transform.
 * @param response
 * @returns
 */
export default function canActivate(value: unknown): value is Response {
    return value instanceof Response && !value.bodyUsed && !!value.body;
}
