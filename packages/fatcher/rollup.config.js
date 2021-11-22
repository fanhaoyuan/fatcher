import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import { main, module as esm, browser, typings } from './package.json';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import rm from 'rimraf';
import path from 'path';

function getCurrentPath(...absolutePath) {
    return path.resolve(__dirname, ...absolutePath);
}

rm.sync(getCurrentPath('dist'));

const input = getCurrentPath('src/index.ts');

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
    {
        input,
        plugins: [nodeResolve(), commonjs(), esbuild({ target: 'esnext' })],
        output: [
            {
                format: 'es',
                file: getCurrentPath(esm),
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
            },
            {
                format: 'cjs',
                file: getCurrentPath(main),
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
            },
            {
                format: 'umd',
                file: getCurrentPath(browser),
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
                    process.env.NODE_ENV === 'production' ? terser() : false,
                ],
            },
        ],
    },
    {
        input,
        plugins: [dts()],
        output: {
            file: getCurrentPath(typings),
            format: 'es',
        },
    },
];

export default config;
