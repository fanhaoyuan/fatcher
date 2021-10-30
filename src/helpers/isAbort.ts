import { isPlainObject } from '../utils';

/**
 * Confirm a error whether cause by stopping fetch.
 * @param error
 * @returns
 */
export function isAbort(error: Error) {
    try {
        const body = JSON.parse(error.message);

        if (isPlainObject(body) && body.isAborted) {
            return true;
        }

        return false;
    } catch {
        return false;
    }
}
