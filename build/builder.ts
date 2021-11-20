import { rollup, RollupOptions } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import resolver from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import * as path from 'path';
import { cloneDeep, merge } from 'lodash';
import chalk from 'chalk';
import rimraf from 'rimraf';
import * as fs from 'fs';
import gzipSize from 'gzip-size';
import esbuild from 'rollup-plugin-esbuild';

import { getBabelOutputPlugin } from '@rollup/plugin-babel';

function formatSize(size: number) {
    return `${(size / 1024).toFixed(2)} KiB`;
}

function sizeLog(filePath: string) {
    const cwd = process.cwd();

    console.log(
        chalk.greenBright(
            path.relative(cwd, filePath),
            ' ',
            ' ',
            formatSize(fs.statSync(filePath).size),
            '/',
            'gzip:',
            formatSize(gzipSize.fileSync(filePath))
        )
    );
}

export async function builder(serve = false) {
    console.log(chalk.cyanBright('build started...'));

    rimraf.sync(path.resolve(__dirname, '../dist/'));

    const plugins = [
        resolver(),
        commonjs(),
        esbuild({
            target: 'esnext',
        }),
    ];

    const baseOptions: RollupOptions = {
        input: path.resolve(__dirname, '../packages/fatcher/src/index.ts'),
        plugins,
    };

    const umdBuilder = (async function umd() {
        const options = cloneDeep(baseOptions);

        delete options.external;

        const file = path.resolve(__dirname, '../dist/fatcher.min.js');

        const bundle = await rollup(merge({}, options));

        await bundle.write({
            file,
            format: 'umd',
            name: 'Fatcher',
            plugins: [
                getBabelOutputPlugin({
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: 'umd',
                                targets: {
                                    esmodules: true,
                                },
                            },
                        ],
                    ],
                    allowAllFormats: true,
                }),
                serve ? false : terser(),
            ],
        });

        sizeLog(file);
    })();

    const esmBuilder = (async function esm() {
        const bundle = await rollup(merge({}, baseOptions));

        const file = path.resolve(__dirname, '../dist/index.es.js');

        await bundle.write({
            file,
            format: 'esm',
            plugins: [
                getBabelOutputPlugin({
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    esmodules: true,
                                },
                            },
                        ],
                    ],
                }),
            ],
        });

        sizeLog(file);
    })();

    const cjsBuilder = (async function cjs() {
        const bundle = await rollup(merge({}, baseOptions));

        const file = path.resolve(__dirname, '../dist/index.cjs.js');

        await bundle.write({
            file,
            format: 'cjs',
            plugins: [
                getBabelOutputPlugin({
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    esmodules: true,
                                },
                            },
                        ],
                    ],
                }),
            ],
        });

        sizeLog(file);
    })();

    const startTime = Date.now();

    await Promise.all([umdBuilder, esmBuilder, cjsBuilder]);

    console.log(chalk.cyanBright(`built in ${Date.now() - startTime}ms.`));
}
