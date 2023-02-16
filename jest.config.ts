import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    testPathIgnorePatterns: ['/node_modules/', '__tests__/middlewares/progress/'],
    collectCoverageFrom: ['src/**/*.ts'],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
};

export default config;
