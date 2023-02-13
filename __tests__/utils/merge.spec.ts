import { merge } from '../../src/utils/index';

describe('merge', () => {
    it('Basic merge', () => {
        const a = {
            a: 'aa',
            b: 'bb',
        };

        const b = {
            b: 'b',
        };

        const merged = merge(a, [b]);

        expect(JSON.stringify(merged)).toBe(
            JSON.stringify({
                a: a.a,
                b: b.b,
            })
        );
    });

    it('Multitude merge', () => {
        const a = {
            a: ['a'],
            b: {},
            c: 'c',
        };

        const b = {
            b: {
                a: 'c',
            },
        };

        const c = {
            c: 'cc',
        };

        const d = {
            a: ['a', 'b', 'c', 'd'],
        };

        const merged = merge(a, [b, c, d]);

        expect(JSON.stringify(merged)).toBe(
            JSON.stringify({
                a: d.a,
                b: b.b,
                c: c.c,
            })
        );
    });

    it('Custom merge', () => {
        const a = {
            a: ['a'],
            b: {
                a: 'eeee',
                b: 'c',
            },
            c: 'c',
        };

        const b = {
            b: {
                a: 'c',
                b: ''
            },
        };

        const c = {
            c: 'cc',
        };

        const d = {
            a: ['a', 'b', 'c', 'd'],
        };

        const merged = merge(a, [b, c, d], (total, patch) => {
            if (patch['b']) {
                patch.b = total.b;
            }

            return patch;
        });

        expect(JSON.stringify(merged)).toBe(
            JSON.stringify({
                a: d.a,
                b: a.b,
                c: c.c,
            })
        );
    });
});
