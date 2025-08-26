# GitHub Copilot Assistant Instructions for Junedang Blog

## Project Overview
This is a personal blog application built with SvelteKit, TypeScript, and TailwindCSS. The blog belongs to a Vietnamese software engineer who writes about technology, programming, and life experiences.

## Architecture & Technology Stack

### Core Technologies
- **Framework**: SvelteKit (with TypeScript)
- **Styling**: TailwindCSS with custom styles
- **Build Tool**: Vite
- **HTTP Client**: Axios for API calls
- **Caching**: Node.js cache for API responses
- **Analytics**: Google Analytics (gtag)

### Project Structure
```
src/
├── api/                    # API layer for external blog post service
├── lib/                    # Reusable Svelte components
│   ├── post/              # Blog post related components
│   ├── Header.svelte      # Main navigation
│   ├── Footer.svelte      # Site footer
│   ├── Container.svelte   # Layout wrapper
│   └── FloatingButton.svelte # Scroll to top button
├── routes/                # SvelteKit file-based routing
│   ├── +layout.svelte     # Root layout
│   ├── +page.svelte       # Homepage
│   └── posts/             # Blog post routes
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── app.html              # HTML template
```

## Development Guidelines

### Code Style & Conventions

#### Svelte Components
- Use TypeScript for all components (`<script lang="ts">`)
- Follow PascalCase for component names
- Use kebab-case for CSS classes
- Prefer composition over inheritance
- Keep components focused and single-purpose

#### CSS & Styling
- Use TailwindCSS utilities as the primary styling method
- Custom styles should be added in `<style>` blocks when needed
- Use responsive design patterns (`md:`, `lg:` prefixes)
- Follow mobile-first approach

#### TypeScript
- Define clear interfaces in `src/types/`
- Use optional properties (`?`) when appropriate
- Prefer `type` over `interface` for simple data structures
- Export types for reusability across components

### Component Patterns

#### Layout Components
- `Container.svelte`: Provides consistent spacing and max-width
  - Props: `padding` (default: "lg:px-4 lg:py-6 px-4 py-4"), `margin` (default: "mx-auto")
  - Always wraps content in responsive container

#### Post Components
- `PostItem.svelte`: Conditional rendering based on image presence
- `PostItemWithImage.svelte` / `PostItemWithNoImage.svelte`: Specialized layouts
- Follow the pattern of checking for `post.image` to determine layout

#### Navigation
- `Header.svelte`: Responsive navigation with mobile menu
- Use `mdMenuClass` and `smMenuClass` for consistent styling
- Active page highlighting with `.active` class

### API Integration

#### Blog Posts
- Posts are fetched from external API via `src/api/posts.api.ts`
- Uses caching layer with `node-cache`
- Post data structure defined in `src/types/posts.ts`
- Always filter posts by `post.title` existence

#### Environment Variables
- API configuration in `env` variables
- Separate private and public environment handling
- Maintenance mode toggle via `PUBLIC_MAINTENANCE_MODE`

### Common Development Tasks

#### Adding New Pages
1. Create route file in `src/routes/`
2. Add server-side data loading if needed (`+page.server.ts`)
3. Update navigation in `Header.svelte` if public page
4. Ensure responsive design patterns

#### Creating New Components
1. Place in appropriate `src/lib/` subdirectory
2. Use TypeScript with proper type definitions
3. Follow existing naming conventions
4. Export from component for reusability

#### Styling Guidelines
- Use existing Tailwind color palette (gray, sky, stone)
- Maintain consistent spacing patterns
- Ensure mobile responsiveness
- Use semantic HTML elements

### SEO & Performance
- Include proper meta tags in `<svelte:head>`
- Use descriptive alt text for images
- Implement proper heading hierarchy
- Consider loading states for dynamic content

### Accessibility Guidelines
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation works
- Use sufficient color contrast
- Include screen reader friendly text

### Error Handling
- Handle API failures gracefully
- Provide loading states for async operations
- Use proper error boundaries where appropriate
- Log errors appropriately

### Testing Approach
- Focus on component behavior over implementation
- Test user interactions and navigation
- Verify responsive design on different viewports
- Test with and without JavaScript enabled

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run TypeScript and Svelte checks

## Key Features to Maintain
1. **Responsive Design**: All components must work on mobile and desktop
2. **Performance**: Efficient API caching and minimal bundle size
3. **SEO**: Proper meta tags and semantic markup
4. **Accessibility**: Screen reader friendly and keyboard navigable
5. **Maintenance Mode**: Toggle functionality for site updates

## When Making Changes
- Test on both mobile and desktop viewports
- Verify API integration still works
- Check for TypeScript errors with `npm run check`
- Ensure new features follow existing design patterns
- Consider impact on SEO and accessibility

## Contact & Blog Context
- Author: Vietnamese software engineer
- Focus: Technology, programming, cloud, finance, gaming, writing
- Audience: Technical professionals and fellow developers
- Tone: Professional but approachable