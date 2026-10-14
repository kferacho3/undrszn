# UNDR.RATED.SZN
## The Resilience Issue — complete storefront redesign blueprint

**Prepared October 14, 2026.**

**North star:** A culturally specific, photo-led clothing store with the discipline of an excellent retailer. The campaign creates desire; the product page answers questions; checkout gets out of the way.

**Creative direction:** Carry forward 2kFerg’s editorial sequencing and image-first presentation, and Muzeum’s control of atmosphere, scale and negative space. Do not import portfolio-style entrance gates, spatial navigation, immersive controls or decorative complexity into the buying journey.

**Delivery status:** This package includes an interactive design prototype, not an installed Shopify theme. The public storefront, its accessible page content, and original image references were inspected. There was no Shopify administrator access, no private analytics access, no live transaction testing and no production deployment. The prototype’s photography remains linked to the original site; it is not a complete offline media export. Video source files remain unresolved.

---

## 1. What “surpass Nike” should mean for this brand

Do not compete by copying another company’s black-and-white navigation, adding a large corporate menu or creating the illusion of a giant catalog. Build something Nike could not make for this particular brand: the real people, actual artwork, specific clothing, genuine history and distinctive personality of UNDR.

Judge the redesign against six outcomes:

1. Within the opening screen, visitors understand that this is a clothing brand and can reach the collection immediately.
2. A buyer can distinguish the two currently listed products without decoding a campaign.
3. Product photography makes the graphic, color, silhouette and back detailing legible.
4. Fit, fulfillment and exchange information are easier to understand than the present copy.
5. Every page feels intentionally designed, including errors, support, empty states and applications.
6. Shopping remains usable on an ordinary phone, a slow connection, a keyboard and reduced-motion settings.

These are design and engineering acceptance criteria, not a claim that the prototype already beats Nike’s revenue, conversion rate, accessibility or operational scale. Revenue impact must be measured after implementation.

### Audience hypothesis

The working audience is people drawn to expressive graphic streetwear and independent-brand culture. Some arrive already knowing the brand; others arrive from one campaign image and need proof that the garment, fit and ordering process are worth trusting. This is an inference from the published collection and content, not verified demographic research.

Prioritize four jobs: buy the piece already seen on social media; compare black and cream; decide whether the garment and fit justify the price; and check whether the store is dependable. A fifth job—joining the brand as a collaborator—is valid, but must not compete with shopping on the opening screen.

Before launch, review actual device mix, acquisition sources, returning-customer share, top landing pages, product-page abandonment, support questions and size-related exchanges. Do not fabricate personas, age ranges, sales volumes or conversion baselines.

---

## 2. Evidence audit: fix the trust layer before polishing the surface

The public catalog currently lists two products. The black Dirty Rodman Hoodie displays $89.99 with a $100 comparison price; the Cream Deluxe displays $109.99. These are dated observations, not a real-time feed. [S02–S04]

| Priority | Observed issue | Required change | Verification owner |
|---|---|---|---|
| P0 | The cream description gives 400 GSM in one place and 420 GSM in another. | Confirm the physical specification; populate one product-specific source of truth; remove the conflicting value everywhere. Do not borrow the black hoodie’s facts. | Brand / production |
| P0 | The shipping policy includes an internal editorial note. | Remove the note; confirm the actual processing promise; distinguish processing from delivery. | Brand operations |
| P0 | The contact-information policy includes a placeholder email and drafting advice. | Confirm the support inbox and use it consistently. An actual email exists in the separate privacy policy, but that does not establish the intended support workflow. | Brand operations |
| P0 | The campaign page advertises an October 30, 2026 release, while product pages expose add-to-cart controls. | Establish whether the items are available now, preorder, or unreleased; reconcile all purchase controls and dates. A visible button is not proof of successful checkout. | Brand / commerce |
| P0 | Black hoodie size options include both XXS and 2XS. | Inspect variant IDs and stock; determine whether this is an alias or a legitimate distinction; fix labels without deleting valid inventory or breaking order references. | Commerce |
| P0 | Final-sale wording and conditional size-exchange wording can be read inconsistently. | Have the owner clarify product eligibility and exclusions; show the approved distinction before purchase. | Brand / policy reviewer |
| P1 | Four application URLs returned no substantive application body in the retrieved content. | Verify in a normal browser with scripts and embedded apps. Confirm destination, validation, failure states and actual delivery. Do not assume a crawler omission proves a broken form. | Frontend / operations |
| P1 | Several important campaign and recruitment choices compete on the home page. | Put merchandise first; move collaboration recruitment into a dedicated destination and a small footer entry. | Design / merchandising |
| P1 | Product specifications and sizing need stronger presentation. | Supply measured garment charts, clear fit notes, fabric facts and verified model-size captions. | Brand / production |
| P1 | The retrieved material includes inconsistent spelling and copy polish. | Proof all interface and editorial text. Do not silently alter photographed garment artwork. | Brand editor |

Evidence: product pages [S03–S04], campaign [S05], application routes [S08–S11], shipping [S12], exchanges [S13], contact information [S14], privacy [S15].

### Boundaries of the audit

The 16 linked, public content routes were examined at the content/source-image level. Cart, search and authenticated account requests could not be inspected as normal interactive sessions. Sitemap and JSON feed requests were unavailable through the browsing tool. Private/unlinked pages, unexposed assets, product inventory, app configuration and checkout behavior therefore remain discovery tasks.

The plan does not contain invented Lighthouse scores, conversion losses, competitor metrics, stock counts or claims that all application forms are definitely broken.

---

## 3. Brand direction: “The Resilience Issue”

This is the internal name for the design system, not a replacement brand name or an instruction to rename the business. Preserve **UNDR.RATED.SZN**, its established message and the actual product art.

### Visual composition

Think of a streetwear campaign edited like a collectible publication: commanding clothing photographs; a few very large, condensed headlines; warm off-white surfaces; near-black structural elements; precise red accents; crisp rules; straightforward controls.

The website should feel confident without announcing that it is premium. Do not use luxury-brand clichés, generic motivational paragraphs, ubiquitous pill buttons, translucent dashboard cards, chrome objects or fashionable effects unrelated to the garment.

The contrast comes from scale and sequencing, not from making everything move. A huge portrait can sit beside one short line. A pair of garments can sit on a clean field. A quiet product page can follow a loud campaign page while still belonging to the same brand.

### Proposed design tokens

| Element | Direction |
|---|---|
| Main surface | Warm paper, `#F3F1EB` |
| Primary text / structural black | `#151515` |
| Signature action / emphasis | Controlled red, `#BE301E` |
| Secondary surface | `#E8E5DD` |
| Rules | `#D5D2CA` |
| Muted text | `#65635E`; verify contrast per use |
| Display type | Heavy condensed grotesk; reserve oversized scale for campaign moments |
| Reading type | Clear neutral sans-serif; complete sentences and normal casing for explanations |
| Corners | Square or very slightly softened; no blanket card treatment |
| Spacing | Base rhythm of 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 pixels |
| Buttons | Stable rectangles, 48–56px high, clear verbs, no magnetic behavior |
| Photography | Native color and texture; art-directed crops that preserve the clothing |

Colors and scale are proposals, not extracted official brand standards. The prototype uses system-font fallbacks and a typeset concept lockup. Obtain the actual logo source and approved font licensing before production. Do not rebuild the logo from a screenshot or distribute font files taken from another project.

### Specific lessons from the two references

**From 2kFerg:** images lead; short editorial labels organize the archive; large photographs and small captions create hierarchy; a campaign can feel authored without excessive navigation. Its existing “enter the archive” idea is appropriate to a portfolio, but should not become an entrance requirement here. [R01]

**From Muzeum:** use breathing room, controlled transitions, changing image scale and intentional relationships between content. Treat the garment like the exhibit, but keep visitors in an ordinary shopping interface. Its scene-building and spatial experiences are inspiration for presentation—not a dependency for shopping. [R02]

Never import the other projects’ photographs, customer information, brand marks or marketing copy. Their influence is compositional.

### Motion rules

Use a small number of transitions: a subtle photograph scale on hover, a short drawer opening, restrained crossfades and a small amount of section movement only where useful. Keep purchase controls stable. Use approximately 160–220ms for controls and 250–350ms for larger interface transitions as starting values to test.

No mandatory loader, scroll hijacking, custom cursor, 3D shopping room, autoplay audio, endless marquee, spinning products, fake scarcity timer, artificial viewer count, entrance puzzle or popup before the customer sees the clothes. Do not animate product names one letter at a time while a shopper waits.

---

## 4. Asset reuse and the real-media pipeline

The included manifest records **23 unique media references**: 19 photograph/product-image references and four video-poster references. Twenty were visually inspected; two black product photos timed out and the opening video thumbnail failed to load. This is the observed public set, not a guarantee that every file in the Shopify media library was discovered.

### Where the existing assets belong

| Asset family | Proposed job |
|---|---|
| Black and cream front portraits | Homepage identity; product-led campaign opening |
| Flat product images | Alternate collection view; factual garment comparison |
| Full-length styling photographs | Fit and proportion context; shoppable lookbook |
| Cream rear and hood photographs | Show the Deluxe distinction; product detail story |
| Red-lit seated portraits | Campaign pacing and visual contrast |
| Paired studio photograph | Explain the two expressions in one frame |
| Behind-the-scenes photographs | Humanize the campaign and show the real process |
| Dirt-bike/community archive photograph | Brand history only; do not imply older jackets are currently purchasable |
| Existing film posters | Preserve film provenance; link to original context until the real video sources are available |

Every identified item appears in the prototype’s visual archive. The strongest frames are reused elsewhere. “Use all the assets” should mean **retain and organize the material**, not put every file above the fold or weight every image equally.

### Production workflow

1. Export the store’s product media, Files assets, original logo, campaign video objects and any unlinked page media. Preserve original handles and source attribution.
2. Record each asset’s source URL, original dimensions, format, checksum, campaign, product association, owner/permission status and intended use. Preserve original files untouched.
3. Normalize product-image framing. The existing flat images have substantial blank canvas; a consistent garment scale matters more than a fashionable crop. Do not erase texture or redraw the artwork.
4. Store approved focal points separately for desktop and mobile. Do not center-crop every asset automatically.
5. Generate appropriately sized, browser-compatible derivatives. Inspect the HEIC source and the edges of the cream back packshot. A CDN width parameter is not proof that the original has sufficient detail.
6. Obtain full video source files and poster frames. Use an actual video object rather than guessing an MP4 path from a thumbnail identifier.
7. Map every derivative back to its source. Validate all asset URLs and mobile crops before publishing.

### Film implementation

The production hero must remain complete as a still image. If film improves the campaign, load it only after the critical image and controls, without audio, and provide a visible pause control when motion runs continuously. Prefer a deliberately edited short loop rather than a full-length film download.

Pause when offscreen; respect reduced motion; provide a still-only option for constrained connections where detectable. Full films should be user-initiated, captioned where speech matters, and use an appropriate accessible player. Do not autoplay multiple films on a page.

The two tiny thumbnail references must not be expanded into campaign heroes. In the prototype they are preserved as small archive items, not passed off as high-resolution video.

### Content permissions

Before publishing new crops in advertising or repurposing campaign material, have the brand confirm the relevant photography, model, film, music and artwork permissions. This is a release checklist, not a conclusion that the current store lacks permission. Do not imply an official collaboration or endorsement that the brand has not established.

---

## 5. Information architecture and route coverage

### Primary navigation

Desktop: **Shop · The Campaign · Our Story**, followed by search, account and bag utilities. Place **Lookbook**, **Join the SZN** and customer care in appropriate secondary navigation and the footer.

Mobile: visible **Shop**, bag and a compact menu. Search remains in the menu or another accessible utility location. Do not require a visitor to know that “BTS:DR” means behind-the-scenes content.

Keep shopping labels literal. Campaign headlines can be expressive; product selection should not be a riddle.

### Complete route plan

| Existing route or system surface | Proposed result | Prototype coverage |
|---|---|---|
| `/` | Merchandise-led campaign homepage | Implemented |
| `/collections/all` | Focused, two-product collection | Implemented |
| `/products/dirty-rodman-hoodie` | Black hoodie detail page | Implemented with local selection/bag |
| `/products/deluxe-dirty-rodamn` | Cream Deluxe detail page; preserve current handle | Implemented with local selection/bag |
| `/pages/behind-the-scenes-dirty-rodman` | Editorial campaign with product links | Implemented |
| `/pages/about-undr-rated-szn` | Short, visual brand story | Implemented |
| `/pages/contact` | Clear, routed customer-care form | Validation preview only |
| `/pages/brand-ambassador-application` | Ambassador-specific application | Validation preview only |
| `/pages/model-application` | Model-specific application | Validation preview only |
| `/pages/sales-representative-application` | Sales-role application | Validation preview only |
| `/pages/content-creator-application` | Creator application | Validation preview only |
| `/policies/shipping-policy` | Readable shipping page in shared care shell | Presentation preview / live source link |
| `/policies/refund-policy` | Clear exchange conditions | Presentation preview / live source link |
| `/policies/privacy-policy` | Legible approved legal text | Presentation preview / live source link |
| `/policies/terms-of-service` | Legible approved legal text | Presentation preview / live source link |
| `/policies/contact-information` | Consistent approved support contact | Presentation preview / live source link |
| Search | Results, suggested queries and empty state | Local product search implemented |
| Cart | Drawer plus full page | Local preview bag implemented |
| Customer account | Existing Shopify-hosted account flow | Explanatory handoff, not cloned login |
| Checkout | Brand-consistent Shopify checkout within supported configuration | Integration-boundary preview only |
| Not found | Useful 404 with collection recovery | Implemented |

Add three justified destinations: **Lookbook**, **Community / Join the SZN**, and **Sizing & fit**. A small Help page can organize support links. Do not manufacture categories, collections, journals or loyalty systems simply to increase the page count.

The prototype uses hash routes so it can be opened as a file. Those hashes are a review convenience, not the production URL strategy.

---

## 6. Page-by-page design and acceptance criteria

### 6.1 Homepage: desire, merchandise, proof

**Opening composition.** Use two strong original portraits to establish the black and cream expressions immediately. Pair them with the existing campaign idea, edited into a decisive headline: **ONE LAST DANCE.** Keep body copy to one or two lines. Primary action: **Shop the collection**. Secondary action: **Inside the campaign**.

Keep the photo and action visible without waiting for animation. On mobile, maintain a direct Shop action in the header even when the image comes before the headline.

**Second section.** Show both products with product name, color, price and a clear destination. Allow on-body/product-view switching. Do not hide the price behind hover. Avoid a complex filter sidebar for two products.

**Third section.** Give the cream back artwork and hood detail room to explain themselves. Do not mix the black product’s fabrication claims into the cream product.

**Fourth section.** A concise story teaser with the real archive photograph. Label older imagery as archive material so customers are not misled about the current assortment.

**Fifth section.** A small shoppable styling edit. Every photograph that clearly features a currently sold piece should lead to that specific piece, or offer a simple choice when it features both.

**Final section.** One useful email invitation. Follow it with a real footer: collection, story, community, care and policies. Recruit collaborators through the Community page, not a long list of job descriptions interrupting the buying journey.

**Accept when:** the shopper sees the merchandise before recruitment; can reach a product without an intro; can understand the collection with motion disabled; and does not mistake a future release date for an immediate shipping promise.

### 6.2 Collection: clarity, not catalog theater

Use a concise opening title, a product count and a simple color filter. A two-column product display should feel intentionally curated rather than empty. Offer on-body and clean product views where they genuinely help comparison.

Show names, colorways and current Shopify prices. Comparison pricing appears only when valid in the commerce data. On mobile, product labels and prices must remain readable; a two-column grid must not turn everything into tiny metadata.

If the range grows later, introduce categories and filters only where they help distinguish actual merchandise. Design empty-filter recovery now. Keep filter state in the URL in production and preserve it when returning from a product.

**Accept when:** both products are equally discoverable; color filtering works with a keyboard; prices do not jump after hydration; no invented “best seller” or “selling fast” badge appears; and a filter cannot trap the user in a blank page.

### 6.3 Product pages: the most important part of the redesign

Desktop: large gallery on the left, a calm sticky information column on the right. Mobile: image, clear product identification and price, color, fit help, size options, purchase action and concise fulfillment/exchange guidance.

The gallery should include a strong front view, clean product view, rear/hood details where applicable, a full-length styling frame and relevant close details. Do not put an ambiguous rear packshot first simply because it was uploaded first.

The buy panel must answer: What is this? What color am I buying? What does it cost? How does it fit? Which size is selected? Is this size actually available? Is this preorder? When is processing expected? What happens if the fit is wrong?

Use explicit size selection. Never silently choose XS as the buyer’s intention. Disabled options need readable unavailable labels, not only faint colors. Changing color must resolve to the correct product or real variant; the two currently separate products must not be collapsed into a fictional single variant structure.

Keep the size guide close to selection. Supply measured garment width, body length and sleeve length; show how to measure; provide inch/centimeter switching; and add verified model height and worn size to each appropriate photograph. Do not infer body measurements from pictures.

Display truthful fulfillment wording near the action. The general 2–5-day processing statement cannot be used as a delivery date. Do not promote the cream edition count as remaining stock. If the owner confirms a 35-piece production edition, describe the edition separately from actual inventory.

Use accordions for supporting details, not to hide critical fit, price, preorder or exchange information. Recommend the other actual product instead of filling a carousel with duplicates or products not for sale.

**Accept when:** selecting a size changes the actual submitted Shopify variant; an invalid or unavailable size cannot be purchased through a stale interface; adding the item gives a confirmed cart result; errors preserve the selection; and the sticky mobile action does not cover content, keyboards or focused controls.

### 6.4 Campaign: an editorial that sells the clothes

Make the current behind-the-scenes page a proper campaign chapter. Lead with a paired image or a strong portrait, show the campaign name and keep a shopping action nearby.

Sequence the page as campaign frame, studio/process detail, garment detail and product selection. Retain verified credits from the original page. Show shoot dates only as editorial context and release dates only when their meaning has been confirmed.

Use a real film when its source is available. Until then, a still is a still: no fake play button. Link the black frame to the black hoodie and the cream rear artwork to the Cream Deluxe. When a picture shows both, present two concise product choices.

**Accept when:** campaign discovery never becomes a shopping dead end; all media has an appropriate accessible representation; and credited names/dates agree with approved content.

### 6.5 Lookbook: the right place for the full image set

Use an editorial grid with consistent captions and occasional larger compositions. Offer photo / film filtering only when useful; film posters must be identified as stills until playback is connected. A lightbox should support closing, keyboard focus and returning to the same scroll position.

Preserve every source item in the media library, but keep weak duplicates, low-resolution previews and pending-rights assets out of the main commercial sequence. The prototype exposes the full manifest for review; the production lookbook should be curated after approval.

**Accept when:** each purchasable look has a product connection; archive garments are not presented as available; images do not load at their largest size unnecessarily; and original context remains traceable.

### 6.6 Our Story: make the message tangible

Edit the current long narrative into short chapters: beginning, learning discipline, and what the brand stands for now. Use real images as evidence of community and process, not decorative stock photographs.

Retain the 2020 origin only because it appears in the published story. Avoid adding undocumented founder biographies, manufacturing locations, charity contributions, sustainable claims or customer milestones. Let the founder approve the final edit so it still sounds like the brand. [S06]

Finish with two relevant routes: shop the current collection, or explore collaboration. No uninterrupted wall of copy and no grandiose manifesto detached from the garments.

### 6.7 Community and four application pages

Provide a concise Community hub with the existing four role categories. Each application retains its current URL and receives a clear role-specific introduction and relevant questions.

Use common fields sparingly: name, email, city/region, a portfolio/social link where relevant, and a short statement of interest. Adapt follow-up questions by role rather than asking everyone for the same generic information. Do not make phone number, address, sensitive identity information or body measurements mandatory without an established need.

For models, a secure portfolio link is a simpler starting point than an unrestricted public upload widget. Any later upload system needs file validation, size limits, access controls, retention rules and an approved consent process.

Separate marketing enrollment from applying. Do not secretly add applicants to the newsletter. A successful application state should only appear after the configured service accepts the submission. Include accessible validation, preserved input on recoverable errors, a retry route and a genuine contact alternative.

**Accept when:** each role reaches the correct destination; spam protections do not create an inaccessible barrier; the owner can retrieve the submission; and the customer receives truthful confirmation without an invented response-time guarantee.

### 6.8 Contact and customer care

Offer a topic selector for sizing, an existing order, shipping, exchanges, collaborations and other questions. Show the order-number field when useful. Keep fields labeled even after typing.

Use one approved support inbox throughout the header/footer, contact page, policies and order-related messages. The separate privacy policy currently publishes `undrsuccesss@gmail.com`; confirm its operational role rather than inventing a branded inbox. [S15]

Link directly to shipping, exchanges and sizing beside the form. Do not require users to search social media for order support. Avoid exposing additional personal contact details unnecessarily.

**Accept when:** real form delivery is tested, error states are clear, no card information is requested, and response expectations match the brand’s actual staffing.

### 6.9 Policy pages

Use a shared support shell: clear title, readable body measure, section headings, useful navigation and a verified support route. Render the approved Shopify policy content rather than maintaining duplicate hard-coded copies.

Presentation improvements are not permission to rewrite legal commitments. Resolve the published drafting artifacts and policy ambiguity with the owner, then preserve the approved meaning. Clearly distinguish general processing, preorder estimates, carrier delivery, final-sale status, eligible size exchanges, shipping costs and defective/incorrect-item handling.

The prototype uses concise presentation notes and links to current policies, not replacement legal documents. A production launch must include the complete approved text.

### 6.10 Cart, checkout and account

The cart drawer confirms the exact product, color, size and quantity added. Keep product thumbnails, useful quantity controls, line prices, removal, subtotal and an obvious checkout action. Offer a full cart page as a stable fallback.

Handle empty cart, insufficient stock, stale pricing, network errors and discount changes. Do not fabricate free-shipping thresholds or show unavailable cross-sells. Do not imply that an item is reserved merely because it is in the bag.

Use Shopify checkout and the existing account system. Apply branding within the actual store configuration and plan capabilities. Do not promise a fully custom checkout before checking the platform boundaries, and do not build a duplicate login form that collects credentials.

The prototype bag does not transfer to the live site; this is disclosed in the interface. The production cart must use actual server-side commerce data.

### 6.11 Search, empty states and 404

For two products, a fast, small search experience is sufficient. Match product names and meaningful color terms. Show a useful default collection before typing. For no results, provide a clear reset and a direct route back to merchandise.

A 404 should say what happened and make recovery easy. Do not place a long animation or clever-but-confusing message between the user and the collection.

---

## 7. Shopify production architecture

### Recommendation: retain Shopify, replace the storefront design

Build a custom, section-based Shopify theme. Keep products, variants, inventory, customers, orders, payments and merchant editing in the existing system. The requested visual quality does not itself require headless infrastructure.

Shopify JSON templates support configurable sections and merchant reordering; dynamic sources can connect supported settings to relevant content data. Use those capabilities to give the owner practical control without exposing layout-breaking freedom. [T01, T03]

A separate headless frontend would only be justified by requirements that a theme cannot reasonably serve, not by the phrase “Fortune 500.” It would add responsibilities for routing, caching, commerce integration and maintenance that are not necessary to establish this design direction.

### Proposed organization

```text
layout/
  theme.liquid
sections/
  undr-header.liquid
  undr-footer.liquid
  undr-editorial-hero.liquid
  undr-featured-collection.liquid
  undr-product-main.liquid
  undr-collection-main.liquid
  undr-campaign-gallery.liquid
  undr-story-chapter.liquid
  undr-community-roles.liquid
  undr-application-form.liquid
  undr-contact-main.liquid
  undr-newsletter.liquid
  undr-cart-drawer.liquid
  undr-cart-main.liquid
  undr-search-main.liquid
snippets/
  undr-responsive-media.liquid
  undr-product-card.liquid
  undr-price.liquid
  undr-size-picker.liquid
  undr-size-guide.liquid
  undr-fulfillment-note.liquid
  undr-policy-summary.liquid
  undr-icon.liquid
assets/
  undr-tokens.css
  undr-base.css
  undr-commerce.css
  undr-editorial.css
  undr-cart.js
  undr-product.js
  undr-dialog.js
  undr-media.js
templates/
  index.json
  collection.json
  product.json
  page.campaign.json
  page.story.json
  page.lookbook.json
  page.community.json
  page.application.json
  page.contact.json
  page.size-guide.json
  cart.json
  search.json
  404.json
```

Policy and customer-account surfaces must be handled through their supported Shopify mechanisms; do not assume every system URL accepts an arbitrary page template. Confirm the installed theme, customizations, app blocks and checkout/account configuration before modifying any of them.

This is the proposed production organization. The included standalone prototype is not a theme ZIP and must not be uploaded to Shopify as though it were one.

### Content contracts

**Product-specific fields:** verified fabric description; verified GSM where known; fit description; garment measurement table/reference; model-size captions associated with specific images; product care; fulfillment mode; approved processing/preorder note; exchange-eligibility summary; optional edition size; related campaign.

**Campaign data:** title; short description; desktop hero; mobile hero; focal points; poster; actual video source/object; credits; shoot date; optional release timestamp including timezone; related products; ordered gallery entries; publication/approval status.

**Gallery entry:** image/video reference; alt text; caption; product association; campaign credit; display crop; visibility; permission status; original asset identifier.

**Application configuration:** role; introduction; role-specific questions; recipient/workflow identifier; consent wording; success/error copy; privacy/retention policy reference.

**Storewide care settings:** approved support email; processing message; shipping-policy link; exchange-policy link; response expectation if approved; announcement message; active campaign.

Do not duplicate price, inventory, variants, product title and policies into unrelated manual theme settings. Shopify remains authoritative for commerce data.

### Release-state logic

Support unreleased, preorder, available, partly sold out, sold out and archived states. The merchant must define how each product is sold; the campaign date alone is not enough.

If scheduled messaging is needed, store a timezone-aware release timestamp and use server-authoritative product availability. A customer changing their local clock must not gain purchase access or trigger contradictory messaging. Do not create a client-only countdown as an inventory gate.

When a product is archived, preserve its useful URL where appropriate and direct shoppers to the current collection. When a size is sold out, provide a real restock-interest workflow only if the owner supports it.

---

## 8. Commerce, form and failure-state engineering

### Cart integration

Use locale-aware Shopify Ajax Cart endpoints in a theme. Add the chosen variant ID, not a product ID, color label or guessed index. The official API supports cart mutations and optional bundled section rendering. [T02]

Serialize mutations sufficiently to prevent rapid quantity changes from applying out of order. Where items can differ by properties or selling plans, address the correct line key. Display server-returned prices and quantities.

Distinguish a failed cart mutation from a successful mutation followed by failed drawer rendering. If the cart changed successfully but the section cannot render, offer the full cart page; do not repeat the add request and duplicate the item. On an ambiguous network timeout, reconcile with the cart before retrying a non-idempotent action.

Preserve the selected size and show a useful inline error when stock changes. Do not show “added” until confirmed. Ensure a normal product form and the full cart remain usable if enhancement scripts fail.

### Required interface states

| Component | Required states |
|---|---|
| Product selection | No size, chosen size, unavailable size, invalid combination, changed product |
| Add action | Idle, pending, confirmed, insufficient stock, network failure |
| Cart | Empty, populated, updating, removal, server-adjusted quantity, stale price, unavailable line |
| Search | Initial, results, empty, loading, unavailable service |
| Newsletter | Empty, invalid address, pending, accepted, existing subscriber, service failure |
| Contact/application | Empty, field errors, pending, accepted, rejected, retry, duplicate protection |
| Media | Loading, ready, missing source, playback failed, reduced motion |
| Navigation/dialog | Closed, open, focus entry, focus containment, Escape, focus return |
| Collection | Default, active filter, empty filter, restored navigation state |

### Forms and data

Use the store’s supported form mechanisms or an explicitly configured integration. Customer-care and role applications are different intents from marketing subscriptions. Do not combine them by default.

Validate on the server as well as the client. Show success only after the receiving service accepts the data. Limit stored personal information, keep sensitive values out of URLs and analytics, and establish retention and access rules. Do not expose private inbox routing or tokens in the frontend.

The design prototype checks fields locally and explicitly states that nothing was sent. Replace that behavior only when the real delivery path is configured and tested.

---

## 9. Mobile, accessibility and performance

### Mobile requirements

Start at 320–390px widths, not as a desktop layout shrunk later. Keep Shop immediately available. Crop for the garment and face rather than blindly preserving the desktop frame. Avoid wide tables, tiny price typography and navigation that only works on hover.

Keep form inputs comfortable to type into. Ensure sticky controls respond to the software keyboard and device safe areas. The product-page action must not cover the last lines of a policy summary. Test browser back navigation, rapid taps, image enlargement and a long size-selection session.

### Accessibility targets

Use WCAG 2.2 AA as the implementation target, with manual testing rather than a claim based solely on automated checks. Prefer approximately 44–48px interactive targets in the design system; do not confuse that project target with WCAG 2.2’s smaller minimum target-size criterion and its exceptions. [T05]

Use semantic headings, native buttons and links, real labels, explicit size radio groups and descriptive error messages. Color cannot be the only indicator of selected size or unavailable stock. Keep important text contrast appropriate to its size and weight.

Dialogs need a clear label, contained focus, Escape behavior and focus return. Sticky headers and purchase bars must not obscure the focused control. Respect reduced motion and give moving content appropriate controls. [T06]

Provide useful alt text about the garment and composition without guessing people’s identities or physical measurements. Decorative images should not flood assistive technology with redundant captions. Test at 200% zoom and with a screen reader on the purchase route.

### Performance budgets — targets, not measured results

| Measurement / budget | Proposed target |
|---|---|
| Field LCP, 75th percentile | 2.5 seconds or less |
| Field INP, 75th percentile | 200 milliseconds or less |
| Field CLS, 75th percentile | 0.1 or less |
| First-party initial JavaScript | Aim below 80KB compressed; document exceptions |
| Critical + initially required CSS | Aim below 40KB compressed |
| Initial font transfer | Aim below 100KB; avoid unnecessary weights |
| Mobile hero media | Work toward an approximately 300–550KB still-image budget for the chosen composition |
| Third-party scripts | No script without an identified owner, job and measured cost |

The Web Vitals thresholds above follow the published metric guidance. Asset and code budgets are proposed project constraints, not universal standards or results measured on the existing store. Evaluate field data separately by device and key template. [T04]

Use responsive images, intrinsic dimensions and appropriate source sizes. Prioritize the true LCP image, lazy-load below-fold media, avoid duplicate full-size image downloads, and do not render invisible autoplay videos. Keep the page usable before motion or optional third-party features load. Shopify’s own theme guidance prioritizes restrained JavaScript and performant media handling. [T07]

Do not install multiple app bundles just to obtain badges, popups, animation and urgency. The visual system should not depend on a large generic effects library or a full WebGL scene.

---

## 10. SEO, sharing and migration protection

Preserve existing product and page handles wherever possible. The cream product’s current handle contains a spelling inconsistency, but changing it casually could break shared links. Correct the visible title independently; if a handle change is approved, implement and verify the redirect.

Create a route inventory before changing templates. Capture canonical URLs, titles, descriptions, existing redirects, social previews and relevant app-generated surfaces. Keep structured product data tied to authoritative product fields; never publish invented review scores or availability.

Use unique, concise metadata for products, campaign and story. Share previews should show the actual garment and make its identity clear at small sizes. Keep staging previews out of indexing. Remove staging-only noindex rules only from the correct production environment at launch.

Do not casually modify robots settings, checkout URLs, tracking integrations, customer-account settings or fulfillment rules while redesigning the theme. Those changes need explicit owners and separate validation.

---

## 11. Measurement: prove the improvement

Establish a baseline before launch. Do not declare an uplift from prettier screenshots.

Track the funnel from collection view to product view, meaningful selection, confirmed add-to-cart, checkout start and completed purchase. Use the commerce platform’s authoritative purchase events and avoid double counting from overlapping analytics integrations.

Useful diagnostic events include size-guide opening, size change, add-to-cart error category, campaign-to-product click, search with no results and consented signup acceptance. Never put raw names, emails, messages or uploaded portfolio links into analytics events.

| Metric | Definition / interpretation |
|---|---|
| Product-to-cart rate | Sessions with a confirmed add divided by sessions with a product view; segment by product, device and acquisition source |
| Cart-to-checkout rate | Sessions beginning checkout divided by sessions with a confirmed cart add |
| Checkout completion | Completed purchases divided by checkout starts, using a consistent attribution window |
| Revenue per session | Attributed revenue divided by eligible sessions; consider traffic mix and availability |
| Size-related support/exchanges | Operational signal that the sizing experience needs improvement |
| Email signup acceptance | Accepted subscriptions, not clicks on a submit button |
| Cart error rate | Failed add/change attempts divided by corresponding attempts |

Prioritize three experiments after the store is stable: on-body versus product-image lead; direct collection hero versus campaign-led hero; and clearer fit information next to sizes. Test one meaningful change at a time with a predefined measurement window and sample requirement. Low traffic may call for moderated usability sessions before an inconclusive A/B test.

No invented urgency, fabricated reviews or manipulative scarcity is needed to run these tests.

---

## 12. Delivery sequence and approval gates

### Gate A — truth and access

Brand/operations confirms fabric specifications, sizing labels, measurements, release state, fulfillment promises, exchange eligibility, support contact and media permissions. Obtain a theme export, app inventory, route inventory and relevant analytics baseline. Duplicate the live theme and identify the rollback target.

**Exit:** there is no disagreement about what can be bought or what the brand is promising.

### Gate B — design system and first purchase path

Approve typography, palette, header/footer, product-card language, the mobile hero and one fully detailed product page. Demonstrate black and cream without hiding their differences. Test the path from home to product to cart before designing decorative secondary moments.

**Exit:** the owner can review the desired look and a coherent purchase flow at desktop and phone sizes.

### Gate C — complete commerce implementation

Build collection, both product templates, variants, cart drawer, cart page, search and the Shopify checkout handoff. Include failure states and no-JavaScript fallbacks. Confirm presentment currency, discounts and regional behavior according to the actual store setup.

**Exit:** a controlled test order is correct from selected variant through order record, inventory and confirmation.

### Gate D — editorial and operations

Build campaign, lookbook, story, Community, the four applications, contact, sizing and all policy presentations. Connect approved content and real form delivery. Complete asset optimization and credits.

**Exit:** no page is still an old-theme afterthought; each form reaches its operational destination; no unsupported claim or placeholder remains.

### Gate E — release candidate

Run accessibility, responsive, performance, commerce and content QA. Check all existing routes and redirects. Validate analytics consent and event deduplication. Review with both brand and technical owners.

**Exit:** all P0 defects are closed; remaining minor issues are documented and accepted; the old theme can be restored.

### Gate F — controlled launch and observation

Publish the approved theme, not an unreviewed working branch. Recheck the primary purchase path immediately after publication. Observe payment/cart errors, form delivery, real-user performance and customer-care questions. Have a defined rollback trigger for broken purchase flows, wrong pricing or missing variants.

Visual rollback may mean republishing the previous theme. Product data, policy text and app settings require their own backups and recovery plan; theme rollback alone does not undo every operational change.

Do not promise completion based on an arbitrary number of minutes. Time depends on the existing theme’s condition, media exports, data corrections and approval speed. Parallelize asset preparation, policy cleanup and component implementation, but never bypass the commerce verification gate.

---

## 13. Production QA checklist

### Content and assets

Confirm the two product records, prices, valid comparison pricing, fabric facts and size labels. Check desktop and mobile crops, source resolution, correct color association, back/hood views, alt text, image formats, captions and credits. Search the entire publishable content set for placeholders, drafting notes, inconsistent dates and copy errors.

### Commerce

Test every real variant, sold-out sizes, unavailable combinations, quantity updates, duplicate-click handling, removal, refresh, discounts where enabled, currency/market settings, cart persistence and checkout handoff. Verify the actual ordered SKU and inventory behavior. Test failure conditions without assuming that a successful visual animation proves the mutation succeeded.

### Forms and account

Test invalid and valid submissions, accessible field errors, success only after acceptance, delivery to the correct destination, spam protection, duplicate prevention and sensitive-data handling. Confirm login and order access on the existing account system without capturing credentials in the custom theme.

### Devices and interaction

Check 320, 375/390, 430, 768, 1024 and 1440px widths, plus larger screens. Use real iOS Safari and Android Chrome, not only desktop emulation. Check 200% zoom, keyboard-only purchasing, VoiceOver or another screen reader, reduced motion and software-keyboard behavior. Make sure no sticky UI obscures the focused control.

### Performance, SEO and deployment

Measure the homepage, collection and both product pages on constrained mobile conditions. Separate lab checks from field metrics. Check canonicals, structured data, social previews, redirects, 404s and staging indexing rules. Record the published theme version, backup location, owner approvals and rollback process.

### Minimum launch definition

There are no broken primary routes, inaccessible purchase controls, missing approved policies, wrong prices, unsupported claims, dead forms, missing variant selections or unresolved P0 issues. All image/video exceptions are either fixed or intentionally excluded from the public commercial sequence. A real test order and verified form delivery are mandatory before calling the implementation production-ready.

---

## 14. What this package actually contains

- `index.html`, `styles.css`, `data.js`, `app.js`: reviewable responsive storefront prototype.
- `UNDRSZN_Preview.html`: single-file version of the same preview; original photographs still require internet access.
- `asset-manifest.json`: source/provenance records and inspection notes for 23 media references and the dated two-product snapshot.
- `docs/UNDRSZN_REDESIGN_BLUEPRINT.md`: this production blueprint.
- `docs/prototype-qa.json`: actual local interface-test results and explicit limitations.
- `fetch_assets.py`: optional source-image retrieval utility for an internet-enabled machine; not proof that the source media has already been exported.

The design includes 25 review destinations, counting its notes page. It covers the 16 examined content routes, adds useful editorial/care destinations and previews system surfaces. Not every prototype surface is a complete production implementation: legal pages are presentation previews; login and checkout are handoffs; forms do not send data; videos are represented by their existing posters.

Local Chromium checks exercised all 25 routes at 1440, 390 and 320px, with no horizontal overflow or JavaScript page errors in the completed run. Interaction checks covered size validation, adding a size-specific preview item, quantity arithmetic, cart removal, filtering, search, contact validation, gallery switching and dialog closing. The environment blocked normal navigation/network access, so the tests used in-memory HTML with remote media requests aborted. They do not establish live-image rendering, actual cross-reload storage behavior, Safari behavior, real Shopify commerce correctness or production performance.

The full production acceptance checklist remains necessary.

---

## 15. Source register

Source references identify factual observations. Layout, copy direction, architecture choices, budgets and acceptance gates are proposals unless stated otherwise. Access date for this audit: October 14, 2026.

### Public store

- **S01 Home:** `https://undrszn.com/`
- **S02 Collection:** `https://undrszn.com/collections/all`
- **S03 Black product:** `https://undrszn.com/products/dirty-rodman-hoodie`
- **S04 Cream product:** `https://undrszn.com/products/deluxe-dirty-rodamn`
- **S05 Campaign:** `https://undrszn.com/pages/behind-the-scenes-dirty-rodman`
- **S06 Story:** `https://undrszn.com/pages/about-undr-rated-szn`
- **S07 Contact:** `https://undrszn.com/pages/contact`
- **S08 Ambassador:** `https://undrszn.com/pages/brand-ambassador-application`
- **S09 Model:** `https://undrszn.com/pages/model-application`
- **S10 Sales:** `https://undrszn.com/pages/sales-representative-application`
- **S11 Creator:** `https://undrszn.com/pages/content-creator-application`
- **S12 Shipping:** `https://undrszn.com/policies/shipping-policy`
- **S13 Exchanges:** `https://undrszn.com/policies/refund-policy`
- **S14 Contact policy:** `https://undrszn.com/policies/contact-information`
- **S15 Privacy:** `https://undrszn.com/policies/privacy-policy`
- **S16 Terms:** `https://undrszn.com/policies/terms-of-service`

Individual media source URLs and originating pages are recorded in `asset-manifest.json`.

### Design references

- **R01 2kFerg / Dorvell Ferguson:** `https://www.dorvellferguson.com/`
- **R02 Muzeum:** `https://muzeum.vercel.app/`

### Primary technical sources

- **T01 Shopify JSON templates:** `https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates`
- **T02 Shopify Ajax Cart API:** `https://shopify.dev/docs/api/ajax/reference/cart`
- **T03 Shopify dynamic data sources:** `https://shopify.dev/docs/storefronts/themes/architecture/settings/dynamic-sources`
- **T04 Web Vitals:** `https://web.dev/articles/vitals`
- **T05 W3C target size:** `https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html`
- **T06 W3C focus not obscured:** `https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html`
- **T07 Shopify theme performance:** `https://shopify.dev/docs/storefronts/themes/best-practices/performance`

**The guiding decision:** Make the clothes unforgettable and the purchase ordinary—in the best possible sense.
