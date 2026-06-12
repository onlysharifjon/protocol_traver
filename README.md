# Protocol — Luxury Silk Road Travel

A luxury travel-agency website built from the **Travel_pro** Figma design.
Dark, editorial aesthetic with Cormorant Garamond + Montserrat typography and
a gold (`#c9a84c`) / cream (`#f0ead6`) palette on near-black backgrounds.

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (custom theme in `tailwind.config.ts`)
- **next/font** — Google Fonts (Cormorant Garamond, Montserrat)
- **next/image** — optimised images

## Getting started

```bash
npm install      # already done
npm run dev      # development server → http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Pages

| Route            | Description                                         |
| ---------------- | --------------------------------------------------- |
| `/`              | Home — hero, intro, featured tours, stats, CTA      |
| `/tours`         | Tours & Expeditions — 6 tours with filter bar       |
| `/destinations`  | Destinations — staggered masonry of 6 cities        |
| `/about`         | Our Story — founder, 16-year timeline, team         |
| `/documents`     | Licenses & Certifications — downloadable documents   |

## Structure

```
app/                 # routes (one folder per page)
  layout.tsx         # fonts, header, footer, WhatsApp button
  globals.css        # base styles + Tailwind layers
components/           # Header, Footer, WhatsAppButton, Reveal (scroll animation)
lib/data.ts          # all page content (text, tours, team, documents…)
public/images/       # photography exported from the Figma design
```

All copy, colours, type scale and imagery were extracted directly from the
Figma file. Content lives in `lib/data.ts` — edit there to change text, prices,
tours, team members, or documents.

> The `figma_data/` and `figma_refs/` folders contain design-extraction
> artifacts (raw Figma JSON, reference renders, screenshots). They are not part
> of the app and can be deleted.
