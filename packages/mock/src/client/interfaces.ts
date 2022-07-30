import { MockSchema } from '../interfaces';

export interface MockOptions {
    /**
     * Whether enable data mocker
     *
     * @default
     * ```
     * process.env.NODE_ENV !== 'production'
     * ```
     */
    enabled?: boolean;

    /**
     * Mock Schema to create mock data
     */
    schema?: MockSchema;
}
