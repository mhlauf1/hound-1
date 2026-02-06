# Changelog

All notable changes to the Hound Around Resort website project will be documented in this file.

## [Unreleased]

### Added

#### Design Foundation
- Custom Tailwind v4 theme with Hound Around design tokens: cream (`#fef1e1`), cream-dark (`#f2e9dd`), green (`#003005`), yellow (`#ffda00`)
- Cormorant Garamond (serif, weights 300/400, normal + italic) via `next/font/google`
- Switzer (sans, weights 400/500/600) via Fontshare CDN
- Responsive typography system: H1 84px desktop / 56px tablet / 40px mobile, H2 56px / 40px / 32px
- Container utility: max-width 1280px, 40px padding (20px mobile)
- CSS custom properties for derived tokens (`--color-text-secondary`, `--color-border-dashed`, `--shadow-card`)
- Scrollbar-hiding utility class for carousel components
- Installed `@iconify/react` for icon system

#### Sanity Schemas (9 new types)
- `announcementBar` object — text, linkText, linkUrl, isVisible toggle
- `heroSection` object — ratingCount, headline with italic emphasis, subtext, CTA, hero image with hotspot
- `statsIconBar` object — array of items with custom SVG icon or Iconify fallback + label
- `featureBlock` object — image with position toggle (left/right), headline, CTA with variant, badge label, list items with icons
- `comparisonTable` object — headline, subheadline, competitor columns, highlight column, rows with boolean values
- `statsBand` object — optional logo, array of stat cards with value/label/optional icon
- `testimonialsCarousel` object — headline, array of testimonials with quote/name/descriptor
- `imageCta` object — headline, CTA, background image with hotspot, overlay opacity control
- `footer` document — singleton (ID: `siteFooter`) with tagline, link columns, address, phone, email, copyright, parent company

#### Extended Existing Schemas
- `page` document: added 7 new section types to `pageBuilder` array, added `seo` object field (metaTitle, metaDescription, ogImage)
- `settings` singleton: added logo, phone, email, address, announcementBar, navigation array, footer reference; organized into fieldsets (Branding, Contact, Announcement, Navigation, SEO)
- Updated Studio structure with Footer singleton entry and divider

#### GROQ Queries
- `homepageQuery` — fetches page document with `slug.current == "home"`, expands all section types with asset dereferencing
- Expanded `settingsQuery` — dereferences footer document with all fields
- Shared `pageBuilderExpansion` fragment — handles asset dereferencing for heroSection, statsIconBar, featureBlock, imageCta
- Updated `getPageQuery` to use the same shared expansion

#### UI Primitives (5 components)
- `Container` — responsive wrapper with max-width and padding
- `Button` — 3 variants (primary/yellow, secondary/green, outline/transparent), renders as `<Link>` or `<button>`, pill shape
- `Badge` — uppercase label with letter-spacing for section badges
- `StarRating` — row of filled star icons with optional rating text
- `CheckXMark` — boolean indicator with yellow check circle or muted X circle

#### Layout Components (3 components)
- `AnnouncementBar` — full-width green strip with text + bold link, visibility toggle from settings
- `Navigation` — sticky 3-column layout (nav links | logo wordmark | phone + Book Now CTA), mobile hamburger with slide-out drawer, backdrop blur
- `Footer` — 4-column grid (brand + tagline, dynamic link columns from Sanity, contact info), bottom bar with copyright + parent company link + privacy/terms links

#### Homepage Section Components (7 components)
- `HeroSection` — 2-column (55/45) layout, star rating, headline with italic emphasis, subtext, CTA with micro-copy, hero image with green border
- `StatsIconBar` — border-top separator, 4-column grid (2x2 mobile), custom SVG or Iconify icon + uppercase label
- `FeatureBlock` — 2-column with image position toggle, headline, CTA with variant, badge, icon list items; used for both Services and Benefits sections
- `ComparisonTable` — centered max-w-900, dashed-border table container, competitor columns + yellow highlight column, CheckXMark cells, uppercase feature labels
- `StatsBand` — full-width yellow band with cream border, optional logo wordmark, 4-column stat cards (2x2 mobile) with serif values and uppercase labels
- `TestimonialsCarousel` — paw icon + heading, horizontal scroll with snap, yellow cards with paw icon/quote/attribution, hidden scrollbar
- `ImageCta` — full-bleed (w-screen breakout), background image with dark overlay at configurable opacity, centered italic headline in cream, primary CTA

#### Page Routing
- Homepage (`/`) now fetches page with slug "home" and renders via PageBuilder
- Simplified `[slug]/page.tsx` — removed heading/subheading wrapper, renders PageBuilder directly
- Fallback messages for missing homepage and missing pages

### Changed
- `layout.tsx` — replaced Inter + IBM Plex Mono fonts with Cormorant Garamond + Switzer; replaced old Header/Footer with new layout components; cream background + green text
- `globals.css` — complete rewrite from template defaults to Hound Around design system
- `tailwind.config.ts` — replaced all colors/fonts/container config
- `BlockRenderer.tsx` — added 7 new section types via `wrapSection()` adapter pattern
- `Posts.tsx` — removed Onboarding import, replaced empty state with simple text message
- `studio/sanity.config.ts` — title changed to "Hound Around Resort", homepage route resolves to page with slug "home" instead of settings
- `studio/src/structure/index.ts` — added Footer singleton, hides footer from document list

### Removed
- `GetStartedCode.tsx` — template artifact
- `SideBySideIcons.tsx` — template artifact
- `Onboarding.tsx` — template artifact
- `sanity/lib/demo.ts` — template demo data

### Technical Notes
- All type checks pass (`npm run type-check`)
- ESLint passes (`npm run lint`)
- Production builds succeed for both Studio and Next.js (`npm run build`)
- Types generated for both workspaces via `sanity typegen generate`
- Schema extracted to root `sanity.schema.json` (shared by studio + frontend typegen)
- Existing template patterns preserved: `pageBuilder` field name, `BlockRenderer` + `PageBuilder` components, visual editing data attributes, `useOptimistic` hook, draft mode pipeline
- Blog system (post/person schemas, routes) kept dormant but functional
- Existing section types (callToAction, infoSection) kept registered for inner page use

### Still Pending
- Content population in Sanity Studio (homepage sections, settings, footer document)
- Image uploads (hero, features, image CTA, logo)
- Responsive polish pass (tablet/mobile fine-tuning)
- Visual editing QA (click-to-edit section highlighting)
- Inner page routes (services/daycare, services/boarding, etc.)
- PortableText link color update for new palette
