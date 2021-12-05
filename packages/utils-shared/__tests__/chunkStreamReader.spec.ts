/**
 * @jest-environment jsdom
 */
import 'web-streams-polyfill';
import { uuid, chunkStreamReader } from '../index';

const longText = uuid(1_000_000);

let index = 0;
const cof = 1000;

const stream = new ReadableStream({
    start(controller) {
        (function push() {
            const currentText = longText.slice(index * cof, (index + 1) * cof);

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

test('Read chunk', async () => {
    const result = [];

    await chunkStreamReader<string>(stream, str => result.push(str));

    expect(result[0].length).toBe(cof);
    expect(result.length).toBe(longText.length / cof);
    expect(result.join('')).toStrictEqual(longText);
});
