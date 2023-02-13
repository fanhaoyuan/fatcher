import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import nodeResolver from '@rollup/plugin-node-resolve';
import { main, module, typings, browser } from './package.json';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

const input = 'src/client/index.ts';
const target = 'es2018';
const plugins = [nodeResolver(), commonjs(), esbuild({ target })];

export default defineConfig([
    {
        input,
        plugins,
        external: ['fatcher', 'mockjs'],
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
        plugins: [
            ...plugins,
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
                preventAssignment: false,
            }),
        ],
        external: ['fatcher'],
        output: [
            {
                format: 'umd',
                file: browser,
                plugins: [minify({ target })],
                name: 'FatcherMiddlewareMock',
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
