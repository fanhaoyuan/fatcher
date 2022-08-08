import { Rules } from 'async-validator';
import { paramsValidator } from '../../src/validator';

describe('Params Validator', () => {
    const rules: Rules = {
        id: {
            type: 'string',
            required: true,
        },
        name: {
            type: 'string',
        },
    };

    it('Validate Querystring', async () => {
        const id = 'querystring';

        const name = 'paramsValidator';

        const querystring = new URLSearchParams({
            id,
            name,
        }).toString();

        const result = await paramsValidator(querystring, rules);

        expect(result).toBeNull();
    });

    it('Without required param in querystring', async () => {
        const name = 'paramsValidator';

        const querystring = new URLSearchParams({
            name,
        }).toString();

        try {
            await paramsValidator(querystring, rules);
        } catch (error: any) {
            expect(error.toString()).toBe('Error: Async Validation Error');
        }
    });

    it('Validate params object', async () => {
        const id = 'paramsObject';

        const name = 'paramsValidator';

        const paramsObject = {
            id,
            name,
        };

        const result = await paramsValidator(paramsObject, rules);

        expect(result).toBeNull();
    });

    it('Without required param in params object', async () => {
        const id = 'paramsObject';

        const name = 'paramsValidator';

        const paramsObject = {
            id,
            name,
        };

        try {
            await paramsValidator(paramsObject, rules);
        } catch (error: any) {
            expect(error.toString()).toBe('Error: Async Validation Error');
        }
    });
});
