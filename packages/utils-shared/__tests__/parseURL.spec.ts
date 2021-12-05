import { parseURL } from '../index';

test('Normal url parse', () => {
    const parsed = parseURL('a=a1&b=b2&c=%E6%B5%8B%E8%AF%95');

    expect(parsed.a).toStrictEqual('a1');
    expect(parsed.b).toStrictEqual('b2');
    expect(parsed.c).toStrictEqual('测试');
});

test('Parse url with empty', () => {
    const parsed = parseURL('a=a1&b=b2&c=');

    expect(parsed.a).toStrictEqual('a1');
    expect(parsed.b).toStrictEqual('b2');
    expect(parsed.c).toStrictEqual('');
});

test('Parse params will filter error', () => {
    const parsed = parseURL('a=a1&b=b2&c=%E0%A4%A');

    expect(parsed.a).toStrictEqual('a1');
    expect(parsed.b).toStrictEqual('b2');
    expect(parsed.c).toBeUndefined();
});

test('Parse empty url', () => {
    const parsed = parseURL('');

    expect(Object.keys(parsed).length).toBe(0);
});

test('Parse no match url', () => {
    const parsed = parseURL('===');

    expect(Object.keys(parsed).length).toBe(0);
});
