import { isFunction } from '../index';

test('isFunction', () => {
    expect(
        isFunction(() => {
            //nothing
        })
    ).toStrictEqual(true);

    expect(
        isFunction(function test() {
            //nothing
        })
    ).toStrictEqual(true);

    expect(isFunction('test')).toStrictEqual(false);
    expect(isFunction([])).toStrictEqual(false);
    expect(isFunction({})).toStrictEqual(false);
    expect(isFunction(123456789)).toStrictEqual(false);
});
