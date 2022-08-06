/**
 * Confirm a value whether is a function
 * @param value value to confirm
 * @returns
 */
export function isFunction(value: unknown): value is (...args: any[]) => any {
    return typeof value === 'function';
}

/**
 * Set a plain object to readonly.
 * @param rawData
 * @returns
 */
export function immutable<T extends Record<string, any>>(record: T): Readonly<T> {
    return new Proxy(record, {
        set() {
            return true;
        },
    });
}

/**
 * Merge many objects to one.
 */
export function merge<T extends Record<string, any>>(
    initial: T,
    patches: Partial<T>[],
    customMerge: (merged: T, patch: Partial<T>) => Partial<T>
): T {
    return patches.reduce(
        (merged, patch) => Object.assign(merged, customMerge(merged, patch)),
        Object.assign(Object.create(null), initial)
    );
}

export function objectDiff<T extends Record<string, any>>(target: T, object: T) {
    const diff = Object.create(null);

    for (const [key, value] of Object.entries(target)) {
        if (!(key in object)) {
            diff[key] = value;
            continue;
        }

        if ((typeof object[key] !== 'object' || !object[key]) && object[key] !== target) {
            diff[key] = value;
        }
    }

    return diff;
}
