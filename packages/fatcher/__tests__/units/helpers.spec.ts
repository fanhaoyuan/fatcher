import { canActivate, isAbortError, readStreamByChunk } from '../../src/helpers';

describe('Helpers', () => {
    it('canActivate', () => {
        const body = {
            id: 'test',
            name: 'fatcher',
        };

        const response = new Response(JSON.stringify(body), { status: 200 });

        const usedResponse = new Response(JSON.stringify(body), { status: 200 });

        usedResponse.json();

        const nullBodyResponse = new Response(null, { status: 200 });

        expect(canActivate(response)).toBe(true);
        expect(canActivate(usedResponse)).toBe(false);
        expect(canActivate(nullBodyResponse)).toBe(false);
    });

    it('isAbortError', () => {
        const domException = new DOMException('The user aborted a request.', 'AbortError');

        expect(isAbortError(domException)).toBe(true);
        expect(isAbortError(new DOMException())).toBe(false);
    });

    it('readStreamByChunk', async () => {
        let index = 0;
        const cof = 1000;
        let text = '';
        const length = 1_000_000;

        while (text.length < length) {
            text += Math.random().toString(36).slice(-5);
        }

        const readableStream = new ReadableStream<string>({
            start(controller) {
                (function push() {
                    const currentText = text.slice(index * cof, (index + 1) * cof);

                    if (!currentText) {
                        controller.close();
                        return;
                    }

                    index++;

                    controller.enqueue(currentText);
                    push();
                })();
            },
        });

        const result: string[] = [];

        await readStreamByChunk(readableStream, chunk => {
            result.push(chunk);
        });

        expect(result.join('')).toBe(text);
        expect(result.length).toBe(length / cof);
        expect(result[0].length).toBe(cof);
    });
});
