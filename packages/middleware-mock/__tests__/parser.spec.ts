import { parser } from '../src/parser';

describe('Mock config parser', () => {
    it('Mock data by using mockjs', () => {
        const parsed = parser({
            b: 'boolean',
            n: 'name',
        });

        expect(typeof parsed.b === 'boolean').toBe(true);
        expect(typeof parsed.n === 'string').toBe(true);
    });
});
