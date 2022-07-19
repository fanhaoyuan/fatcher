import { Middleware } from 'fatcher';
import { getStringStreamByLength } from '../../../shared/tests';

interface Options {
    customName?: string;
    cof?: number;
    length?: number;
    data?: string;
    noHeaders?: boolean;
}

export function responser(options: Options = {}): Middleware {
    const { cof = 1000, length = 1_000_000, customName = 'Content-Length', data, noHeaders = false } = options;

    let readableStream;

    // eslint-disable-next-line no-implicit-coercion
    if (!isNaN(+length)) {
        readableStream = getStringStreamByLength(length, cof);
    }

    const headers = noHeaders
        ? {}
        : {
              [customName]: `${length}`,
          };

    const response = new Response(data || readableStream, {
        headers,
        status: 200,
        statusText: 'ok',
    });

    return {
        name: 'fatcher-middleware-responser',
        use() {
            return {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                data: response,
                url: response.url,
            };
        },
    };
}
