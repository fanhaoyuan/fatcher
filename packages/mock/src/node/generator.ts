import { build } from 'esbuild';
import * as path from 'path';
import * as fs from 'fs-extra';
import { MockConfig } from '../interfaces';

/**
 * 根据 Configs 生成请求模版
 */
export async function generator(configs: MockConfig[]) {
    const sw = path.resolve(__dirname, '../serviceWorker/sw.ts');

    const temp = path.resolve(sw, '../.temp.sw.ts');

    const injectedFile = (await fs.readFile(sw, 'utf-8')).replace(
        '/** Inject Mock Schema Code */',
        `const mockConfig = ${JSON.stringify(configs, null, 4)}`
    );

    await fs.writeFile(temp, injectedFile);

    const result = await build({
        entryPoints: [temp],
        outdir: 'out.js',
        write: false,
        platform: 'node',
        format: 'esm',
        bundle: true,
        // minify: true,
    });

    const [{ text }] = result.outputFiles;

    await fs.remove(temp);

    return text;
}
