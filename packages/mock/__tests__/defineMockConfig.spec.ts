import { defineMockConfig } from '../src/defineMockConfig';

describe('Define Mock Config', () => {
    it('Define Empty Config', () => {
        const config = defineMockConfig();

        expect(config).toStrictEqual([]);
    });

    it('Define Mock Config', () => {
        const config = defineMockConfig([
            {
                validator: {},
                url: '',
                result: {},
            },
        ]);

        expect(config).toStrictEqual([
            {
                validator: {},
                url: '',
                result: {},
            },
        ]);
    });
});
