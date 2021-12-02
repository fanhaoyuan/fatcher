export type ResponseType = 'blob' | 'arrayBuffer' | 'json' | 'text';

export interface ResponseFormatterOptions {
    /**
     * A expect type to transform before response.
     *
     * @default 'json''
     */
    responseType: ResponseType;
}
