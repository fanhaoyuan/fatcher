import pick from 'lodash/pick';
import { Middleware } from '../interfaces';

/**
 * Format unread response stream to expect type
 *
 * It will return custom response when response stream read.
 */
export function responseFormatter(): Middleware {
    return {
        name: 'fatch-middleware-response-formatter',
        async use(context, next) {
            const response = await next();

            if (!(response.data instanceof ReadableStream) || response.data.locked) {
                return response;
            }

            const stream = new Response(response.data, pick(response, ['status', 'statusText', 'headers']));

            const data = await (async function format() {
                switch (response.options.responseType) {
                    default:
                    case 'json':
                        return stream.json();

                    case 'blob':
                        return stream.blob();

                    case 'arrayBuffer':
                        return stream.arrayBuffer();

                    case 'text':
                        return stream.text();
                }
            })();

            return Object.assign({}, response, { data });
        },
    };
}
