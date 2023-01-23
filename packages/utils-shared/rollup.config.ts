import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import nodeResolver from '@rollup/plugin-node-resolve';
import { main, module, typings } from './package.json';

const input = 'src/index.ts';
const target = 'es2018';
const plugins = [nodeResolver(), esbuild({ target })];

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
