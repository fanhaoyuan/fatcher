import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    roots: ['packages'],
    testPathIgnorePatterns: ['/node_modules/'],
    collectCoverageFrom: ['packages/*/src/**/*.ts', '!packages/docs/**/*.ts'],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
};

export default config;
