import { resolveConfig } from '../../src/node';
import { MockConfig } from '../../src/interfaces';
import { temporary } from '../../src/node/temporary';

describe('Resolve Config', () => {
    const mockConfig: MockConfig[] = [
        {
            url: '/mock',
            validator: {
                method: 'GET',
                params: {
                    id: {
                        type: 'string',
                        required: true,
                    },
                },
            },
            result: {
                status: 200,
                statusText: 'ok',
                body: {
                    id: 'guid',
                },
            },
        },
        {
            url: '/getTodoById',
            validator: {
                method: 'GET',
                params: {
                    id: {
                        type: 'string',
                        required: true,
                    },
                },
            },
            result: {
                body: {
                    id: 'id',
                    name: 'cname',
                    todo: 'cparagraph',
                },
            },
        },
    ];

    it('Resolve Mock by .js file', async () => {
        const js = `module.exports = ${JSON.stringify(mockConfig)}`;

        let configs: MockConfig[] = [];

        await temporary(js, async temporaryPath => {
            configs = await resolveConfig(temporaryPath);
        });

        expect(configs).toStrictEqual(mockConfig);
    });

    it('Resolve Mock by .ts file', async () => {
        const ts = `export default ${JSON.stringify(mockConfig)}`;

        let configs: MockConfig[] = [];

        await temporary(
            ts,
            async temporaryPath => {
                configs = await resolveConfig(temporaryPath);
            },
            '.ts'
        );

        expect(configs).toStrictEqual(mockConfig);
    });
});
