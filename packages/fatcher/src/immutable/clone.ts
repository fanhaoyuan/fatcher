import { Flatten, Immutable, Writable } from '../interfaces';
import { defineProperties, isPlainObject } from 'utils-shared';

/**
 * Reset a readonly object to plain.
 * @param immutableData
 * @returns
 */
export function clone<T extends Record<string, any>>(immutableData: Immutable<T>): Flatten<Writable<T>> {
    return defineProperties(immutableData, item => {
        return {
            value: isPlainObject(item) ? clone(item) : item,
            writable: true,
            enumerable: true,
            configurable: true,
        };
    });
}
