import { Immutable } from '../interfaces';
import { defineProperties, isPlainObject } from 'utils-shared';

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
