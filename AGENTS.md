# AI Agent Instructions - Junedang Blog

## Architecture Overview

This is a **SvelteKit SSR application** that consumes blog content from an external GitHub Pages site. The app acts as a modern frontend wrapper around statically-generated Jekyll blog posts.

### Data Flow Pattern
```
External GitHub Pages API → NodeCache (TTL: 3600s) → SvelteKit Server Load → Svelte Components
```

**Critical**: All blog data comes from `GITHUB_PAGE_URL/GITHUB_BLOG_APP/api/pages` (see `src/api/posts.api.ts`). Posts are cached in-memory via `node-cache` to avoid rate limits. The cache layer is in `src/api/index.ts` with configurable `API_CACHE_TTL`.

### Dual Content Fetching
Posts are fetched in two ways:
1. **Metadata**: From `/api/pages` endpoint (JSON) - used for listings
2. **Full Content**: From GitHub raw API (`jekyll/${slug}.md`) and rendered HTML (`${slug}.html`) - used for individual post pages (see `src/routes/posts/[slug]/+page.server.ts`)

## Environment Variables (Required)

Private (server-side only in `$env/dynamic/private`):
- `GITHUB_PAGE_URL` - Base URL of GitHub Pages site (e.g., https://jimmy706.github.io)
- `GITHUB_BLOG_APP` - Repository path segment (e.g., junedang-blog-pages)
- `API_CACHE_TTL` - Cache duration in seconds (default: 3600)

Public (available client-side in `$env/dynamic/public`):
- `PUBLIC_MAINTENANCE_MODE` - "true" to show maintenance page, anything else for normal operation

## Component Architecture Patterns

### Conditional Layout Strategy
Post rendering uses **composition over configuration**:
```svelte
<!-- PostItem.svelte acts as router -->
{#if havingImage}
  <PostItemWithImage {post} />
{:else}
  <PostItemWithNoImage {post} />
{/if}
```
This pattern is used instead of prop-based conditional rendering. When adding post layouts, create separate components and route through `PostItem.svelte`.

### Container Wrapper Pattern
**Always** use `Container.svelte` for page-level spacing:
```svelte
<Container padding="lg:px-4 lg:py-6 px-4 py-4" margin="mx-auto">
  <!-- content -->
</Container>
```
Do NOT add max-width or centering directly in routes - delegate to Container.

## Developer Workflows

### Testing
```bash
npm test          # Run all tests in watch mode
npm run test:ui   # Open Vitest UI
npm run test:run  # Single run (CI mode)
```

**Test Setup**: Uses `jsdom` environment (see `vitest.config.ts`). All tests use `src/test-setup.ts` for global setup. Test files follow `*.test.ts` or `*.spec.ts` naming.

**Key Pattern**: Server-side logic tests mock `$env/dynamic/private`:
```typescript
vi.mock('$env/dynamic/private', () => ({
  env: {
    GITHUB_PAGE_URL: 'https://test.github.io',
    GITHUB_BLOG_APP: 'test-blog',
    API_CACHE_TTL: '60'
  }
}));
```

### Build & Deployment
```bash
npm run build   # Creates build/ directory with Node.js adapter
npm run preview # Test production build locally
npm run check   # TypeScript + Svelte validation (run before commits)
```

The app uses `@sveltejs/adapter-node` (see `svelte.config.js`) - outputs to `build/` as a standalone Node.js server. Dockerfile shows production deployment pattern.

## Critical Conventions

### Post Data Contract
Posts **must** have a `title` property to be displayed. The API filters: `.filter((post) => post.title)` (see `src/api/posts.api.ts:12`). All other Post fields are optional (see `src/types/posts.ts`).

### Security Headers
All responses include CSP, X-Frame-Options, etc. via `hooks.server.ts`. When adding external integrations (fonts, scripts, analytics), update CSP in the `handle()` function.

### Maintenance Mode Toggle
Root layout (`src/routes/+layout.svelte`) checks `PUBLIC_MAINTENANCE_MODE == "true"` (string comparison). When true, renders `Maintance.svelte` instead of entire app. Toggle via environment variable, no code changes needed.

### File-Based Routing
- `+page.svelte` - Component rendering
- `+page.server.ts` - Server-side data loading (export `load` function)
- `+layout.svelte` - Shared layout wrapper
- `[slug]/` - Dynamic route segments

## Integration Points

### External Blog API
Posts come from a separate GitHub Pages repository. The API contract:
- Endpoint: `${GITHUB_PAGE_URL}/${GITHUB_BLOG_APP}/api/pages`
- Returns: `Post[]` with optional fields
- Rate limiting: Handled via caching layer

### GitHub Raw Content API
Individual posts fetch markdown from GitHub API:
```typescript
GET https://api.github.com/repos/jimmy706/junedang-blog-pages/contents/jekyll/${slug}.md
Headers: Accept: application/vnd.github.raw+json
```

### Google Analytics
Configured in root layout with CSP allowances for `www.googletagmanager.com` and `www.google-analytics.com`. Scripts loaded via `svelte:head` blocks.

## Common Pitfalls

1. **Cache Invalidation**: No manual cache clearing implemented. Restart server or wait for TTL expiration.
2. **Dynamic Imports**: Use `$env/dynamic/*` not `$env/static/*` - values come from runtime environment, not build time.
3. **Post Sorting**: Not done in API layer - sort in `+page.server.ts` (see `src/routes/posts/+page.server.ts`).
4. **Image Paths**: Post images are relative to external blog URL, not this app's static folder.
5. **TypeScript Strictness**: Project uses `svelte-check` - all components need `lang="ts"` in script tags.
