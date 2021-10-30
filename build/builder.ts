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

    const plugins = [resolver(), commonjs(), esbuild()];

    const baseOptions: RollupOptions = {
        input: path.resolve(__dirname, '../src/index.ts'),
        plugins,
    };

    const umdBuilder = (async function umd() {
        const options = cloneDeep(baseOptions);

        delete options.external;

        if (!serve) {
            options.plugins?.push(terser());
        }

        const file = path.resolve(__dirname, '../dist/fatch.min.js');

        const bundle = await rollup(merge({}, options));

        await bundle.write({ file, format: 'umd', name: 'Fatch' });

        sizeLog(file);
    })();

    const esmBuilder = (async function esm() {
        const bundle = await rollup(merge({}, baseOptions));

        const file = path.resolve(__dirname, '../dist/index.es.js');

        await bundle.write({ file, format: 'esm' });

        sizeLog(file);
    })();

    const cjsBuilder = (async function cjs() {
        const bundle = await rollup(merge({}, baseOptions));

        const file = path.resolve(__dirname, '../dist/index.cjs.js');

        await bundle.write({ file, format: 'cjs' });

        sizeLog(file);
    })();

    const startTime = Date.now();

    await Promise.all([umdBuilder, esmBuilder, cjsBuilder]);

    console.log(chalk.cyanBright(`built in ${Date.now() - startTime}ms.`));
}
