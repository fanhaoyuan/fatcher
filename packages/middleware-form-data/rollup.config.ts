import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import nodeResolver from '@rollup/plugin-node-resolve';
import { main, module, browser, typings } from './package.json';

const input = 'src/index.ts';
const target = 'es2018';
const plugins = [nodeResolver(), esbuild({ target })];

export default defineConfig([
    {
        input,
        plugins,
        external: ['fatcher', '@fatcherjs/utils-shared'],
        output: [
            {
                format: 'cjs',
                file: main,
            },
            {
                format: 'module',
                file: module,
            },
        ],
    },
    {
        input,
        plugins,
        external: ['fatcher'],
        output: {
            plugins: [minify({ target })],
            format: 'umd',
            file: browser,
            name: 'FatcherMiddlewareFormData',
            globals: {
                fatcher: 'Fatcher',
            },
        },
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
