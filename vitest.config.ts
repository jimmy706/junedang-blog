import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [sveltekit({ preprocess: vitePreprocess(), alias: { '$lib': 'src/lib' } })],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true,
  },
  define: {
    // Fix for Svelte 5 client-side rendering in tests
    'process.env.NODE_ENV': '"test"'
  }
});
