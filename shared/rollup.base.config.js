import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import rm from 'rimraf';
import * as fs from 'fs';
import * as path from 'path';

function upperCase(str) {
    return str
        .split('-')
        .map(s => s[0].toUpperCase() + s.slice(1))
        .join('');
}

/**
 * @param {Object} options
 * @param {string} options.input
 * @param {string} options.globals
 * @param {string} options.external
 * @returns {import('rollup').RollupOptions[]}
 *
 */
export default function config(options = {}) {
    const { name, main, module, browser, unpkg, typings } = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

    const input = options.input || fs.existsSync(path.resolve(__dirname, 'index.ts')) ? 'index.ts' : 'src/index.ts';

    rm.sync('dist');

    return [
        {
            input,
            plugins: [nodeResolve(), commonjs(), esbuild({ target: 'es2017' })],
            external: options.external,
            output: [
                {
                    format: 'esm',
                    file: module,
                },
                {
                    format: 'cjs',
                    file: main,
                    exports: 'auto',
                },
                {
                    format: 'umd',
                    file: browser || unpkg || main,
                    plugins: [process.env.NODE_ENV === 'production' ? minify() : false],
                    globals: options.globals,
                    name: upperCase(name),
                },
            ],
        },
        {
            input,
            plugins: [dts({ respectExternal: true })],
            output: {
                format: 'esm',
                file: typings,
            },
        },
    ];
}
