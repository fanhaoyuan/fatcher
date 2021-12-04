import { omit } from '../index';

const object = {
    a: 'a1-1',
    b: 'b2-1',
    c: 'c3-1',
    d: 'd4-1',
};

test('omit something', () => {
    const omitted = omit(object, ['c']);

    expect('a' in omitted).toStrictEqual(true);
    expect('b' in omitted).toStrictEqual(true);
    expect('c' in omitted).toStrictEqual(false);
    expect('d' in omitted).toStrictEqual(true);

    expect(omitted.a).toStrictEqual('a1-1');
    expect(omitted.b).toStrictEqual('b2-1');
    expect(omitted.d).toStrictEqual('d4-1');
});
