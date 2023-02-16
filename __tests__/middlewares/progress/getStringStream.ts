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
