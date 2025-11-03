/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog, { PrerenderContentFile } from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      ssr: true,
      static: true,
      content: {
        highlighter: 'shiki',
        shikiOptions: {
          highlight: {
            theme: 'ayu-dark',
          },
          highlighter: {
            additionalLangs: ['powershell'],
          },
        },
      },
      prerender: {
        routes: async () => [
          '/',
          '/blog',
          {
            contentDir: 'src/content',
            transform: (file: PrerenderContentFile) => {
              // use the slug from frontmatter if defined, otherwise use the file's basename
              const slug = file.attributes['slug'] || file.name;
              return `/blog/${slug}`;
            },
          },
        ],
      },
    }),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
