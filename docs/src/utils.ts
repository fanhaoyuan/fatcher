const media = (px: number) => `@media (min-width: ${px}px)`;

export const MediaScreen = {
    /**
     * min-width: 375px
     */
    XS: media(375),
    /**
     * min-width: 640px
     */
    SM: media(640),
    /**
     * min-width: 768px
     */
    MD: media(768),
    /**
     * min-width: 1024px
     */
    LG: media(1024),
    /**
     * min-width: 1280px
     */
    XL: media(1280),
    /**
     * min-width: 1536px
     */
    XXL: media(1536),
    /**
     * min-width: 1920px
     */
    XXXL: media(1920),
} as const;
