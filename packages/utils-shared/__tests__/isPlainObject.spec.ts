import { isPlainObject } from '../index';

test('isPlainObject', () => {
    expect(
        isPlainObject({
            a: 'b',
            c: 'c',
        })
    ).toStrictEqual(true);
    expect(isPlainObject({})).toStrictEqual(true);
    expect(isPlainObject(Object.create(null))).toStrictEqual(true);
    expect(isPlainObject('')).toStrictEqual(false);
    expect(isPlainObject(12345566)).toStrictEqual(false);
    expect(isPlainObject([])).toStrictEqual(false);
});
