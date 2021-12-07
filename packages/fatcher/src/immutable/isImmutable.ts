import { Immutable } from '../interfaces';

/**
 * Get a object whether it is a immutable object.
 * @param object
 * @returns
 */
export function isImmutable<T extends Record<string, any>>(object: T | Immutable<T>): object is Immutable<T> {
    return !!object.__IS_IMMUTABLE__;
}
