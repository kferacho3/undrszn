# Members Only — A private viewing

## Purpose and visual direction

The new route is `/pages/members-only`. It is a public editorial preview of the Members Only
collection concepts supplied in `Luxury Idea.zip`. The existing community and application pages
retain their separate purposes.

The design uses the uploaded reading-room portraits as its visual starting point: espresso,
warm ivory, quiet daylight and oxblood details. Large photographic panels alternate with paper
sections, restrained captions, and Cormorant Garamond headlines. Existing Archivo typography
and site navigation connect the room to the wider storefront. The self-hosted serif font is
licensed under the SIL Open Font License; its package includes the license.

## Page sequence

1. **A private viewing:** large ivory reading-room portrait and a direct route to the full preview.
2. **The perspective:** dark reading-room portrait, a second portrait, and a complete standing silhouette.
3. **The texture:** ivory and midnight knitwear studies, shown as full garments.
4. **The details:** four selectable small-goods colour/form studies.
5. **The full preview:** all 13 supplied images, filterable as knitwear, small goods, or editorial frames.
6. **Stay close:** continuation to the main brand store for updates, plus the current collection.

## What works

- All 13 source images are represented; they are four editorial images, five knitwear images,
  and four small-goods images, not thirteen individual products.
- Every preview-gallery image opens in an accessible native dialog.
- The viewer traps focus, closes with Escape, restores focus to its opener, and supports
  previous/next buttons and arrow keys without moving beyond the selected category.
- Filters expose their pressed state and announce the result count.
- Four small-goods controls change the displayed image, colour label and caption together.
- The main navigation, menu, footer, sitemap and Site Notes include the new route.
- Motion is restrained and respects reduced-motion preferences. There is no autoplay, sound,
  scroll hijacking or decorative authentication gate.

## Media

The typed inventory is `src/data/members.ts`; responsive derivatives are in `public/media/members/`.
The media README maps every original filename to its semantic asset ID. All original images
remain unchanged. WebP derivatives were re-encoded at quality 86 in three responsive widths,
without enlargement. The hero's largest image is 1118 × 1407 and approximately 110 KiB.

The screenshot-style tonal zip source retains its black bars in the image bytes. The gallery
uses a CSS viewport to show the garment cleanly; the full-source viewer keeps the entire image
available. Portraits keep their original orientation and lettering.

## Current integration boundary

This is a **public preview**, not a membership authorization system. No email address is collected
or stored on this page. The final `Join the SZN` link opens `https://undrszn.com/`, where the
brand's existing updates signup is presented. It does not automatically enroll the visitor.

No product prices, stock levels, manufacturing details, release dates, membership terms or
benefits have been invented. The site-wide preview mode and noindex behavior remain in effect.
The concept images are not added to the purchasable catalog or cart.

Before genuine restricted access is introduced, connect a server-verified identity and
membership entitlement source, protect the relevant data/media where required, and define
actual access terms. A client-side password or localStorage flag would not provide this.

## Logo selection

The new official identity is being reviewed separately. This implementation retains the current
storefront logo so that no unselected proposal is silently promoted to the final brand mark.
The downloadable logo collection includes three distinct symbol/wordmark directions.

## Research and design inferences

- [Aman x Kim Jones](https://shop.aman.com/aman-x-kim-jones-collection): its place-based narrative
  leads directly into collection exploration. The inferred application here is one coherent
  reading-room setting and a clear gallery entry.
- [The Ferguson Room](https://www.dorvellferguson.com/modeling): private-set language and a
  carefully paced photographic archive informed the room-like presentation. UndrSzn's layout
  and typography remain its own.
- The supplied concept photography, rather than another brand's product claims, determines
  this page's colour, composition and descriptive captions.

These are design references, not claims about measurable conversion uplift.

## Verification

Follow `AGENTS.md`: `npm run lint`, `npm run typecheck`, and `npm run build`.
Also inspect the gallery filters, lightbox controls, colour studies, intermediate header widths,
mobile layout, reduced motion and both storefront themes before release.
