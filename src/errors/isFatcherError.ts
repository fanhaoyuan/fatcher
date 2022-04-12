import { FatcherError } from './FatcherError';

/**
 * Confirm an error whether is FatcherError
 * @param error
 * @returns
 */
export function isFatcherError(error: Error): error is FatcherError {
    return error instanceof FatcherError && error.name === 'FatcherError' && error.__isFatcherError__;
}
