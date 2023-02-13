import { bundle } from '../../src/node/bundle';
import { temporary } from '../../src/node/temporary';

describe('Bundle', () => {
    const add = `
    export default function add(a: number, b: number) {
        return a + b;
    }
    `;

    it('Bundle a .ts file to .js (cjs)', async () => {
        let js = '';
        let bundled: (a: number, b: number) => number;

        await temporary(
            add,
            async temporaryPath => {
                js = await bundle(temporaryPath, 'cjs');
            },
            '.ts'
        );

        await temporary(js, temporaryPath => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            bundled = require(temporaryPath).default;
        });

        expect(typeof bundled! === 'function').toBe(true);
        expect(bundled!(1, 2)).toBe(3);
    });

    it('Bundle a .ts file to .js (esm)', async () => {
        let js = '';
        let bundled: (a: number, b: number) => number;

        await temporary(
            add,
            async temporaryPath => {
                js = await bundle(temporaryPath, 'esm');
            },
            '.ts'
        );

        await temporary(js, async temporaryPath => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            bundled = (await import(temporaryPath)).default;
        });

        expect(typeof bundled! === 'function').toBe(true);
        expect(bundled!(1, 2)).toBe(3);
    });
});
