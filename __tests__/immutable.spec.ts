import immutable from '../src/immutable';

describe('immutable', () => {
    it('immutable', () => {
        const object = {
            a: 'c',
        };

        const immutableObject = immutable(object);

        //@ts-expect-error
        immutableObject.a = '';

        expect(immutableObject.a).toBe('c');

        object.a = '';

        expect(object.a).toBe('');
    });
});
