/**
 * App context.
 */
declare const __FANDO_APP_CONTEXT__: {
    title?: string;
    logo?: string;
    repository?:
        | string
        | {
              type?: string;
              url?: string;
          };

    version?: string;
};

declare const __FANDO_APP_DOCS_PATH__: string;
