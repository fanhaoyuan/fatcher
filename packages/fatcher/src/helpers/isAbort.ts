import { AbortError } from './AbortError';

/**
 * Confirm a error whether cause by stopping fetch.
 * @param error
 * @returns
 */
export function isAbort(error: AbortError) {
    try {
        return error instanceof AbortError && error.name === 'AbortError' && error.isAborted;
    } catch {
        return false;
    }
}
