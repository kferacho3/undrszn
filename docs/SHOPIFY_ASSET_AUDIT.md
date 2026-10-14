# Shopify asset reconciliation — October 14, 2026

Inspected the live collection in Chrome and fetched the public Shopify product
feed plus homepage, both product pages, campaign page, and story page.
`shopify-asset-audit.json` records the source URLs and product-image comparison.

- Two published products: all six black and eight cream product photographs are
  represented in the improved product galleries; no product images were missing.
- All 23 existing image references now have local responsive WebP copies (111
  files, approximately 9 MB). The HEIC studio photo is browser compatible. Small
  archive thumbnails are preserved at their original size, never upscaled.
- All four original homepage MP4s are now connected. The previously missing
  1:24 interview is on the Journey page with 1080p and 720p versions and a poster.
- Original source URLs remain in the manifest for provenance. Local image copies
  remove the runtime dependency on Shopify image delivery.
- The photographic hero, product prices, size choices, checkout handoff and
  preview-mode settings are preserved. This is media parity, not live inventory
  or checkout synchronization. Caption transcripts and real chapters remain pending.

Refresh the local images with `node scripts/sync-shopify-images.mjs` after
installing dependencies. The script fetches source images listed in the manifest,
converts to WebP at widths up to 2400 without enlargement, and records actual
responsive variants. Audit new Shopify products/images before refreshing; the
script intentionally does not silently rewrite product data.

The interview source URL is recorded in the JSON audit. Its raw master is kept
only in the ignored `media-src/` directory. Encodes use H.264 yuv420p, fast-start,
CRF 24/26 for HD/SD, video caps 1650/850 kbps, and AAC 96 kbps audio.
