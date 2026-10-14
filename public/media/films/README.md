# public/media/films

Compressed film files go here. They are served at `/media/films/<file>` with a one-year
immutable cache header. Use new file names when a film changes.

Generate them with `npm run films:compress -- <master> <film-id>`, then register them in
`src/data/films.ts`. Full instructions: `docs/VIDEO_INTEGRATION.md`.

Keep each file under 95 MB, because GitHub rejects files over 100 MB. Host larger films on
a CDN and reference them by absolute URL.
