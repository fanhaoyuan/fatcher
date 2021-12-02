export interface PayloadTransformerOptions {
    /**
     * Whether auto transform request payload.
     *
     * If `false`, should transform payload customization .
     *
     * @default true
     */
    autoTransformPayload: boolean;
}

export type SupportedContentType = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'application/json';
