import { pick } from '../index';

const object = {
    a: 'a1-1',
    b: 'b2-1',
    c: 'c3-1',
    d: 'd4-1',
};

test('pick something', () => {
    const picked = pick(object, ['a', 'b', 'd']);

    expect('a' in picked).toStrictEqual(true);
    expect('b' in picked).toStrictEqual(true);
    expect('c' in picked).toStrictEqual(false);
    expect('d' in picked).toStrictEqual(true);

    expect(picked.a).toStrictEqual('a1-1');
    expect(picked.b).toStrictEqual('b2-1');
    expect(picked.d).toStrictEqual('d4-1');
});
