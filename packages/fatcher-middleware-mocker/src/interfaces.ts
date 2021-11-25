export interface MockerOptions {
    /**
     * Mock data delay to response.
     *
     * @default 0
     */
    delay?: number | number[];

    /**
     * Mock Data Type
     *
     * - `false` do not use mocker
     * - `string` data placeholder template
     * - `object` data template
     *
     * @default false
     */
    mock?: false | string | Record<string, any>;

    /**
     * The probability of response error
     *
     * The number in range of 0 and 1
     *
     * @default 0
     */
    errorProbability?: number;
}

declare module 'fatcher' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface RequestOptions extends MockerOptions {}
}
