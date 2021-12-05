/**
 * Confirm a value whether is a string
 * @param value value to confirm
 * @returns
 */
export function isString(value: unknown): value is string {
    return typeof value === 'string';
}
