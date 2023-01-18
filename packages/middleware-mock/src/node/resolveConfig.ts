/* eslint-disable @typescript-eslint/no-var-requires */
import { MockConfig } from '../interfaces';
import { bundle } from './bundle';
import { temporary } from './temporary';

export async function resolveConfig(path: string) {
    let config: MockConfig[] = [];

    if (path.endsWith('.ts')) {
        const file = await bundle(path, 'cjs', true);

        await temporary(file, temporaryPath => {
            config = require(temporaryPath).default;
        });
    }

    if (path.endsWith('.js')) {
        config = require(path);
    }

    return config;
}
