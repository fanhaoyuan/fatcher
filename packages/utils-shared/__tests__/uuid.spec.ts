import { uuid } from '../index';
test('generate uuid', () => {
    expect(uuid().length).toBe(6);
    expect(uuid(12).length).toBe(12);
    expect(uuid(24).length).toBe(24);

    expect(/^[A-Za-z0-9]+$/.test(uuid())).toStrictEqual(true);
});
