# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Monorepo with two workspaces: a **Sanity Studio** CMS (`/studio`) and a **Next.js** frontend (`/frontend`). Content is managed in Sanity and rendered via Next.js with real-time visual editing support.

**Tech stack**: Next.js 16, React 19, Sanity 5, Tailwind CSS 4, TypeScript (strict mode), next-sanity for Live Content API.

## Commands

All commands run from the repo root unless noted.

```bash
# Development (runs both Next.js on :3000 and Studio on :3333)
npm run dev

# Run individually
npm run dev:next       # Next.js only
npm run dev:studio     # Sanity Studio only

# Type generation (auto-runs before dev/build via predev scripts)
npm run sanity:typegen             # from studio/ or frontend/
cd studio && npx sanity typegen generate   # manual

# Linting & formatting
npm run lint           # ESLint (frontend only)
npm run format         # Prettier (all files)
npm run type-check     # TypeScript check across all workspaces

# Build
cd studio && npm run build    # Build Sanity Studio
cd frontend && npm run build  # Build Next.js app

# Deploy Studio to Sanity cloud
cd studio && npx sanity deploy

# Import sample data
npm run import-sample-data
```

## Architecture

### Schema System (`studio/src/schemaTypes/`)

Schemas are organized into three categories and exported from `index.ts`:

- **documents/**: `page`, `post`, `person`, `footer` — top-level content types
- **objects/**: `blockContent`, `blockContentTextOnly`, `link`, `button`, `announcementBar`, `heroSection`, `statsIconBar`, `featureBlock`, `comparisonTable`, `statsBand`, `testimonialsCarousel`, `imageCta` — reusable embedded types (page builder blocks + primitives)
- **singletons/**: `settings` (ID: `siteSettings`) — global site config; references the `footer` document

All schemas use `defineType`/`defineField`/`defineArrayMember` from Sanity. Type generation produces `sanity.types.ts` in both workspaces.

### Page Builder Pattern

The `page` document has a `pageBuilder` array field accepting section blocks: `heroSection`, `statsIconBar`, `featureBlock`, `comparisonTable`, `testimonialsCarousel`, `statsBand`, `imageCta`. On the frontend, `PageBuilder.tsx` → `BlockRenderer.tsx` maps block `_type` to the correct component in `frontend/app/components/sections/`.

### Polymorphic Link System

The `link` object uses a `linkType` field (`href` | `page` | `post`) with conditional visibility. Fields are hidden/shown based on selected type. Validation ensures the correct field is filled. `ResolvedLink.tsx` handles rendering for all link types.

### Frontend Data Flow (`frontend/sanity/lib/`)

- **client.ts**: Sanity client with `useCdn: true` and stega support for visual editing
- **queries.ts**: All GROQ queries with `pageBuilderExpansion` fragment for resolving section images/references
- **live.ts**: Live Content API setup via `next-sanity/live`
- **token.ts**: Server-side read token management

### Routing

- `/` — Homepage (page document with slug matching homepage)
- `/[slug]` — Dynamic pages from `page` documents
- `/api/draft-mode/enable|disable` — Draft mode toggle

Pages use `generateStaticParams()` for static generation and `generateMetadata()` for SEO.

### Studio Configuration (`studio/sanity.config.ts`)

Plugins: `presentationTool` (visual editing), `structureTool` (custom nav), `unsplashImageAsset`, `assist` (AI content/alt text), `visionTool` (GROQ explorer).

Custom structure in `studio/src/structure/index.ts` groups settings as a singleton and hides internal types from the default list.

## Environment Variables

**Studio** (`.env` in `/studio`):
- `SANITY_STUDIO_PROJECT_ID` (required)
- `SANITY_STUDIO_DATASET` (required, default: `production`)
- `SANITY_STUDIO_PREVIEW_URL` (optional, default: `http://localhost:3000`)

**Frontend** (`.env.local` in `/frontend`):
- `NEXT_PUBLIC_SANITY_PROJECT_ID` (required)
- `NEXT_PUBLIC_SANITY_DATASET` (required)
- `SANITY_API_READ_TOKEN` (required — create in Sanity console)
- `NEXT_PUBLIC_SANITY_STUDIO_URL` (optional, default: `http://localhost:3333`)

## Key Conventions

- Sanity images use hotspot/crop support — always use `@sanity/image-url` for URL generation
- `blockContent` supports image and link annotations (URL, page ref, post ref); `blockContentTextOnly` is text-only
- Frontend components live in `frontend/app/components/` — layout components in `layout/`, page sections in `sections/`, shared primitives in `ui/`
- Navigation uses a 3-column CSS grid on desktop (`grid-cols-3`) to keep the logo perfectly centered regardless of nav link count; mobile uses a separate flex layout with hamburger menu
- Tailwind uses custom colors (cream, cream-dark, green, yellow) with a max container width of 1380px; serif font for headings/buttons, sans for body text
- The testimonials carousel uses a CSS marquee animation (auto-scrolling, pauses on hover, respects `prefers-reduced-motion`)
- Several section schemas (`comparisonTable`, `testimonialsCarousel`, `statsIconBar`) support uploadable image icons with Iconify fallbacks; use the `SanityImage` component with the asset `_id`
- Buttons use `font-serif` and `rounded-full` with `primary` (yellow bg), `secondary` (green bg), and `outline` variants
- Remote images configured for `cdn.sanity.io` in `next.config.ts`
