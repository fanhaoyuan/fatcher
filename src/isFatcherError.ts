import FatcherError from './FatcherError';

export default function isFatcherError(error: unknown): error is FatcherError {
    return error instanceof FatcherError && error.name === 'fatcherError';
}
