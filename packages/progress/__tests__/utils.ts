import { Middleware } from 'fatcher';
import { getRandomString } from '../../../shared/tests';

interface Options {
    customName?: string;
    cof?: number;
    length?: number;
    data?: string;
    noHeaders?: boolean;
}

export function responser(options: Options = {}): Middleware {
    const { cof = 1000, length = 1_000_000, customName = 'Content-Length', data, noHeaders = false } = options;

    let index = 0;
    let text = '';

    let readableStream;

    // eslint-disable-next-line no-implicit-coercion
    if (!isNaN(+length)) {
        text = getRandomString(length);

        const textEncoder = new TextEncoder();

        readableStream = new ReadableStream({
            start(controller) {
                (function push() {
                    const currentText = text.slice(index * cof, (index + 1) * cof);

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
