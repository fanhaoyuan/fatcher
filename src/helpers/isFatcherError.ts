import { FatcherError } from '../core/FatcherError';
import { isFunction } from '../utils/index';

/**
 * Confirm an error whether is FatcherError
 * @param error
 * @returns
 */
export function isFatcherError(error: Error): error is FatcherError {
    return error instanceof FatcherError && isFunction(error.isFatcherError) && error.isFatcherError();
}
