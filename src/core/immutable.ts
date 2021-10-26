import { Immutable } from '../interfaces';
import { cloneDeep, isPlainObject, defineProperties } from '../utils';

/**
 * Set a plain object to readonly.
 * @param rawData
 * @returns
 */
export function immutable<T extends Record<string, any>>(rawData: T): Immutable<T> {
    return defineProperties<T, Immutable<T>>(
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
export function toRaw<T extends Record<string, any>>(immutableData: Immutable<T>): T {
    return defineProperties<Immutable<T>, T>(immutableData, item => {
        return {
            value: isPlainObject(item) ? toRaw(item) : item,
            writable: true,
            enumerable: true,
            configurable: true,
        };
    });
}

/**
 * Clone a new data from immutable data.
 * @param immutableData
 * @returns
 * A plain object.
 */
export function clone<T extends Record<string, any>>(immutableData: Immutable<T>): T {
    return Object.keys(immutableData).reduce((clonedData, key) => {
        return Object.assign({}, clonedData, { [key]: cloneDeep([immutableData[key]]) });
    }, Object.create({}));
}

/**
 * Get a object whether it is a immutable object.
 * @param object
 * @returns
 */
export function isImmutable<T extends Record<string, any>>(object: T | Immutable<T>): object is Immutable<T> {
    return !!object.__IS_IMMUTABLE__;
}
