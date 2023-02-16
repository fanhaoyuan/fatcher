import { defineMiddleware, Middleware } from '../../../src';

export function getRandomString(length: number) {
    const STRING_TEMPLATE = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

    let string = '';

    for (let i = 0; i < length; i++) {
        string += STRING_TEMPLATE.charAt(Math.floor(Math.random() * STRING_TEMPLATE.length));
    }

    return string;
}

export function getStringStream(string: string, chunkSize: number) {
    const textEncoder = new TextEncoder();

    let index = 0;

    return new ReadableStream<Uint8Array>({
        start(controller) {
            (function push() {
                const currentText = string.slice(index * chunkSize, (index + 1) * chunkSize);

                if (!currentText) {
                    controller.close();
                    return;
                }

                index++;

                controller.enqueue(textEncoder.encode(currentText));
                push();
            })();
        },
    });
}

export function getStringStreamByLength(length: number, chunkSize: number) {
    return getStringStream(getRandomString(length), chunkSize);
}

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

    return defineMiddleware(() => {
        return {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: response,
            url: response.url,
            options: {},
        };
    });
}
