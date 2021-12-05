import { isPlainObject } from './isPlainObject';

/**
 * Creates a deeply clone of value.
 * @param value value to clone
 */
export function cloneDeep<T>(value: T): T {
    let clonedData;

    if (isPlainObject(value)) {
        clonedData = Object.create({});

        for (const key in value) {
            clonedData[key] = cloneDeep(value[key]);
        }

        return clonedData;
    }

    if (Array.isArray(value)) {
        clonedData = [];

        for (const item of value as unknown[]) {
            clonedData.push(cloneDeep(item));
        }
        //@ts-expect-error
        return clonedData;
    }

    return value;
}
