# Steel Eagle Supply — Execution Plan

> **Project**: Premium B2B industrial website for Steel Eagle Supply  
> **Stack**: Next.js 15+ · React · TypeScript · Tailwind CSS v3 · App Router  
> **Created**: 2026-05-25  
> **Status**: Plan and metadata updated — ready for scaffolding (Phase 1)  

---

## 1. Project Overview

Steel Eagle Supply is a B2B industrial supplier of pipe, fittings, flanges, valves, and related materials serving oil & gas, petrochemical, power generation, water infrastructure, and industrial fabrication markets.

The website will be:
- **SEO-first** — unique metadata per page, structured data, semantic HTML
- **JSON-driven** — all content rendered from 4 source JSON files
- **Bilingual** — English / Spanish with `_en` / `_es` field support
- **Premium industrial design** — dark navy + steel blue + orange accents on white
- **Statically rendered** — Server Components, no `use client` unless required
- **Accessible** — WCAG 2.1 AA, keyboard navigable, proper ARIA labels

### Target Pages (9 routes)

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/about` | About Us |
| `/products` | Products |
| `/services` | Services |
| `/industries` | Industries Served |
| `/quality` | Quality & Compliance |
| `/projects` | Projects |
| `/resources` | Resources / FAQ |
| `/contact` | Contact / Request a Quote |

---

## 2. Content Architecture — JSON Mapping

### 2.1 `site-content.json` → Pages & Components

```
brand
├── name → Header logo text, meta tags, schema
├── logo → Header logo image path
├── defaultLocale → "en" (language default)
└── locales → ["en", "es"] (toggle options)

navigation[9] → Header nav, Footer nav, Mobile menu
├── label_en / label_es → Link text
└── href → Route path

home
├── hero
│   ├── h1_en / h1_es → Hero H1
│   ├── subheadline_en / subheadline_es → Hero subtitle
│   ├── cta_primary_en / cta_primary_es → "Request a Quote" button
│   └── cta_secondary_en / cta_secondary_es → "View Products" button
├── trustBar[4]
│   └── en / es → Trust badge text items
└── aboutSnippet
    └── en / es → Homepage about block + /about page intro

products.categories[6] → /products page cards + homepage preview
├── name_en / name_es → Card title
└── copy_en / copy_es → Card description

services.items[6] → /services page listing + homepage preview
└── en / es → Service name

industries.items[5] → /industries page cards + homepage preview
└── name_en / name_es → Industry name

quality.points[5] → /quality page listing + homepage block
└── en / es → Quality point text

projects → /projects page content (Resolved - Added to JSON)
├── title_en / title_es → Section title
├── description_en / description_es → Intro text
└── items[3] → Project case studies
    ├── name_en / name_es → Project name
    ├── location_en / location_es → Geographical location
    ├── industry_en / industry_es → Sector served
    ├── year → Completion year
    └── scope_en / scope_es → Scope of materials supplied

resources → /resources page content (Resolved - Added to JSON)
├── title_en / title_es → Section title
├── description_en / description_es → Intro text
├── faqs[3] → Frequently Asked Questions
│   ├── question_en / question_es → Accordion question
│   └── answer_en / answer_es → Accordion answer (wires to FAQ schema)
└── guides[2] → Technical documents and specification charts
    ├── title_en / title_es → Document title
    ├── type → Resource type (e.g., PDF Guide, Technical Chart)
    └── fileSize → Download size

contact
├── cta_en / cta_es → Form submit button text
└── formFields[9] → Form field names
```

### 2.2 `seo-content.json` → Page Metadata

| Page | title_en | title_es | description_en | description_es | Status |
|------|----------|----------|----------------|----------------|--------|
| home | ✅ | ✅ | ✅ | ✅ | Complete |
| about | ✅ | ✅ | ✅ | ✅ | Complete |
| products | ✅ | ✅ | ✅ | ✅ | Complete |
| services | ✅ | ✅ | ✅ | ✅ | Complete |
| industries | ✅ | ✅ | ✅ | ✅ | Complete |
| quality | ✅ | ✅ | ✅ | ✅ | Complete |
| projects | ✅ | ✅ | ✅ | ✅ | Complete |
| resources | ✅ | ✅ | ✅ | ✅ | Complete |
| contact | ✅ | ✅ | ✅ | ✅ | Complete |

> [!NOTE]
> All 9 target pages are now fully populated with optimized bilingual title and description metadata inside `seo-content.json`, ensuring high-quality, unique SEO tags are ready to be integrated.

### 2.3 `site-config.json` → Design System & Config

```
stack → informational (confirmed: Next.js, TS, Tailwind CSS v3, App Router)

theme.colors:
  primary:    #0F172A  → dark navy (header, footer, headings)
  secondary:  #1E3A8A  → steel blue (links, accent sections)
  accent:     #F97316  → orange (CTA buttons, highlights)
  background: #FFFFFF  → white (page background)
  muted:      #F3F4F6  → light gray (alternate section backgrounds)

theme.fontFamily: "Inter"

seo:
  openGraph:          true
  twitterCards:        true
  organizationSchema: true
  faqSchema:          true
```

### 2.4 `reference-analysis.json` → Design Patterns

| Source | Patterns to Apply |
|--------|------------------|
| Federal Steel Supply | Technical B2B layout, product-heavy sections, strong trust signals, visible contact, value-added services |
| ITF / Grupo Cuñado | Project-focused corporate presentation, global logistics emphasis, quality credibility, concise service blocks |

---

## 3. Technical Architecture

### 3.1 Rendering Strategy

| Route | Rendering | Rationale |
|-------|-----------|-----------|
| All 9 pages | **Static (SSG)** | Content from JSON files, pre-rendered at build time |
| Layout | **Server Component** | No interactivity in layout shell |
| Header | **Client Component** | Mobile menu toggle, language switch |
| Contact Form | **Client Component** | Form state, validation |
| `/api/contact` | **App Router API Route** | Secure JSON endpoint for processing contact requests |
| All other components | **Server Component** | Pure content rendering |

### 3.2 Data Flow

```
json/*.json
    ↓
src/lib/content.ts        (reads JSON, exports typed getters)
    ↓
src/lib/types.ts          (TypeScript interfaces)
    ↓
page.tsx / layout.tsx      (Server Components import getters)
    ↓
Component props            (typed, locale-aware)
```

### 3.3 SEO Architecture

```
Root layout.tsx
├── Global metadata (site name, default OG image, robots)
├── Organization schema (JSON-LD script)
└── Viewport + charset

Page-level page.tsx
├── generateMetadata() → reads seo-content.json
│   ├── title
│   ├── description
│   ├── canonical URL
│   ├── openGraph
│   └── twitter
└── Page-specific schemas (JSON-LD)
    ├── BreadcrumbList (all internal pages)
    ├── Product (on /products)
    └── FAQPage (on /resources)
```

### 3.4 Internationalization (i18n) Strategy

Since the JSON uses `_en` / `_es` field suffixes (not nested locale objects), the approach will be:

1. A `getLocale()` utility that reads the current locale preference
2. A `t(field, locale)` helper that resolves `field_en` or `field_es`
3. Language toggle stored in a cookie or URL param (client-side)
4. Content re-renders without route change — single URL, client-side locale swap

> [!NOTE]
> Full URL-based i18n (e.g., `/es/products`) could be added later but is out of scope for the initial build. The JSON structure doesn't define route-level locale paths.

---

## 4. File & Folder Structure

```
steel-eagle-supply/
├── json/                              # ← existing content (DO NOT MODIFY structure)
│   ├── site-content.json
│   ├── seo-content.json
│   ├── site-config.json
│   └── reference-analysis.json
│
├── public/
│   ├── images/
│   │   ├── logo.svg                   # brand logo
│   │   ├── hero-bg.webp               # hero background image (Deferred - temporary industrial placeholder in CSS)
│   │   ├── og-image.jpg               # default Open Graph image
│   │   └── products/                  # product category images
│   │       ├── carbon-steel-pipe.webp
│   │       ├── alloy-pipe.webp
│   │       ├── stainless-steel-pipe.webp
│   │       ├── fittings.webp
│   │       ├── flanges.webp
│   │       └── valves.webp
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # root layout: fonts, metadata, header/footer
│   │   ├── page.tsx                   # homepage
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── industries/
│   │   │   └── page.tsx
│   │   ├── quality/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   └── page.tsx
│   │   ├── resources/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts           # Next.js App Router API route for contact form submission
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx             # sticky header with nav + CTA
│   │   │   ├── Footer.tsx             # compact footer
│   │   │   ├── MobileMenu.tsx         # slide-out mobile nav
│   │   │   └── LanguageToggle.tsx     # EN/ES switcher
│   │   │
│   │   ├── shared/
│   │   │   ├── SectionWrapper.tsx     # consistent section padding + bg
│   │   │   ├── SectionHeading.tsx     # H2 + optional subtitle
│   │   │   ├── CTAButton.tsx          # primary/secondary/outline variants
│   │   │   ├── Card.tsx               # reusable card (image + title + text)
│   │   │   ├── Badge.tsx              # trust/certification badges
│   │   │   ├── Breadcrumbs.tsx        # navigation breadcrumbs
│   │   │   ├── PageHero.tsx           # reusable inner-page hero banner
│   │   │   └── JsonLd.tsx             # generic JSON-LD script injector
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TrustBar.tsx
│   │   │   ├── AboutSnippet.tsx
│   │   │   ├── ProductsPreview.tsx
│   │   │   ├── ServicesPreview.tsx
│   │   │   ├── IndustriesPreview.tsx
│   │   │   ├── QualityBlock.tsx
│   │   │   └── ContactCTA.tsx
│   │   │
│   │   └── contact/
│   │       └── ContactForm.tsx        # client component — form + validation
│   │
│   ├── lib/
│   │   ├── content.ts                 # JSON loaders + locale helpers
│   │   ├── types.ts                   # TypeScript interfaces for JSON shapes
│   │   ├── seo.ts                     # metadata builder (reads seo-content.json)
│   │   ├── schemas.ts                 # JSON-LD schema generators
│   │   └── constants.ts               # static config values, URLs
│   │
│   └── styles/
│       └── globals.css                # Tailwind directives + custom CSS
│
├── tailwind.config.ts                 # Tailwind CSS v3 configuration, theme tokens from site-config.json
├── tsconfig.json
├── next.config.ts
├── package.json
├── project-memory.md                  # ← this tracking file
└── execution-plan.md                  # ← this plan
```

---

## 5. Component List

### 5.1 Layout Components (3)

| Component | Type | Purpose |
|-----------|------|---------|
| `Header` | Client | Sticky header: logo, desktop nav from JSON, language toggle, "Request a Quote" CTA, mobile hamburger |
| `Footer` | Server | Company info, nav links, contact email/phone, copyright |
| `MobileMenu` | Client | Slide-out drawer for mobile nav |

### 5.2 Shared Components (8)

| Component | Type | Purpose |
|-----------|------|---------|
| `SectionWrapper` | Server | Consistent max-width, padding, optional bg color |
| `SectionHeading` | Server | H2 heading + optional subtitle + optional "View All" link |
| `CTAButton` | Server | Button with variants: primary (orange), secondary (navy), outline |
| `Card` | Server | Image + title + description card for products/services/industries |
| `Badge` | Server | Small trust/certification badge with icon + text |
| `Breadcrumbs` | Server | Page breadcrumbs for internal pages |
| `PageHero` | Server | Inner-page hero banner with title + subtitle on dark bg |
| `JsonLd` | Server | Renders `<script type="application/ld+json">` |

### 5.3 Homepage Components (8)

| Component | Type | Source Data |
|-----------|------|-------------|
| `HeroSection` | Server | `home.hero` |
| `TrustBar` | Server | `home.trustBar` |
| `AboutSnippet` | Server | `home.aboutSnippet` |
| `ProductsPreview` | Server | `products.categories` (first 3–4) |
| `ServicesPreview` | Server | `services.items` |
| `IndustriesPreview` | Server | `industries.items` |
| `QualityBlock` | Server | `quality.points` |
| `ContactCTA` | Server | `contact.cta_*` |

### 5.4 Page-Specific Components (2)

| Component | Type | Purpose |
|-----------|------|---------|
| `ContactForm` | Client | Multi-field quote request form with validation, submitting to `/api/contact` |
| `LanguageToggle` | Client | EN/ES language switcher button |

**Total: 21 components**

---

## 6. Page-by-Page Build Order

### Build Priority (based on SEO value + user journey)

| Order | Page | Priority | Reason |
|-------|------|----------|--------|
| 1 | `/` (Homepage) | 🔴 Critical | Main landing page, highest traffic |
| 2 | `/products` | 🔴 Critical | Primary product discovery, SEO keyword target |
| 3 | `/contact` | 🔴 Critical | Conversion endpoint for all CTAs |
| 4 | `/about` | 🟡 High | Trust builder, common B2B navigation path |
| 5 | `/services` | 🟡 High | Value-added services differentiation |
| 6 | `/industries` | 🟡 High | Industry-specific landing content |
| 7 | `/quality` | 🟢 Medium | Compliance credibility |
| 8 | `/projects` | 🟢 Medium | Social proof, now powered by custom JSON content |
| 9 | `/resources` | 🟢 Medium | FAQ + helpful content, long-tail SEO, now powered by custom JSON content |

### Page Build Details

#### Page 1: Homepage (`/`)
- **Sections**: Hero → Trust Bar → About Snippet → Products Preview → Services Preview → Industries Preview → Quality Block → Contact CTA
- **SEO**: Title + description from `seo-content.json`, Organization schema
- **Components needed**: All 8 homepage components
- **Estimated effort**: Largest page — ~40% of total build
- **Hero Image Note**: Background image deferred; temporary industrial css-based placeholder/overlay used until Phase 3.

#### Page 2: Products (`/products`)
- **Content**: 6 product category cards from `products.categories`
- **SEO**: Product schema (per category), breadcrumbs, meta from `seo-content.json`
- **Layout**: Grid of cards (2–3 columns) with images, titles, descriptions
- **Components needed**: `PageHero`, `Card`, `Breadcrumbs`, `CTAButton`

#### Page 3: Contact (`/contact`)
- **Content**: 9-field form from `contact.formFields`
- **SEO**: Breadcrumbs, meta from `seo-content.json`
- **Layout**: Two-column — form on left (submitting to `/api/contact` API route), contact details on right
- **Components needed**: `PageHero`, `ContactForm`, `Breadcrumbs`

#### Page 4: About (`/about`)
- **Content**: Expanded from `home.aboutSnippet`
- **SEO**: Title + description from `seo-content.json`, breadcrumbs
- **Layout**: Full-width text + company values grid
- **Components needed**: `PageHero`, `Breadcrumbs`

#### Page 5: Services (`/services`)
- **Content**: 6 services from `services.items`
- **SEO**: Title + description from `seo-content.json`, breadcrumbs
- **Layout**: Dynamic B2B service grid with descriptive copy and icons
- **Components needed**: `PageHero`, `Card`, `Breadcrumbs`

#### Page 6: Industries (`/industries`)
- **Content**: 5 industries from `industries.items`
- **SEO**: Title + description from `seo-content.json`, breadcrumbs
- **Layout**: Grid of industries with dedicated B2B applications
- **Components needed**: `PageHero`, `Card`, `Breadcrumbs`

#### Page 7: Quality (`/quality`)
- **Content**: 5 quality points from `quality.points`
- **SEO**: Title + description from `seo-content.json`, breadcrumbs
- **Layout**: Checklist-style or compliance badge-style layout detailing QA process and material testing reports (MTRs)
- **Components needed**: `PageHero`, `Breadcrumbs`, `Badge`

#### Page 8: Projects (`/projects`)
- **Content**: 3 projects loaded from `projects.items` in `site-content.json`
- **SEO**: Title + description from `seo-content.json`, BreadcrumbList schema
- **Layout**: B2B case studies displaying project name, location, sector, year, and detailed scope of materials supplied.
- **Components needed**: `PageHero`, `Breadcrumbs`, `Card`

#### Page 9: Resources (`/resources`)
- **Content**: 3 FAQs and 2 PDF/chart guides loaded from `resources` in `site-content.json`
- **SEO**: Title + description from `seo-content.json`, FAQPage structured data
- **Layout**: Accordion for technical FAQs, coupled with card grids for downloading spec sheets and pressure tables.
- **Components needed**: `PageHero`, `Breadcrumbs`, `Card`, `JsonLd`

---

## 7. SEO Implementation Order

### 7.1 Foundation (Phase 1)

| Item | Location | Details |
|------|----------|---------|
| Viewport + charset | `layout.tsx` | Set via Next.js metadata |
| Default robots | `layout.tsx` | `index, follow` |
| Sitemap | `sitemap.ts` | Auto-generate from route list |
| Robots.txt | `robots.ts` | Allow all, link to sitemap |

### 7.2 Page-Level Metadata (Phase 3–4)

| Item | Implementation |
|------|----------------|
| Unique `<title>` per page | `generateMetadata()` reads `seo-content.json` |
| Unique `<meta description>` | Same as above |
| Canonical URL | Computed from route path |
| Open Graph tags | `openGraph` object in metadata |
| Twitter Cards | `twitter` object in metadata |
| One H1 per page | Enforced in component structure |
| H2/H3 hierarchy | Enforced in section components |

### 7.3 Structured Data (Phase 5)

| Schema | Page | Data Source |
|--------|------|-------------|
| `Organization` | Root layout | `brand` from `site-content.json` |
| `BreadcrumbList` | All internal pages | Generated from route path |
| `Product` | `/products` | `products.categories` |
| `FAQPage` | `/resources` | `resources.faqs` from `site-content.json` |
| `WebSite` | Root layout | Site name + search action |

### 7.4 Content SEO (Phase 5–6)

- Internal links from homepage preview sections to detail pages
- Descriptive `alt` text on all images
- Clean, semantic HTML markup
- Fast loading: static rendering, optimized images, minimal JS
- Proper heading nesting on every page

---

## 8. Responsive & Accessibility Checklist

### 8.1 Responsive Breakpoints

| Breakpoint | Target | Key Behaviors |
|------------|--------|---------------|
| `< 480px` | Small mobile | Single column, stacked cards, hamburger menu, full-width CTAs |
| `480–768px` | Large mobile / small tablet | 2-column card grids, condensed hero |
| `768–1024px` | Tablet | 2–3 column grids, visible nav or hamburger |
| `1024–1280px` | Small desktop | Full nav visible, 3-column grids |
| `> 1280px` | Desktop | Max-width container (1280px), full layout |

### 8.2 Accessibility Checklist

- [ ] All images have descriptive `alt` attributes
- [ ] Form inputs have associated `<label>` elements
- [ ] Skip-to-content link for keyboard users
- [ ] Focus indicators visible on all interactive elements
- [ ] Color contrast ratios ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- [ ] ARIA landmarks (`<nav>`, `<main>`, `<footer>`, `<header>`)
- [ ] ARIA labels on icon-only buttons (hamburger, language toggle)
- [ ] Keyboard-navigable menu and mobile drawer
- [ ] Form validation messages accessible to screen readers
- [ ] No information conveyed by color alone
- [ ] Reduced motion: respect `prefers-reduced-motion`
- [ ] Semantic HTML: `<article>`, `<section>`, `<aside>` used correctly
- [ ] Page language attribute: `<html lang="en">`

---

## 9. Multi-Session / Phased Execution Plan

The build is split into **6 phases**, each designed to be completable in a single session. Phases are sequential — each depends on the prior one.

### Phase 1 — Project Scaffolding
> **Estimated: 1 session** · No visual output · Foundation only

```
Tasks:
1. Initialize Next.js 15+ with TypeScript, Tailwind CSS v3, App Router
2. Configure tailwind.config.ts with theme tokens from site-config.json
3. Set up globals.css (Tailwind directives, Inter font, CSS custom properties)
4. Create src/lib/types.ts (TypeScript interfaces for all 4 JSON files)
5. Create src/lib/content.ts (JSON import, typed getters, locale helper)
6. Create src/lib/seo.ts (generatePageMetadata helper)
7. Create src/lib/schemas.ts (JSON-LD generators)
8. Create src/lib/constants.ts (base URL, site name, defaults)
9. Configure next.config.ts (images, static export options)
10. Verify dev server starts cleanly
```

**Checkpoint**: `npm run dev` boots with empty layout. All lib/ files compile.

---

### Phase 2 — Global Layout & Shared Components
> **Estimated: 1 session** · Header, Footer, core UI components

```
Tasks:
1. Build Header (logo, desktop nav from JSON, language toggle, CTA button)
2. Build Footer (nav links, contact info, copyright year)
3. Build MobileMenu (hamburger trigger, slide-out drawer, backdrop)
4. Build LanguageToggle (EN/ES button, cookie/state persistence)
5. Build SectionWrapper, SectionHeading, CTAButton, Card
6. Build Badge, Breadcrumbs, PageHero, JsonLd components
7. Wire root layout.tsx (global metadata, font, Header + Footer)
8. Set up Organization schema in root layout
9. Create globals.css animations (fade-in, slide-up, hover effects)
```

**Checkpoint**: Every route shows Header + Footer. Nav links work. Mobile menu opens/closes.

---

### Phase 3 — Homepage
> **Estimated: 1 session** · Full homepage with all 8 sections

```
Tasks:
1. Build HeroSection (full-width, H1, subtitle, 2 CTAs)
   - Note: Hero background image is deferred. Use temporary industrial CSS-based overlay until Phase 3.
2. Build TrustBar (4 trust points in a horizontal bar)
3. Build AboutSnippet (text + CTA to /about)
4. Build ProductsPreview (3–4 product cards + "View All" link)
5. Build ServicesPreview (6 services in grid + CTA)
6. Build IndustriesPreview (5 industry items + CTA)
7. Build QualityBlock (quality points with checkmarks)
8. Build ContactCTA (full-width CTA banner linking to /contact)
9. Wire all sections into page.tsx
10. Wire homepage SEO metadata from seo-content.json
11. Generate hero background image and product card images (Phase 3 task)
```

**Checkpoint**: Homepage fully renders with all 8 sections. SEO metadata correct. Images load.

---

### Phase 4 — Internal Pages
> **Estimated: 1–2 sessions** · 8 inner pages

```
Session 4a (high priority pages):
1. Build /products page (6 category cards, PageHero, breadcrumbs)
2. Build /contact page (ContactForm client component submitting to Next.js API Route, contact details side-by-side)
3. Build /about page (expanded content, PageHero)
4. Build /services page (6 service cards, PageHero)

Session 4b (medium priority pages):
5. Build /industries page (5 industry cards, PageHero)
6. Build /quality page (quality checklist, PageHero)
7. Build /projects page (renders project list from site-content.json, PageHero)
8. Build /resources page (renders technical FAQs + PDF specs from site-content.json, PageHero)
```

**Checkpoint**: All 9 routes render with content. Internal links work.

---

### Phase 5 — SEO, Schema & i18n
> **Estimated: 1 session** · Metadata, structured data, missing SEO content

```
Tasks:
1. Review SEO entries in seo-content.json (already fully integrated and complete)
2. Wire generateMetadata() on all 8 inner pages
3. Add canonical URLs to all pages
4. Add Open Graph metadata (title, description, image, URL)
5. Add Twitter Card metadata
6. Add BreadcrumbList schema to all inner pages
7. Add Product schema to /products
8. Add FAQPage schema to /resources (using resources.faqs)
9. Add sitemap.ts and robots.ts
10. Verify internal linking across all pages
11. Review heading hierarchy on every page
```

**Checkpoint**: Every page has unique title, description, canonical, OG, and Twitter tags. Schema validates in Google's Rich Results Test.

---

### Phase 6 — Responsive, Accessibility & Polish
> **Estimated: 1 session** · QA, fixes, optimization

```
Tasks:
1. Test all pages at 5 breakpoints (320, 480, 768, 1024, 1280+)
2. Fix any layout issues on mobile
3. Run accessibility checklist (Section 8.2)
4. Add descriptive alt text to all images
5. Ensure focus indicators on all interactive elements
6. Add skip-to-content link
7. Verify color contrast ratios
8. Add hover/focus micro-animations
9. Optimize image sizes and formats
10. Final visual review on desktop and mobile
11. Run Lighthouse audit: Performance, Accessibility, SEO, Best Practices
```

**Checkpoint**: Lighthouse scores ≥ 90 in all categories. Site is production-ready.

---

## 10. Open Questions & Decisions Needed

All key planning decisions have been finalized by the user. Below is the registry of selected paths:

| # | Topic | Option Selected | Implementation Impact |
|---|-------|-----------------|-----------------------|
| 1 | **Missing SEO JSON entries** | **(A) Extend `seo-content.json` immediately** | Complete. Fully integrated unique titles/descriptions for all 9 routes in `seo-content.json`. |
| 2 | **Projects page content** | **(A) Add project data to JSON** | Complete. Embedded structured project items in `site-content.json`. |
| 3 | **Resources/FAQ content** | **(A) Add FAQ and Guides data to JSON** | Complete. Embedded structured FAQ lists and technical download metadata in `site-content.json`. |
| 4 | **Language toggle behavior** | **(A) Cookie & State-based Client Swap** | Single URL client-side dynamic locale switching, stored locally for subsequent visits. |
| 5 | **Contact form backend** | **(B) Next.js App Router API Route** | Form will submit to secure POST endpoint `/api/contact` inside the Next.js app structure. |
| 6 | **Hero image** | **(A) Defer to Phase 3** | Underway. Use premium CSS background gradient & overlay for initial layout, generate/insert AI asset in Phase 3. |
| 7 | **Tailwind version** | **(A) Tailwind CSS v3** | Stable styling structure, custom theme colors mapped to Tailwind tokens in `tailwind.config.ts`. |

---

## Summary

| Metric | Value |
|--------|-------|
| Total pages | 9 |
| Total components | 21 |
| Build phases | 6 |
| Estimated sessions | 6–7 |
| JSON files consumed | 4 |
| SEO schemas planned | 4 types |
| Responsive breakpoints | 5 |
| Accessibility items | 13 checks |
