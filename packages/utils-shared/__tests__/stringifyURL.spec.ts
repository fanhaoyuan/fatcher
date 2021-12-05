import { stringifyURL } from '../index';

test('Normal url stringify', () => {
    const params = {
        a: 'a1',
        b: 'b2',
        c: '测试',
    };

    expect(stringifyURL(params)).toStrictEqual('a=a1&b=b2&c=%E6%B5%8B%E8%AF%95');
});

test('Stringify with empty', () => {
    const params = {
        a: 'a1',
        b: 'b2',
        c: '',
    };

    expect(stringifyURL(params)).toStrictEqual('a=a1&b=b2&c=');
});

test('Stringify with undefined', () => {
    const params = {
        a: 'a1',
        b: 'b2',
        c: undefined,
    };

    expect(stringifyURL(params)).toStrictEqual('a=a1&b=b2&c=');
});

test('Stringify will filter error param', () => {
    const params = {
        a: 'a1',
        b: 'b2',
        c: '\uD800',
    };

    expect(stringifyURL(params)).toStrictEqual('a=a1&b=b2');
});

test('Stringify empty params', () => {
    const params = {};

    expect(stringifyURL(params)).toStrictEqual('');
});
