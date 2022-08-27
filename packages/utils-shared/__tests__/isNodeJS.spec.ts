import { isNodeJS } from '../src';

describe('isNodeJS', () => {
    it('Test env is in node js', () => {
        expect(isNodeJS()).toBe(true);
    });
});
