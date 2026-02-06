# Hound Around Resort — Design 1 Project Spec

## "Resort Editorial" — Warm, Elevated, Family-Owned Feel

> A complete build spec for Claude Code. This document defines every design token, component, section, Sanity schema, and route needed to develop Design 1 of the Hound Around Resort website using Next.js + Sanity (sanity-template-nextjs-clean).

---

## 1. Project Overview

**Business**: Hound Around Resort — Dog daycare, boarding, grooming, and self-wash facility in Cottage Grove, Minnesota. Part of the Embark Pet Services network. Family-owned since 2013. Features 8,800 sq ft of play space, live webcams, and suite-style boarding.

**Design Direction**: "Resort Editorial" — Warm cream backgrounds, deep forest green typography, golden yellow accents. The overall feel is editorial/magazine-inspired with elegant serif headlines, clean sans-serif body text, and a confident, unhurried layout with generous whitespace. This is a premium local business that looks like a thoughtful brand, not a generic pet care site.

**Tech Stack** (already initialized from `sanity-template-nextjs-clean`):

- Next.js 16.1.1 (App Router) + React 19.2.3
- Sanity v5.1.0 + next-sanity 12.0.5
- Tailwind CSS v4.1.17 (with `@tailwindcss/postcss` and `@tailwindcss/typography`)
- TypeScript
- Iconify (general icons) + custom SVGs (illustrated icons — provided separately)
- Google Fonts: Cormorant Garamond + Switzer (or Fontshare CDN)
- Vercel deployment + `@vercel/speed-insights`
- Additional: `@sanity/client`, `@sanity/image-url`, `@sanity/uuid`, `sanity-image`, `date-fns`, `sonner` (toasts)

**Key Dependencies** (`frontend/package.json`):

```json
{
  "dependencies": {
    "@sanity/client": "^7.13.2",
    "@sanity/image-url": "^1.2.0",
    "@sanity/uuid": "^3.0.2",
    "@tailwindcss/postcss": "^4.1.17",
    "@tailwindcss/typography": "^0.5.19",
    "@vercel/speed-insights": "^1.2.0",
    "autoprefixer": "^10.4.22",
    "date-fns": "^4.1.0",
    "next": "16.1.1",
    "next-sanity": "^12.0.5",
    "postcss": "^8.5.6",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "sanity": "^5.1.0",
    "sanity-image": "^1.0.0",
    "sonner": "^2.0.7",
    "tailwindcss": "^4.1.17"
  }
}
```

---

## 2. Design Tokens

### 2.1 Color Palette

```css
:root {
  /* Core palette */
  --color-cream: #fef1e1; /* Main background, card fills */
  --color-cream-dark: #f2e9dd; /* Secondary background, subtle contrast areas */
  --color-green: #003005; /* Headlines, body text, borders, nav, footer bg */
  --color-yellow: #ffda00; /* Primary accent, CTA fills, highlight column, testimonial cards, stats band */

  /* Derived / functional */
  --color-text-primary: var(--color-green);
  --color-text-secondary: rgba(0, 48, 5, 0.7); /* 70% opacity green for subtext */
  --color-text-on-dark: var(--color-cream); /* Text on dark green backgrounds */
  --color-text-on-yellow: var(--color-green); /* Text on yellow backgrounds */
  --color-border: var(--color-green);
  --color-border-dashed: rgba(0, 48, 5, 0.3); /* Lighter green for dashed separators */
  --color-surface: var(--color-cream);
  --color-surface-alt: var(--color-cream-dark);

  /* Shadows */
  --shadow-card: 0 2px 8px rgba(0, 48, 5, 0.06);
  --shadow-card-hover: 0 4px 16px rgba(0, 48, 5, 0.1);
}
```

### 2.2 Tailwind Theme Extension

> **Note**: This project uses **Tailwind CSS v4** which uses CSS-based configuration, not `tailwind.config.ts`. Theme tokens are defined in your CSS file using `@theme`.

```css
/* styles/globals.css */
@import 'tailwindcss';

@theme {
  --color-cream: #fef1e1;
  --color-cream-dark: #f2e9dd;
  --color-green: #003005;
  --color-yellow: #ffda00;

  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Switzer', system-ui, sans-serif;

  --radius-default: 12px;
  --radius-pill: 9999px;
}
```

### 2.3 Typography Scale

| Role                      | Font               | Weight        | Size             | Line Height | Letter Spacing | Style                               |
| ------------------------- | ------------------ | ------------- | ---------------- | ----------- | -------------- | ----------------------------------- |
| **H1 / Hero headline**    | Cormorant Garamond | 300 (Light)   | 84px / 5.25rem   | 90% (0.9)   | -1px           | Normal; italic for emphasized words |
| **H2 / Section headline** | Cormorant Garamond | 300 (Light)   | 56px / 3.5rem    | 95% (0.95)  | -0.5px         | Normal                              |
| **H3 / Card headline**    | Cormorant Garamond | 400 (Regular) | 36px / 2.25rem   | 100% (1.0)  | 0              | Normal                              |
| **H4 / Small heading**    | Cormorant Garamond | 400 (Regular) | 24px / 1.5rem    | 110% (1.1)  | 0              | Normal                              |
| **Body / Paragraph**      | Switzer            | 400 (Regular) | 20px / 1.25rem   | 150% (1.5)  | 0              | Normal                              |
| **Body small**            | Switzer            | 400 (Regular) | 16px / 1rem      | 150% (1.5)  | 0              | Normal                              |
| **Badge / Label**         | Switzer            | 500 (Medium)  | 13px / 0.8125rem | 100%        | 10% (0.1em)    | Uppercase                           |
| **Nav link**              | Switzer            | 400 (Regular) | 16px / 1rem      | 100%        | 0              | Normal                              |
| **Button**                | Switzer            | 500 (Medium)  | 16px / 1rem      | 100%        | 0.02em         | Normal                              |
| **Stat number**           | Cormorant Garamond | 300 (Light)   | 48px / 3rem      | 100%        | 0              | Normal                              |
| **Stat label**            | Switzer            | 500 (Medium)  | 14px / 0.875rem  | 120%        | 0.05em         | Uppercase                           |
| **Footer body**           | Switzer            | 400 (Regular) | 14px / 0.875rem  | 160%        | 0              | Normal                              |

#### Responsive Typography Scaling

- **Desktop**: Sizes as listed above (1440px+)
- **Tablet**: H1 → 56px, H2 → 40px, Body stays 18-20px
- **Mobile**: H1 → 40px, H2 → 32px, Body stays 18px

### 2.4 Spacing System

```css
/* Section padding */
--section-padding-y: 120px; /* Desktop vertical section spacing */
--section-padding-y-tablet: 80px;
--section-padding-y-mobile: 60px;

/* Container */
--container-max-width: 1280px;
--container-padding-x: 40px; /* Desktop horizontal padding */
--container-padding-x-mobile: 20px;

/* Component spacing */
--gap-xs: 8px;
--gap-sm: 12px;
--gap-md: 16px;
--gap-lg: 24px;
--gap-xl: 32px;
--gap-2xl: 48px;
--gap-3xl: 64px;
```

### 2.5 Border & Radius

- **Default radius**: 12px (images, cards, containers)
- **Buttons**: `border-radius: 9999px` (pill)
- **Border color**: `var(--color-green)` at 1px
- **Dashed borders**: `1px dashed var(--color-border-dashed)` for table rows and decorative separators
- **Image borders**: Some images have a `1px solid var(--color-green)` border + 12px radius
- **Comparison table outer**: Thin dashed green border around the entire table container

---

## 3. Component Library

### 3.1 Buttons

#### Primary Button (Yellow)

```
Background: var(--color-yellow)
Text: var(--color-green)
Font: Switzer Medium, 16px
Padding: 14px 32px
Border-radius: 9999px (pill)
Border: 1px solid var(--color-green)
Hover: brightness(0.95), slight scale(1.02)
Transition: all 200ms ease
```

#### Secondary Button (Dark Green)

```
Background: var(--color-green)
Text: var(--color-cream)
Font: Switzer Medium, 16px
Padding: 14px 32px
Border-radius: 9999px
Border: 1px solid var(--color-green)
Hover: opacity(0.9)
```

#### Outline Button (Transparent)

```
Background: transparent
Text: var(--color-green)
Font: Switzer Medium, 16px
Padding: 14px 32px
Border-radius: 9999px
Border: 1px solid var(--color-green)
Hover: background var(--color-green), text var(--color-cream)
```

### 3.2 Navigation

**Announcement Bar**:

- Full-width, `background: var(--color-green)`
- Centered text in cream/white, Switzer 14px Medium
- Bold link text with underline
- Padding: 10px 0

**Main Nav**:

- Background: `var(--color-cream)` (transparent on cream bg)
- 3-column layout: left nav links | center logo | right phone + CTA
- Logo: "HOUND AROUND RESORT" in custom wordmark (dark green)
- Nav links: Switzer Regular 16px, dark green, no underline, underline on hover
- Right side: phone number text + "Book Now" outline button
- Sticky on scroll with subtle backdrop blur
- Padding: 20px var(--container-padding-x)

### 3.3 Cards

#### Stat Card (on yellow band)

```
Background: var(--color-cream)
Border-radius: 12px
Border: 1px solid var(--color-green)
Padding: 24px 32px
Text-align: center
Stat number: Cormorant Garamond Light 48px
Label: Switzer Medium 14px uppercase
```

#### Testimonial Card

```
Background: var(--color-yellow)
Border-radius: 12px
Padding: 24px
Min-width: 300px (for horizontal scroll)
Icon: Paw print icon at top (dark green)
Quote: Switzer Regular 16px, dark green
Attribution: Switzer Medium 14px, dark green, bottom of card
```

#### Service List Item

```
Layout: icon (left) + label (right)
Icon: 24px, dark green, from Iconify
Label: Switzer Medium 18px, dark green
Spacing: 16px between items
```

### 3.4 Images

- **Border radius**: 12px on all images
- **Hero/feature images**: Optional 1px solid dark green border
- **Aspect ratios**: Hero image ~3:4 portrait, feature images ~4:3 landscape or similar
- **Treatment**: Authentic photography, warm lighting, real dogs and staff
- **Placeholder**: cream-dark (#F2E9DD) with subtle loading shimmer

### 3.5 Icons

**Two icon systems**:

1. **Iconify** — Used for service list icons (boarding suitcase, scissors/grooming, heart/daycare, sparkle/self-wash), benefit icons (webcam, staff, heart, play), and general UI (check marks, X marks, stars, arrows, menu, close)
   - Style: Line/outline, 24px default, stroke-width 1.5-2px
   - Color: `var(--color-green)`
   - Recommended set: `lucide` or `tabler` via Iconify

2. **Custom SVGs** — Used for the illustrated stats bar below hero (shield, paw print, webcam, bathtub) and the Hound Around logo/wordmark
   - These will be provided as SVG files
   - Until provided, use Iconify placeholders from `tabler` set

### 3.6 Check / X Marks (Comparison Table)

- **Check (✓)**: Circle with checkmark inside, on yellow background
- **X mark**: Circle with X inside, on cream background, muted style
- Both should feel hand-drawn / editorial, not generic. Use custom SVGs or styled Unicode.

---

## 4. Page Structure & Routes

```
/                          → Homepage (page builder — this spec)
/about                     → About Us
/services/daycare          → Daycare service page
/services/boarding         → Boarding service page
/services/grooming         → Grooming service page
/services/self-wash        → Self-Wash service page
/webcams                   → Live Webcam feeds
/pricing                   → Pricing tables
/contact                   → Contact / Schedule orientation
```

### Global Elements (every page)

- Announcement Bar
- Navigation
- Footer

---

## 5. Homepage Sections (Top to Bottom)

### Section 1: Announcement Bar

**Component**: `AnnouncementBar`
**Layout**: Full-width dark green strip
**Content**:

- Text: "We're offering self-wash! Click **here** to sign up"
- Link destination: `/services/self-wash`

**Sanity Schema Fields**:

```ts
{
  name: 'announcementBar',
  type: 'object',
  fields: [
    { name: 'text', type: 'string', title: 'Announcement Text' },
    { name: 'linkText', type: 'string', title: 'Link Text' },
    { name: 'linkUrl', type: 'string', title: 'Link URL' },
    { name: 'isVisible', type: 'boolean', title: 'Show Announcement Bar' },
  ]
}
```

---

### Section 2: Hero

**Component**: `HeroSection`
**Layout**: 2-column split on desktop, stacked on mobile

- **Left column** (55% width):
  - Star rating row: 5 gold/yellow stars + "2000+ 5 Star Reviews" text (Switzer 14px, secondary text color)
  - Headline: "Your dog's home _away from home_" — H1 serif, "away from home" in italic
  - Subtext: "More than daycare. It's a resort. Where every pup gets the royal treatment, from spacious suites to all-day play. Family-owned since 2013." — Body text, secondary color
  - CTA: "Schedule a Free Orientation" — Primary yellow button
  - Micro-copy below button: "Join 100k+ pups who switched from frozen to fresh!" — Body small, secondary color
- **Right column** (45% width):
  - Large photo of dog, rounded 12px, thin dark green border
  - Photo should feel candid/authentic, warm lighting

**Spacing**: Section padding 120px top, 80px bottom. Gap between columns: 64px.

**Sanity Schema Fields**:

```ts
{
  name: 'heroSection',
  type: 'object',
  fields: [
    { name: 'ratingCount', type: 'string', title: 'Rating Text (e.g. "2000+ 5 Star Reviews")' },
    { name: 'headline', type: 'string', title: 'Headline' },
    { name: 'headlineEmphasis', type: 'string', title: 'Italic Part of Headline' },
    { name: 'subtext', type: 'text', title: 'Subtext Paragraph' },
    { name: 'ctaText', type: 'string', title: 'CTA Button Text' },
    { name: 'ctaUrl', type: 'string', title: 'CTA Button URL' },
    { name: 'microCopy', type: 'string', title: 'Below-button micro-copy' },
    { name: 'heroImage', type: 'image', title: 'Hero Image', options: { hotspot: true } },
  ]
}
```

---

### Section 3: Stats Icon Bar

**Component**: `StatsIconBar`
**Layout**: Full-width, separated from hero by a 1px solid dark green top border. 4-column grid (equal width). Each cell: icon above + uppercase label below. Centered.
**Content**:
| Icon | Label |
|------|-------|
| Shield icon | FAMILY OWNED SINCE 2013 |
| Paw prints icon | 10,000+ DOGS SERVED & LOVED |
| Webcam icon | LIVE WEBCAMS WATCH ANYTIME |
| Bathtub icon | FULL GROOMING SPA ON-SITE |

**Styling**:

- Icons: Custom SVG, ~48px, dark green (placeholder: Iconify `tabler:shield-check`, `tabler:paw`, `tabler:device-tv`, `tabler:bath`)
- Labels: Switzer Medium 14px, uppercase, 5% letter-spacing, dark green
- Padding: 40px 0
- Divider: 1px solid dark green line at top of section

**Sanity Schema Fields**:

```ts
{
  name: 'statsIconBar',
  type: 'object',
  fields: [
    {
      name: 'items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', type: 'image', title: 'Icon SVG' },
          { name: 'iconFallback', type: 'string', title: 'Iconify icon name fallback' },
          { name: 'label', type: 'string', title: 'Label' },
        ]
      }]
    }
  ]
}
```

---

### Section 4: Services Feature (Image + Content)

**Component**: `FeatureBlock`
**Layout**: 2-column, image left + content right

- **Left**: Photo of staff member with dog, rounded 12px, optional border
- **Right**:
  - Headline: "Care that does more for your pet. And you." — H2 serif
  - CTA: "More About Our Services" — Secondary (dark green fill) button
  - Label: "4-1 PET BENEFITS" — Badge text (uppercase, spaced)
  - Service list (4 items with icons):
    - 🏨 Boarding
    - ✂️ Grooming
    - 🐾 Day Care
    - ✨ Self-Wash

**Sanity Schema Fields**:

```ts
{
  name: 'featureBlock',
  type: 'object',
  fields: [
    { name: 'image', type: 'image', title: 'Feature Image', options: { hotspot: true } },
    { name: 'imagePosition', type: 'string', title: 'Image Position', options: { list: ['left', 'right'] } },
    { name: 'headline', type: 'string', title: 'Headline' },
    { name: 'ctaText', type: 'string', title: 'CTA Text' },
    { name: 'ctaUrl', type: 'string', title: 'CTA URL' },
    { name: 'ctaVariant', type: 'string', title: 'CTA Style', options: { list: ['primary', 'secondary', 'outline'] } },
    { name: 'label', type: 'string', title: 'Section Label (badge)' },
    {
      name: 'listItems',
      type: 'array',
      title: 'Feature List',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', type: 'string', title: 'Iconify Icon Name' },
          { name: 'text', type: 'string', title: 'Item Text' },
        ]
      }]
    },
  ]
}
```

---

### Section 5: Why Us / Benefits Feature (Content + Image)

**Component**: Reuse `FeatureBlock` with `imagePosition: 'right'`
**Layout**: 2-column, content left + image right (flipped from Section 4)

- **Left**:
  - Headline: "Suites, not kennels. There's a difference." — H2 serif
  - CTA: "Book Now" — Primary yellow button
  - Label: "ALL THE BENEFITS YOU NEED" — Badge text
  - Benefits list (4 items with icons):
    - 📺 Live Webcams
    - 🌿 Expert Staff
    - ❤️ Genuine Care
    - ▶️ Play Included
- **Right**: Photo of dog leash hanging in warm-lit space, rounded 12px

---

### Section 6: Comparison Table

**Component**: `ComparisonTable`
**Layout**: Centered container with max-width ~900px

- **Heading**: "There's kennels. There's daycare. Then there's this." — H2 serif, centered
- **Subheading**: "Here's how we compare to the rest." — Body text, secondary, centered
- **Table**:
  - 3 columns: Feature Name | Traditional Kennels | Basic Daycares | Hound Around Resort
  - Hound Around column header: Yellow background with logo, slightly elevated look
  - Row separator: dashed lines
  - Check marks (✓) in yellow circles for Hound Around, X marks for competitors
  - All Hound Around cells have yellow background highlight
  - Outer container: thin dashed green border with rounded corners

**Table Rows**:
| Feature | Traditional Kennels | Basic Daycares | Hound Around |
|---------|-------------------|----------------|--------------|
| Spacious Suites, Not Cages | ✗ | ✗ | ✓ |
| Live Webcams | ✗ | ✗ | ✓ |
| Indoor + Outdoor Play | ✗ | ✓ | ✓ |
| Climate Controlled | ✗ | ✓ | ✓ |
| Play Included in Price | ✗ | ✗ | ✓ |
| On-Site Grooming | ✗ | ✗ | ✓ |

**Sanity Schema Fields**:

```ts
{
  name: 'comparisonTable',
  type: 'object',
  fields: [
    { name: 'headline', type: 'string', title: 'Headline' },
    { name: 'subheadline', type: 'string', title: 'Subheadline' },
    {
      name: 'competitors',
      type: 'array',
      title: 'Competitor Column Names',
      of: [{ type: 'string' }]
    },
    { name: 'highlightColumnName', type: 'string', title: 'Highlighted Column Name (your brand)' },
    {
      name: 'rows',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'feature', type: 'string', title: 'Feature Name' },
          {
            name: 'values',
            type: 'array',
            title: 'Values (true/false for each column)',
            of: [{ type: 'boolean' }]
          },
        ]
      }]
    },
  ]
}
```

---

### Section 7: Stats Band (Yellow)

**Component**: `StatsBand`
**Layout**: Full-width yellow (`var(--color-yellow)`) background band. Centered logo at top, then 4 stat cards in a row.

- **Logo**: Hound Around Resort wordmark, dark green, centered above cards
- **Cards**: Cream background, rounded 12px, 1px dark green border, centered text
  - Stat number: Cormorant Garamond Light 48px
  - Label: Switzer Medium 14px uppercase

**Content**:
| Stat | Label |
|------|-------|
| 12+ | Years of Care |
| 8,000 | SqFt Play Space |
| 4.4 ★ | Star Rating |
| 365 | Days a Year |

**Spacing**: Yellow band padding 60px top/bottom. Thin cream/yellow top and bottom border lines for separation.

**Sanity Schema Fields**:

```ts
{
  name: 'statsBand',
  type: 'object',
  fields: [
    { name: 'showLogo', type: 'boolean', title: 'Show Logo Above Stats' },
    {
      name: 'stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', type: 'string', title: 'Stat Value' },
          { name: 'label', type: 'string', title: 'Stat Label' },
          { name: 'icon', type: 'string', title: 'Optional icon (e.g. star)' },
        ]
      }]
    },
  ]
}
```

---

### Section 8: Testimonials

**Component**: `TestimonialsCarousel`
**Layout**: Centered heading, then horizontal scrolling row of testimonial cards

- **Heading area**:
  - Small paw print icon centered above heading (decorative, dark green)
  - Headline: "Don't take our word for it" — H2 serif, centered
- **Cards**: Horizontal scroll container (CSS `overflow-x: auto`, snap scrolling)
  - Yellow background cards, rounded 12px
  - Paw print icon at top of each card
  - Quote text: Switzer Regular 16px
  - Attribution: "Name, Role/descriptor" — Switzer Medium 14px, bottom
  - Card width: ~320px, gap: 16px
  - Optional: Left/right arrow buttons overlaid on edges

**Sanity Schema Fields**:

```ts
{
  name: 'testimonialsCarousel',
  type: 'object',
  fields: [
    { name: 'headline', type: 'string', title: 'Section Headline' },
    {
      name: 'testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'quote', type: 'text', title: 'Quote Text' },
          { name: 'name', type: 'string', title: 'Person Name' },
          { name: 'descriptor', type: 'string', title: 'Descriptor (e.g. "Multi-dog family")' },
        ]
      }]
    },
  ]
}
```

---

### Section 9: Image CTA (Full-Bleed)

**Component**: `ImageCta`
**Layout**: Full-width/bleed dark photo background with text overlay. Centered content.

- **Background**: Full-bleed photo of sleeping dog on bed/couch, dark/moody lighting with subtle overlay
- **Headline**: "Where all Pups come home tired." — H1 serif, italic, cream/white text, centered
- **CTA**: "Book Now" — Primary yellow button, centered below headline

**Note**: The image should have a dark gradient overlay (approximately `rgba(0,0,0,0.3)`) to ensure text legibility. Text is cream colored.

**Sanity Schema Fields**:

```ts
{
  name: 'imageCta',
  type: 'object',
  fields: [
    { name: 'headline', type: 'string', title: 'Headline' },
    { name: 'ctaText', type: 'string', title: 'CTA Button Text' },
    { name: 'ctaUrl', type: 'string', title: 'CTA URL' },
    { name: 'backgroundImage', type: 'image', title: 'Background Image', options: { hotspot: true } },
    { name: 'overlayOpacity', type: 'number', title: 'Overlay Opacity (0-1)', initialValue: 0.3 },
  ]
}
```

---

### Section 10: Footer

**Component**: `Footer`
**Layout**: Cream background. Container max-width. 4-column grid + bottom bar.

**Columns**:

1. **Brand** (wider):
   - "Hound Around RESORT" — Wordmark/logo
   - Tagline: "Your dog's home away from home. Family-owned and operated since 2013, providing exceptional care in Cottage Grove, MN."
   - Text: Switzer 14px, secondary color

2. **Services**:
   - Column title: "Services" — Switzer Medium 16px, dark green
   - Links: Daycare, Boarding, Grooming, Self-Wash
   - Link style: Switzer 14px, secondary color, underline on hover

3. **Company**:
   - Column title: "Company"
   - Links: About Us, Pricing, Webcams, New Clients

4. **Contact**:
   - Column title: "Contact"
   - Address: 8607 W Point Douglas Rd S, Cottage Grove, MN 55201
   - Phone: 641-525-4923
   - Email: contact@houndaroundresort.com

**Bottom Bar**:

- Full-width, separated by 1px border top
- Left: "© 2026 Hound Around Resort. Part of the **Embark Pet Services** family." (Embark is a link)
- Right: Privacy Policy | Terms of Service

**Sanity Schema Fields**:

```ts
{
  name: 'footer',
  type: 'document',
  fields: [
    { name: 'tagline', type: 'text', title: 'Brand Tagline' },
    {
      name: 'columns',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },
          {
            name: 'links',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                { name: 'label', type: 'string' },
                { name: 'url', type: 'string' },
              ]
            }]
          },
        ]
      }]
    },
    { name: 'address', type: 'text', title: 'Address' },
    { name: 'phone', type: 'string', title: 'Phone Number' },
    { name: 'email', type: 'string', title: 'Email' },
    { name: 'copyrightText', type: 'string', title: 'Copyright Text' },
    { name: 'parentCompany', type: 'string', title: 'Parent Company Name' },
    { name: 'parentCompanyUrl', type: 'string', title: 'Parent Company URL' },
  ]
}
```

---

## 6. Sanity Page Builder Schema

The homepage uses a **page builder** pattern. The `page` document has a `sections` array that references different section types. This allows drag-and-drop reordering in Sanity Studio.

```ts
// schemas/documents/page.ts
{
  name: 'page',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    {
      name: 'sections',
      type: 'array',
      title: 'Page Sections',
      of: [
        { type: 'heroSection' },
        { type: 'statsIconBar' },
        { type: 'featureBlock' },
        { type: 'comparisonTable' },
        { type: 'statsBand' },
        { type: 'testimonialsCarousel' },
        { type: 'imageCta' },
        // Future section types can be added here
      ],
    },
    {
      name: 'seo',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string' },
        { name: 'metaDescription', type: 'text' },
        { name: 'ogImage', type: 'image' },
      ]
    },
  ]
}
```

### Section Renderer Component

```tsx
// components/SectionRenderer.tsx
// Maps Sanity section _type to React components
const sectionComponents = {
  heroSection: HeroSection,
  statsIconBar: StatsIconBar,
  featureBlock: FeatureBlock,
  comparisonTable: ComparisonTable,
  statsBand: StatsBand,
  testimonialsCarousel: TestimonialsCarousel,
  imageCta: ImageCta,
}

export function SectionRenderer({sections}) {
  return sections.map((section) => {
    const Component = sectionComponents[section._type]
    if (!Component) return null
    return <Component key={section._key} {...section} />
  })
}
```

---

## 7. Global Sanity Documents

### Settings

```ts
{
  name: 'settings',
  type: 'document',
  fields: [
    { name: 'siteName', type: 'string' },
    { name: 'logo', type: 'image' },
    { name: 'phone', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'address', type: 'text' },
    { name: 'announcementBar', type: 'announcementBar' },
    {
      name: 'navigation',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string' },
          { name: 'url', type: 'string' },
        ]
      }]
    },
    { name: 'footer', type: 'reference', to: [{ type: 'footer' }] },
  ]
}
```

---

## 8. Font Loading

### Cormorant Garamond

Load from Google Fonts. Weights: 300 (Light), 400 (Regular), 300 Italic.

```tsx
// app/layout.tsx
import {Cormorant_Garamond} from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})
```

### Switzer

Load from Fontshare CDN or self-host. Switzer is available free from Fontshare.

```html
<!-- In <head> or via next/font -->
<link
  href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap"
  rel="stylesheet"
/>
```

Or self-host the variable font file and use `next/font/local`.

---

## 9. File & Folder Structure

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout with fonts, nav, footer
│   ├── page.tsx                # Homepage (fetches page builder sections)
│   ├── about/page.tsx
│   ├── services/
│   │   ├── daycare/page.tsx
│   │   ├── boarding/page.tsx
│   │   ├── grooming/page.tsx
│   │   └── self-wash/page.tsx
│   ├── webcams/page.tsx
│   ├── pricing/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/
│   │   ├── AnnouncementBar.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── StatsIconBar.tsx
│   │   ├── FeatureBlock.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── StatsBand.tsx
│   │   ├── TestimonialsCarousel.tsx
│   │   └── ImageCta.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── Badge.tsx
│   │   ├── StarRating.tsx
│   │   └── CheckXMark.tsx
│   └── SectionRenderer.tsx
├── lib/
│   ├── sanity/
│   │   ├── client.ts
│   │   ├── queries.ts
│   │   └── types.ts
│   └── utils.ts
├── public/
│   ├── icons/                  # Custom SVG icons
│   └── images/                 # Placeholder images
└── styles/
    └── globals.css             # CSS variables, base styles
```

---

## 10. Design Reference Screenshots

The original Figma designs have been exported as screenshots and should be placed in the project for Claude Code to reference during development.

**Setup**: Create a `design/` folder at the project root and add the screenshots:

```
design/
├── hero___stats1.png        # Hero section + stats icon bar below
├── features.png             # Services feature block + Why Us benefits block
├── comparison.png           # Comparison table section
├── stats2.png               # Yellow stats band with stat cards
├── testimonials.png         # Testimonials horizontal scroll
└── imageCta___footer.png    # Full-bleed image CTA + footer
```

Claude Code can view these images directly to verify layout accuracy, spacing, and visual details during development. Reference them when building each section.

---

## 11. Asset Checklist

Before development, gather these assets:

- [ ] **Hound Around Resort logo** — SVG wordmark (dark green version + cream/white version)
- [ ] **Custom icon SVGs** — Shield, paw prints, webcam, bathtub (for stats icon bar)
- [ ] **Check/X mark SVGs** — For comparison table
- [ ] **Hero photo** — Candid dog photo, warm lighting, portrait orientation
- [ ] **Feature photos** (x2) — Staff with dog, and atmospheric/facility shot (leash detail, suite interior)
- [ ] **Image CTA photo** — Sleeping dog, moody/dark/cozy lighting, landscape
- [ ] **Testimonial paw icon** — Small paw SVG for card header
- [ ] **Star icon** — For ratings (can use Iconify `lucide:star`)
- [ ] **Switzer font files** — If self-hosting (download from fontshare.com)

---

## 12. Build Order (Recommended for Claude Code)

> **Important**: Before each section, have Claude Code view the corresponding screenshot in `design/` to verify layout and styling details.

1. **Project setup**: Initialize from sanity-template-nextjs-clean, configure Tailwind theme, load fonts, set CSS variables
2. **Global layout**: AnnouncementBar + Navigation + Footer
3. **UI primitives**: Button, Container, Badge, StarRating components
4. **Hero section**: Build with static data first, then wire to Sanity
5. **Stats Icon Bar**: Simple grid with icons
6. **Feature Blocks** (x2): Reusable component with image position toggle
7. **Comparison Table**: Build the table layout with dashed borders and yellow highlight
8. **Stats Band**: Yellow background with stat cards
9. **Testimonials Carousel**: Horizontal scroll with snap
10. **Image CTA**: Full-bleed background image with overlay
11. **Sanity schemas**: Define all section types and page builder
12. **Wire it up**: Connect page builder to SectionRenderer
13. **Responsive**: Polish all breakpoints
14. **Inner pages**: Stub out remaining routes with shared layout

---

## 13. Key Design Notes & Assumptions

- **Modular sections**: Every section is a standalone component that can be reordered, removed, or reused across pages via the Sanity page builder
- **The comparison table outer container** has a thin dashed green border (assumption — confirm with Figma)
- **Testimonials** use CSS horizontal scroll with `scroll-snap-type: x mandatory` rather than a JavaScript carousel library. Optional arrow overlays for desktop.
- **Sticky nav**: Navigation becomes sticky with a slight backdrop-blur on scroll
- **No animations in v1**: Focus on layout accuracy first. Subtle fade-in animations can be added as a polish pass.
- **Mobile nav**: Hamburger menu icon → full-screen or slide-out drawer with all links
- **Image CTA headline** uses the serif italic style (Cormorant Garamond Light Italic) — this is the big emotional closer before the footer
- **The "4.4 SqFt Play Space" label** in the stats band appears to be a typo in the design — it should likely read "4.4 ★ Star Rating". The spec uses the corrected version.
