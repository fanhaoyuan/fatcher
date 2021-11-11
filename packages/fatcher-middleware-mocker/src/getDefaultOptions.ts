import { MockerOptions } from './interfaces';

/**
 * Get a object of middleware options
 */
export function getDefaultOptions(): MockerOptions {
    return {
        delay: 0,
        errorProbability: 0,
        mock: false,
    };
}
