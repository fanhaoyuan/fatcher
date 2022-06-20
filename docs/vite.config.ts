import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

const scopedNameMap = new Map();

export default async () => {
    const mdx = (await import('@mdx-js/rollup')).default;
    const frontmatter = (await import('remark-frontmatter')).default;
    const mdxFrontmatter = (await import('remark-mdx-frontmatter')).remarkMdxFrontmatter;

    return defineConfig({
        root: __dirname,
        base: '/fatcher/',
        publicDir: path.resolve(__dirname, 'public'),
        build: {
            outDir: path.resolve(__dirname, '../docs-dist'),
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
        css: {
            modules: {
                localsConvention: 'camelCaseOnly',
                generateScopedName(name, fileName) {
                    if (!scopedNameMap.has(fileName)) {
                        scopedNameMap.set(fileName, Math.random().toString(36).slice(-6));
                    }

                    if (/^prismjs.*/.test(name)) {
                        return name;
                    }

                    return `${name}__${scopedNameMap.get(fileName)}`;
                },
            },
        },
        optimizeDeps: {
            include: ['react/jsx-runtime'],
        },
    });
};
