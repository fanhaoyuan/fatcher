export interface MockerOptions {
    /**
     * Mock data delay to response.
     *
     * @default 0
     */
    delay?: number;

    /**
     * Whether use mock middleware
     *
     * @default false
     */
    mock?: boolean;
}
