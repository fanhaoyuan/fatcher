import glob from 'fast-glob';
import * as fs from 'fs-extra';
import { build } from 'esbuild';
import * as path from 'path';

export async function resolveConfig(workspace: string) {
    const resolve = (...paths: string[]) => path.resolve(workspace, ...paths);

    const paths = await glob(`${workspace}/**/*.mock.(j|t)s`);

    const configs = [];

    for await (const p of paths) {
        // 如果是 ts 文件，先进行构建，再拿数据
        if (p.endsWith('.ts')) {
            const result = await build({
                entryPoints: [p],
                outdir: 'out.js',
                write: false,
                platform: 'node',
                format: 'cjs',
                bundle: true,
                plugins: [
                    {
                        name: 'externalize-deps',
                        setup(b) {
                            b.onResolve({ filter: /.*/ }, args => {
                                const id = args.path;
                                if (id[0] !== '.' && !path.isAbsolute(id)) {
                                    return {
                                        external: true,
                                    };
                                }
                            });
                        },
                    },
                ],
            });

            const [{ text }] = result.outputFiles;

            const temp = resolve('.mock.js');

            await fs.writeFile(temp, text);

            // eslint-disable-next-line @typescript-eslint/no-var-requires
            configs.push(require(temp).default);

            await fs.remove(temp);

            continue;
        }

        if (p.endsWith('.js')) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            configs.push(require(p));
        }

        throw new Error('Mock config file only supports .ts,.js');
    }

    console.log(configs); // todo
}
