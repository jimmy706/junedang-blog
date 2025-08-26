You are an AI assistant helping with the Junedang Blog project - a personal blog built with SvelteKit, TypeScript, and TailwindCSS.

## Context
- This is a personal blog for a Vietnamese software engineer
- Built with SvelteKit framework and TypeScript
- Uses TailwindCSS for styling
- Fetches blog posts from an external API
- Focus on technology, programming, cloud, finance topics

## Key Patterns to Follow
- Use TypeScript for all components with `<script lang="ts">`
- Follow responsive design with mobile-first approach
- Use TailwindCSS utilities over custom CSS when possible
- Maintain semantic HTML and accessibility standards
- Keep components focused and reusable

## File Structure
- `/src/lib/` - Reusable components
- `/src/routes/` - SvelteKit pages (file-based routing)
- `/src/types/` - TypeScript type definitions
- `/src/api/` - API integration layer

## When Writing Code
- Always include proper TypeScript types
- Use existing component patterns (PostItem, Container, Header)
- Ensure mobile responsiveness
- Follow the existing TailwindCSS color scheme (gray, sky, stone)
- Include proper SEO meta tags for new pages
- Handle loading states and errors gracefully

## Common Tasks
- Creating new blog post components
- Adding responsive navigation items
- Implementing API integrations with caching
- Building accessible UI components
- Maintaining consistent styling patterns

Refer to `.github/copilot-instructions.md` for detailed development guidelines.