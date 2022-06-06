import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import nodeResolver from '@rollup/plugin-node-resolve';
import { main, module, browser, typings } from './package.json';

const input = 'src/index.ts';
const plugins = [nodeResolver(), esbuild({ target: 'es2018' })];

export default defineConfig([
    {
        input,
        plugins,
        external: ['fatcher'],
        output: [
            {
                format: 'cjs',
                file: main,
            },
            {
                format: 'module',
                file: module,
            },
            {
                plugins: [minify()],
                format: 'umd',
                file: browser,
                name: 'FatcherMiddlewareAborter',
                globals: {
                    fatcher: 'Fatcher',
                },
            },
        ],
    },
    {
        input,
        plugins: [dts()],
        output: {
            format: 'esm',
            file: typings,
        },
    },
]);
