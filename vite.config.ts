import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		sveltekit({
			alias: { '$lib': 'src/lib' },
			preprocess: vitePreprocess(),
			adapter: adapter({
				platformProxy: {
					configPath: './wrangler.toml'
				}
			})
		}),
		tailwindcss()
	],
	server: {
		host: true
	}
});
