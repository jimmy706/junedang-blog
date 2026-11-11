import { defineEnvVars } from '@sveltejs/kit/env';

// Variables remain dynamic so deployment settings are read at runtime.
export const variables = defineEnvVars({
	GITHUB_PAGE_URL: { schema: (value) => value },
	GITHUB_BLOG_APP: { schema: (value) => value },
	API_URL: { schema: (value) => value },
	API_CACHE_TTL: { schema: (value) => value },
	PUBLIC_MAINTENANCE_MODE: { public: true, schema: (value) => value }
});
