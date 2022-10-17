import { canActivate, defineMiddleware, Middleware } from '../src';

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

export function sleep(timeout = 500) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}



/**
 * A middleware for transforming stream into json
 *
 * If response.body never used, will try to transform into json.
 *
 * But if transform error. Will return a origin response.
 */
export function json(): Middleware {
    return defineMiddleware(async (context, next) => {
        const result = await next();

        if (canActivate(result.data)) {
            const clonedResponse = result.data.clone();

            try {
                const data = await clonedResponse.json();

                return Object.assign(result, { data });
            } catch {
                /**
                 * If transform error.
                 *
                 * Return origin result.
                 */
            }
        }

        return result;
    }, 'fatcher-middleware-json');
}
