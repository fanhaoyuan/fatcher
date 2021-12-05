import { isString } from '../index';

test('isString', () => {
    expect(isString('')).toStrictEqual(true);
    expect(isString('test')).toStrictEqual(true);
    expect(isString(1)).toStrictEqual(false);
    expect(isString({})).toStrictEqual(false);
    expect(isString([])).toStrictEqual(false);
});
