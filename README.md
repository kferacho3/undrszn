# UNDR.RATED.SZN — The Resilience Issue

This is the dark-first storefront redesign for **UNDR.RATED.SZN**: *Uncomfortable Nights Develop Resilience.*
It is built with Next.js (App Router), React and TypeScript.

The site implements the redesign package in `docs/redesign/`. It covers every page in the
blueprint, real URL routes that mirror the live Shopify handles, a dark-first design system with
an optional light ("paper") theme, and a complete film system ready for **The Journey**, a
six-minute film, plus the campaign shorts.

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # production build: all routes prerender as static HTML
npm start
npm run lint && npm run typecheck
```

Requires Node 20.9+.

## What is where

| Path | Purpose |
|---|---|
| `src/app/` | Routes. `/`, `/collections/all`, `/products/[handle]`, `/pages/*`, `/policies/[slug]`, `/search`, `/cart`, `/account`, `/preview-notes`, 404 |
| `src/components/` | UI: header, footer, product detail, bag drawer, dialogs, forms, lookbook |
| `src/components/film/` | `FilmPlayer` (feature player with chapters, captions, HD/SD, full screen) and `AmbientLoop` (silent hero loop) |
| `src/data/films.ts` | **Film registry.** The single place to plug in compressed videos |
| `src/data/asset-manifest.json` | Product snapshot and media library from the redesign package |
| `src/data/site.ts` | Storewide settings, navigation, and the `previewMode` switch |
| `src/styles/` | Design tokens (dark default, light alternate) and component styles |
| `scripts/compress-film.sh` | ffmpeg pipeline: master to web MP4/WebM, poster and a ready-to-paste snippet |
| `docs/VIDEO_INTEGRATION.md` | How to compress, register and host the films |
| `docs/redesign/` | The original redesign package: plan, blueprint, standalone preview, prototype source, QA results |

## Films

Each film already has a designed slot. Until a film is registered, the slot shows an
honest "In the edit · premieres here" state over a still. Paste the compression script's
output into `src/data/films.ts` and the real player appears everywhere that film is placed.

| Slot | Placement |
|---|---|
| `journey` (~6:00) | Home "The Journey" band, `/pages/journey`, Our story |
| `campaign-cut` | Campaign page, Journey page |
| `bts-reel` | Campaign page, Journey page |
| `ambient-loop` | Home hero, right panel |

See **[docs/VIDEO_INTEGRATION.md](docs/VIDEO_INTEGRATION.md)**.

## Design system

- **Dark first.** The palette uses near-black surfaces (`#0b0b0a`), warm paper ink (`#f2efe7`) and a controlled signature red (`#c8341f` fills, `#f0583c` text). The light theme restores the blueprint's paper palette. The toggle sits in the header and menu and is remembered per browser.
- **Type.** Anton for display, Archivo for reading text and JetBrains Mono for labels, all open-licensed and self-hosted through `@fontsource` packages and `next/font/local`, so builds never need the network. The blueprint asks for licensed final brand typography, so swap these if the brand has its own.
- **Motion.** Restrained by design: image settle, hover scale, scroll reveals and drawer transitions. Everything respects `prefers-reduced-motion`. There is no scroll hijacking, loaders or marquees.
- **Photography.** Original brand images load from the Shopify CDN with responsive `srcset`. If an image can't load, a labelled fallback keeps the layout intact.

## What is live and what is not

`previewMode: true` in `src/data/site.ts` keeps the disclosure band and `noindex` on. The bag is
local to the browser, forms validate but send nothing, and checkout hands off to the live store.
Before switching `previewMode` off, connect the Shopify cart and checkout, wire the forms, and
resolve the owner decisions listed in `docs/redesign/UNDRSZN_REDESIGN_BLUEPRINT.md`:

- GSM conflict
- XXS/2XS labels
- Release date status
- Support email
- Final-sale wording
- Measured size charts
- Media rights

The `/preview-notes` page lists the connection status of everything, including each film.
