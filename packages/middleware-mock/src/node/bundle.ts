import { build, Plugin } from 'esbuild';
import * as path from 'path';

/**
 * Bundle a `.ts` file to `.js` file
 */
export async function bundle(entry: string, format: 'cjs' | 'esm' = 'cjs', external = true) {
    const plugins: Plugin[] = [];

    if (external) {
        plugins.push({
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
        });
    }

    const { outputFiles } = await build({
        entryPoints: [entry],
        outdir: 'out.js',
        write: false,
        platform: 'node',
        bundle: true,
        format,
        plugins,
    });

    return outputFiles[0].text;
}
