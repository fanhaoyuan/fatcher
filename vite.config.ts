import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            formats: ['es', 'cjs', 'umd'],
            name: 'Fatch',
            fileName: format => {
                if (format === 'umd') {
                    return 'fatch.min.js';
                }

                return `index.${format}.js`;
            },
            entry: 'src/index.ts',
        },
        minify: false,
    },
});
