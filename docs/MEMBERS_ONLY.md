# Members Only — The private edit

`/pages/members-only` is a public editorial preview of the 13 supplied collection studies:
four lifestyle photographs, five knitwear shots and four small-goods shots. They are not
purchasable product records. Prices, availability and membership benefits are not invented.

## Experience

The entrance is a finite, native vertical-scroll gallery with two counter-moving columns.
Photographs and product cutouts keep their natural aspect ratio and a stable display size;
only vertical position changes. There is no bending, stretching, zooming or perspective.
Transparent products sit directly on the page background, without panels, glows or shadows.
Mobile uses one full-size column. Short phones use a normally scrolling, taller stage so
the photograph is not squeezed into the available viewport height. Wheel and touch retain their native scrolling behavior.

Seven direct selection buttons, an inspect action, a still-view switch, and links straight
to the collection make the gallery optional. Below it: two garment studies, an editorial
portrait, four selectable small-goods studies, the complete filterable edit, and shop links.
The members header omits the repeated announcement and keeps its primary links concise.

The native image dialog supports previous/next, arrow keys, Escape, detail zoom and focus
restoration. Opening and closing preserves page position, including within the sticky scene.
The original source image remains available through “Open full image.”

## Theme and accessibility

The page, header, product stages, filters and viewer inherit the site's saved light/dark
selection. Dark is the default. The theme control is visible on desktop and mobile.
Paper/ink and charcoal/ivory surfaces share warm oxblood accents. Lifestyle photographs
retain their setting. Product cutouts have real alpha rather than a CSS blending trick.

Reduced motion removes the long pinned scroll area and uses the semantic still image with
direct selectors. CSS section parallax is progressive and disabled for reduced motion.
All images remain available in the ordinary collection grid without JavaScript.

## Rendering and media

`MembersRunway.tsx` manages native scrolling, lifecycle and controls. A single inherited CSS
variable moves ordinary responsive image elements vertically. Rendering stops when motion
settles, the scene leaves the viewport, or the document is hidden. Listeners are removed on
teardown. No WebGL or additional runtime dependencies are required.

`src/data/members.ts` supplies all imagery. The nine product photos have new responsive,
lossless WebP cutouts in `public/media/members/cutouts/`. Original photos are retained.
Apple Vision supplies foreground masks; Pillow adds alpha to the original RGB pixels.
The dark garment masks have a one-pixel edge trim to reduce white fringing. The screenshot
chrome around the tonal zip is cropped before masking. No product pixels are generated or
recoloured. Full-size outputs are verified pixel-for-pixel against their masked originals.

To regenerate on macOS 14+ with Swift and Pillow:

```sh
python3 scripts/prepare-member-cutouts.py
```

The first generative extraction experiment changed textile detail and was rejected; it is
not used on the site. The owner explicitly chose the pixel-preserving mask workflow.

## References

- [Colin Demenge / Codrops experimental carousel](https://github.com/colindmg/r3f-experimental-carousel):
  inspiration for counter-moving image sequences, adapted without its image deformation.
- [David Fauré horizontal parallax gallery](https://github.com/davidfaure/horizontal-parallax-gallery-codrops):
  reference for image-plane parallax, translated to native vertical scrolling.
- [Codrops minimal online store principles](https://tympanus.net/codrops/2012/12/26/tips-for-a-clean-and-minimal-online-store-design/):
  applied through concise navigation, readable captions, product prominence and direct shop links.

Only the supplied UNDR imagery is used. Cormorant Garamond is self-hosted under its bundled
SIL Open Font License. Existing store routes, preview mode and checkout boundary remain.

## Verification

Required checks: `npm run lint`, `npm run typecheck`, `npm run build`.
Browser review covers desktop/mobile composition, scroll progression, still view, image
inspection, keyboard navigation, filters, swatches and both theme surfaces. This page is
an editorial preview, not a membership authentication or purchase flow.

Final verification on October 17: desktop 1800px and mobile 390×844 / 320×568,
light/dark switching, reduced-motion emulation, collection filters (13/5/4/4), colour
selection, detail focus, and Escape were checked in Chrome. Product stage backgrounds
resolve to transparent; the hero uses translation-only transforms. Lint, typecheck and
production build pass. Chrome's installed React DevTools reported an instrumentation
error during hot reload; this was an extension error, not an application exception.
