# Agent notes (Codex, Claude, etc.)

Next.js 16 App Router + React 19 + TypeScript. Plain CSS in `src/styles/` (no Tailwind).
Before finishing any change, run `npm run lint`, `npm run typecheck` and `npm run build`.

## Adding the films (the main pending task)

Follow `docs/VIDEO_INTEGRATION.md` exactly:

1. `npm run films:compress -- <master> <film-id>` (ids: `journey`, `campaign-cut`, `bts-reel`, `ambient-loop`; add `--loop` for `ambient-loop`).
2. Paste the printed `posterSrc` / `sources` / `durationLabel` into that film's entry in `src/data/films.ts`. Change no other code; every placement updates automatically.
3. Files over 95 MB must go to a CDN or Git LFS. GitHub rejects files over 100 MB. Never commit raw masters.
4. Replace the Journey's placeholder chapter timestamps with the real ones. Add a `.vtt` caption file if the film has speech.

## Conventions

- Dark theme is the default (`:root`). Light overrides live under `:root[data-theme="light"]` in `src/styles/tokens.css`. Use tokens, never hard-coded colors, except on always-dark media surfaces (hero, film frame).
- Product and media data come from `src/data/asset-manifest.json`. Do not invent prices, stock, sizes, measurements, GSM or release dates. See the blueprint's owner decisions.
- Routes mirror the live Shopify handles. Keep them.
- Motion must respect `prefers-reduced-motion`. No autoplay with sound, no fake play buttons, and only one film playing at a time.
- `docs/redesign/` is the archived source package. Treat it as reference, not as app code.
