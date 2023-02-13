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
