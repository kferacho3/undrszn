# UNDR.RATED.SZN — The Resilience Issue

An editorial, purchase-focused storefront redesign and production blueprint.
Prepared October 14, 2026. **Design prototype, not a deployed or connected store.**

## Open the preview

Open **UNDRSZN_Preview.html** in a modern browser with an internet connection.
Its interface, styles and JavaScript are contained in that one file. Original
brand images load directly from undrszn.com; they are not embedded or bundled.
Use the footer’s **Design review notes** to inspect every review destination.

The multi-file version is `index.html`; keep `styles.css`, `app.js` and `data.js`
beside it. A local server is optional: run `python3 -m http.server 8000` from this
folder, then open `http://localhost:8000`. No installation or build is necessary.
A file previewer inside a messaging app may disable JavaScript; use your browser.

## Read the plan

**UNDRSZN_Redesign_Plan.html** is the formatted, complete production plan.
The editable source is **docs/UNDRSZN_REDESIGN_BLUEPRINT.md** (roughly 7,300 words).
It covers findings, direction, every page, media inventory, component behavior,
Shopify implementation, mobile, accessibility, performance targets, SEO,
analytics, owner decisions, release gates and production acceptance checks.

## What is implemented in the prototype

25 review destinations: home, collection, both product pages, campaign, story,
lookbook, Community, four applications, contact, size guidance, help, five policy
presentations, search, cart, account handoff, 404, and review notes. These include
the 16 source-content routes inspected plus proposed/system review destinations.

Working local interactions include product-image switching and enlargement,
on-body/product-image views, filters, search, required size selection, a local
preview bag, quantity changes, removal, mobile menu, dialogs and form validation.
The bag uses anonymous local browser storage where permitted; it does not send
anything to Shopify. Names, emails and messages are not stored or transmitted.
All prices and size labels are a dated design snapshot, NOT authoritative inventory.

## Important boundaries

- **Not deployed:** This package is not a Shopify theme ZIP. Do not upload it as one.
- **Commerce:** No live variant validation, checkout, payment, shipping quote,
  order placement, customer login or form delivery is connected. The checkout
  control explains the handoff and offers a link to the real collection. The
  preview bag does not transfer there.
- **Policies:** These are presentation previews and concise notes linked to the
  full existing policies, not completed replacements for approved legal text.
- **Assets:** 23 unique published image references are inventoried: 19 photographs/
  product images and four video posters. Twenty were visually reviewed; three
  could not be verified. No full video source files were exported. Posters do
  not pretend to play films. One HEIC source needs a compatible production export;
  two tiny video thumbnails must not be enlarged as hero media.
- **Identity:** The wordmark is a typeset design concept, not an exported original
  logo. Fonts are system fallbacks; no font files are included. Asset rights,
  credits and final typography must be confirmed by the brand.
- **Production:** Implement the approved direction as a custom Shopify
  section-based theme, retaining the existing commerce platform and checkout.

## Asset provenance and optional retrieval

`asset-manifest.json` records the original image URLs, source pages, alt text,
inspection notes and reserved local paths. A `local_file` entry is a proposed
save path, not evidence that the file is already present.

`assets/` does not contain the original photos in this delivered package. The
creation environment could inspect public images through the browser research
tool but could not download them to its file system.

On an internet-enabled machine with Python 3.10+, run:

```sh
python3 fetch_assets.py
```

This downloads only manifest images, preserves original formats, detects image
signatures, and writes a retrieval report. It does not retrieve fonts, invent
video links or bypass access controls. It was syntax-checked, not network-tested
in the creation environment. Sources can change or become unavailable.

To activate local image paths only when every image has a supported browser
format, use:

```sh
python3 fetch_assets.py --activate-local
```

The utility refuses to activate a complete local mode when any source failed
or only a HEIC/HEIF image was retrieved. Obtain approved compatible exports for
remaining exceptions. It rebuilds the preview after updating the manifest.
To rebuild the interface after local code/data edits:

```sh
python3 build_preview.py
```

In local media mode, keep the preview beside `assets/`; it is not an embedded-image
single file. Shopify production should use its image transforms and real media
objects, not this audit downloader as its publishing workflow.

## Actual QA performed

`docs/prototype-qa.json` and `docs/route-checks.json` contain the results. All 25
routes were checked in Chromium at 1440px, 390px and 320px widths. The completed
run reported no horizontal overflow or JavaScript page errors and one H1 per
route. Tested interactions include size validation, local bag addition, quantity
arithmetic, empty/removal states, search, filters, contact validation, gallery
selection, image dialog closure and reduced-motion preference.

**Limitations:** Normal browser navigation and outbound network access were
restricted. Tests used in-memory HTML with remote image requests aborted.
This does not establish final live-image rendering, cross-reload storage,
real-user performance, Shopify transaction correctness, accessibility conformance,
actual video playback, form delivery, iOS Safari or Android behavior. An overflow
check is not a full visual or accessibility audit. The blueprint specifies the
additional production tests required.

## Launch-critical owner decisions

Resolve the cream hoodie’s 400/420 GSM conflict, black XXS/2XS labels, and October
30 release status. Confirm real garment measurements, support email, processing
promise and final-sale/eligible-exchange wording. Remove policy drafting notes.
Approve media rights and source exports. Then implement in an unpublished Shopify
theme and verify a controlled test order and real form delivery before publishing.

No conversion uplift, competitor performance comparison or production-readiness
claim is made by this package.
