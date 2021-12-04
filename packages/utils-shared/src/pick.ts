/**
 * Creates an object composed of the picked `object` properties.
 * @param record
 * @param picks
 * @returns
 */
export function pick<T extends Record<string, any>, K extends keyof T>(record: T, picks: K[]): Pick<T, K> {
    return Object.keys(record)
        .filter(key => picks.includes(key as K))
        .reduce((result, key) => Object.assign({}, result, { [key]: record[key] }), Object.create({}));
}
