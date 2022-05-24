import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    roots: ['__tests__'],
    testPathIgnorePatterns: ['/node_modules/'],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
};

export default config;
