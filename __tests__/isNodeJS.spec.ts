import { isNodeJS } from '../src/utils';

describe('isNodeJS', () => {
    it('Test env is in node js', () => {
        expect(isNodeJS()).toBe(true);
    });
});
