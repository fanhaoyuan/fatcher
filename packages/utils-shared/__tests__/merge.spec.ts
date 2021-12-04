import { merge, isFunction } from '../index';

const object = {
    a: 'a1',
    b: [],
    c: {
        d: 1,
        e: {
            g: 'g1',
            f: () => {
                //nothing
            },
        },
        h: 'test',
    },
};

const source = {
    b: ['b1'],
    c: {
        d: 2,
        e: {
            f: () => {
                return 'f1';
            },
        },
        h: undefined,
    },
};

const merged = merge(object, source);

test('Primitive type and Array will cover', () => {
    expect(merged.a).toStrictEqual('a1');
    expect(merged.b[0]).toStrictEqual('b1');
});

test('Object will deep merge', () => {
    expect(merged.c.d).toStrictEqual(2);
    expect(merged.c.e.g).toStrictEqual('g1');
    expect(isFunction(merged.c.e.f)).toStrictEqual(true);
    expect(merged.c.e.f()).toStrictEqual('f1');
});

test('undefined will ignore', () => {
    expect(merged.c.h).toStrictEqual('test');
});
