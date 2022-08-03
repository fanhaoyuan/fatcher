import * as path from 'path';
import * as fs from 'fs-extra';
import { MockConfig } from '../interfaces';
import { bundle } from './bundle';
import { temporary } from './temporary';

/**
 * 根据 Configs 生成请求模版
 */
export async function generator(configs: MockConfig[]) {
    const sw = path.resolve(__dirname, '../serviceWorker/sw.ts');

    const injectedFile = (await fs.readFile(sw, 'utf-8')).replace(
        '/** Inject Mock Schema Code */',
        `const mockConfig = ${JSON.stringify(configs, null, 4)}`
    );

    let file = '';

    await temporary(
        injectedFile,
        async temporaryPath => {
            file = await bundle(temporaryPath, 'esm', false);
        },
        '.ts'
    );

    return file;
}
