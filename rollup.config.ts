import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import { main, module, browser, typings } from './package.json';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import nodeResolver from '@rollup/plugin-node-resolve';
import bundleSize from 'rollup-plugin-bundle-size';

const input = 'src/index.ts';
const plugins = [nodeResolver(), esbuild()];

export default defineConfig([
    {
        input,
        plugins,
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
        output: {
            plugins: [minify(), bundleSize()],
            format: 'umd',
            file: browser,
            name: 'Fatcher',
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
