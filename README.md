# A Svelte application for simple blog platform

## Testing

This project includes comprehensive unit tests covering core functionality, API layer, utilities, and component logic. See [TESTING.md](./TESTING.md) for detailed testing documentation.

**Quick start:**
```bash
# Run all tests
npm run test:run

# Run tests in watch mode  
npm run test

# Run tests with UI
npm run test:ui
```

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Deploy to Cloudflare Pages

This project is configured for Cloudflare Pages using `@sveltejs/adapter-cloudflare` and `wrangler`.

### 1) Build locally

```bash
npm install
npm run build
```

### 2) Cloudflare Pages project settings

- **Framework preset**: `None`
- **Build command**: `npm run build`
- **Build output directory**: `.svelte-kit/cloudflare`

### 3) Required environment variables (Preview + Production)

- `GITHUB_PAGE_URL`
- `GITHUB_BLOG_APP`
- `API_CACHE_TTL`
- `API_URL`
- `PUBLIC_MAINTENANCE_MODE`

### 4) Wrangler local development and deploy

```bash
# copy local env template
cp .dev.vars.example .dev.vars

# build app
npm run build

# preview with Cloudflare runtime
npm run cf:dev

# deploy from CLI (requires `wrangler login`)
# optionally set explicit Pages project name (recommended for CI)
export CF_PAGES_PROJECT_NAME=junedang-blog
npm run cf:deploy
```

If you see `Project not found [code: 8000007]`, create the Pages project first (one-time):

```bash
npx wrangler pages project create "$CF_PAGES_PROJECT_NAME"
```
