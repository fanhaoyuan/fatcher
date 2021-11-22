import { FatcherError } from '../core/FatcherError';

/**
 * Confirm a error whether is FatcherError
 * @param error
 * @returns
 */
export function isFatcherError(error: FatcherError): error is FatcherError {
    try {
        return error instanceof FatcherError && error.name === 'FatcherError' && error.isFatcherError;
    } catch {
        return false;
    }
}
