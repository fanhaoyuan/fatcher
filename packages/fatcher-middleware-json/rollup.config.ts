import nodeResolver from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import strip from '@rollup/plugin-strip';
import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import bundleSize from 'rollup-plugin-output-size';
import { browser, main, module, typings } from './package.json';

const input = 'src/index.ts';
const target = 'esnext';

const plugins = [nodeResolver(), esbuild({ target })];

export default defineConfig([
  {
    input,
    external: ['fatcher'],
    plugins,
    output: [
      {
        format: 'cjs',
        file: main,
      },
      {
        format: 'esm',
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
      plugins: [minify({ target: 'es2018' }), bundleSize()],
      format: 'umd',
      file: browser,
      name: 'FatcherMiddlewareJson',
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
