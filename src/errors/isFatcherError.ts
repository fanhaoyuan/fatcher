import { FatcherError } from './FatcherError';
import { isFunction } from '@fatcherjs/utils-shared';

/**
 * Confirm an error whether is FatcherError
 * @param error
 * @returns
 */
export function isFatcherError(error: Error): error is FatcherError {
    return error instanceof FatcherError && isFunction(error.isFatcherError) && error.isFatcherError();
}
