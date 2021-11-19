import { Middleware, Response, clone, FatcherError } from 'fatcher';
import Mocker from 'mockjs';
import { MockerOptions } from './interfaces';
import { getValidDelay } from './getValidDelay';
import { mergeOptions } from './mergeOptions';

/**
 * Middleware for mock data
 * @param inlineOptions
 * @returns
 */
export function mocker(inlineOptions: MockerOptions = {}): Middleware {
    return {
        name: 'fatcher-middleware-mocker',
        apply(context) {
            // prefer inline options. If set `false`, will not apply this middleware
            if (inlineOptions.mock === false) {
                return false;
            }

            return Boolean(context.options.mock);
        },
        async use(context) {
            const options = clone(context.options);

            //Set default options
            const { errorProbability = 0, mock = false, delay = 0 } = mergeOptions({}, options, inlineOptions);

            if (errorProbability > 0 && Math.random() > errorProbability) {
                return Promise.reject(
                    new FatcherError(500, 'Internal Server Error', 'Mocker: Mock http request error.', options)
                );
            }

            const response: Response = {
                status: 200,
                statusText: 'ok',
                data: Mocker.mock(mock),
                //Because headers will filter null when send http request.
                headers: Object.fromEntries(Object.entries(options.headers).filter(item => item[1])) as Record<
                    string,
                    string
                >,
                options: options,
            };

            if (Array.isArray(delay) || delay > 0) {
                return new Promise(resolve => setTimeout(() => resolve(response), getValidDelay(delay)));
            }

            return response;
        },
    };
}
