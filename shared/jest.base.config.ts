import { Config } from '@jest/types';
import * as path from 'path';

const config: Config.InitialOptions = {
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    roots: ['__tests__'],
    testPathIgnorePatterns: ['/node_modules/'],
    setupFiles: [
        path.resolve(__dirname, '../node_modules/web-streams-polyfill/dist/polyfill.js'),
        path.resolve(__dirname, '../node_modules/whatwg-fetch/dist/fetch.umd.js'),
        path.resolve(__dirname, './setups/index.ts'),
    ],
};

export default config;
