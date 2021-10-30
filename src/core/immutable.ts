import { Flatten, Immutable, Writable } from '../interfaces';
import { defineProperties, isPlainObject } from '../utils';

/**
 * Set a plain object to readonly.
 * @param rawData
 * @returns
 */
export function immutable<T extends Record<string, any>>(rawData: T): Immutable<T> {
    return defineProperties(
        rawData,
        item => {
            return {
                value: isPlainObject(item) ? immutable(item) : item,
                writable: false,
                enumerable: true,
                configurable: false,
            };
        },
        { __IS_IMMUTABLE__: true }
    );
}

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

/**
 * Get a object whether it is a immutable object.
 * @param object
 * @returns
 */
export function isImmutable<T extends Record<string, any>>(object: T | Immutable<T>): object is Immutable<T> {
    return !!object.__IS_IMMUTABLE__;
}
