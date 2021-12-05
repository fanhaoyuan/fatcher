import { pick } from './pick';

/**
 * This method creates an object composed of the own and inherited enumerable properties of object that are not omitted.
 * @param record
 * @param omits
 */
export function omit<T extends Record<string, any>, K extends keyof T>(record: T, omits: K[]): Omit<T, K> {
    return pick(
        record,
        Object.keys(record).filter(key => !omits.includes(key as K))
    ) as Omit<T, K>;
}
