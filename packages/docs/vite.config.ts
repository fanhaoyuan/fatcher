import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default async () => {
    const mdx = (await import('@mdx-js/rollup')).default;
    const frontmatter = (await import('remark-frontmatter')).default;
    const mdxFrontmatter = (await import('remark-mdx-frontmatter')).remarkMdxFrontmatter;

    return defineConfig({
        root: __dirname,
        base: '/fatcher/',
        publicDir: path.resolve(__dirname, 'public'),
        build: {
            outDir: path.resolve(__dirname, './dist'),
            emptyOutDir: true,
        },
        plugins: [
            react(),
            mdx({
                providerImportSource: '@mdx-js/react',
                remarkPlugins: [frontmatter, mdxFrontmatter],
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        optimizeDeps: {
            include: ['react/jsx-runtime'],
        },
    });
};
