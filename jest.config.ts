import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    testPathIgnorePatterns: ['/node_modules/'],
    collectCoverageFrom: ['src/**/*.ts'],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
};

export default config;
