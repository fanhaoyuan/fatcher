import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import { main, module as esm, browser, typings } from './package.json';
import dts from 'rollup-plugin-dts';
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
        plugins: [
            nodeResolve(),
            commonjs(),
            esbuild({
                target: 'es2015',
            }),
        ],
        external: ['fatcher'],
        output: [
            {
                format: 'cjs',
                file: getCurrentPath(main),
                exports: 'auto',
            },
            {
                format: 'esm',
                file: getCurrentPath(esm),
            },
            {
                format: 'umd',
                file: getCurrentPath(browser),
                name: 'FatcherMiddlewareDownloadProgress',
                globals: {
                    fatcher: 'Fatcher',
                },
                plugins: [process.env.NODE_ENV === 'production' ? minify() : false],
            },
        ],
    },
    {
        input,
        plugins: [dts()],
        output: { file: getCurrentPath(typings), format: 'es' },
    },
];

export default config;
