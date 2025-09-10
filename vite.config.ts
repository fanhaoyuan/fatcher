import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      name: 'Fatcher',
      formats: ['cjs', 'umd', 'es'],
      entry: ['src/index.ts'],
      fileName: (format, entry) =>
        [entry, format === 'cjs' ? '' : format === 'es' ? 'esm' : 'min', 'js']
          .filter(Boolean)
          .join('.'),
    },
  },
});
