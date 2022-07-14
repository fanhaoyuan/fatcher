import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import { main, module, browser, typings } from './package.json';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import nodeResolver from '@rollup/plugin-node-resolve';
import bundleSize from 'rollup-plugin-bundle-size';
import replace from '@rollup/plugin-replace';
import strip from '@rollup/plugin-strip';

const input = 'src/index.ts';
const target = 'es2018';
const VerbosityPrefix = '[Fatcher]';

const plugins = [
    nodeResolver(),
    esbuild({ target }),
    replace({
        __vp__: VerbosityPrefix,
        preventAssignment: false,
    }),
];

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
        plugins: [
            ...plugins,
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
                preventAssignment: false,
            }),
            strip({
                include: ['src/**/*.ts'],
                functions: ['console.log', 'console.warn'],
            }),
        ],
        output: {
            plugins: [minify({ target }), bundleSize()],
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
