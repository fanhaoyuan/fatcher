import { cloneDeep } from '../index';

const object = {
    a: 'a1',
    b: [{ b1: 'b1', b2: { b21: 'b21' } }, 'b3'],
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

const cloned = cloneDeep(object);

test('Primitive type will copy value', () => {
    expect(cloned.a).toStrictEqual('a1');
    expect(cloned.c.d).toStrictEqual(1);
    expect(cloned.c.e.g).toStrictEqual('g1');
    expect(cloned.c.h).toStrictEqual('test');
});

test('Object is a new object and deep clone', () => {
    expect(Object.is(cloned, object)).toStrictEqual(false);
    expect(Object.is(cloned.c, object.c)).toStrictEqual(false);
    expect(Object.is(cloned.c.e, object.c.e)).toStrictEqual(false);
});

test('Array is a new array and deep clone', () => {
    expect(cloned.b[1]).toStrictEqual('b3');
    expect(Object.is(cloned.b[0], object.b[0])).toStrictEqual(false);
    //@ts-ignore
    expect(cloned.b[0].b1).toStrictEqual('b1');
    //@ts-ignore
    expect(Object.is(cloned.b[0].b2, object.b[0].b2)).toStrictEqual(false);
    //@ts-ignore
    expect(cloned.b[0].b2.b21).toStrictEqual('b21');
});
