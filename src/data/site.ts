/**
 * Storewide settings. Flip `previewMode` to false once the cart, forms and checkout are
 * wired to Shopify and the owner decisions in docs/redesign/UNDRSZN_REDESIGN_BLUEPRINT.md
 * are resolved. While true, the site discloses that orders and submissions are not live.
 */
export const site = {
  name: "UNDR.RATED.SZN",
  issue: "The Resilience Issue",
  collection: "The Dirty Rodman Collection",
  motto: "Uncomfortable Nights Develop Resilience.",
  instagram: "https://www.instagram.com/undr.rated.szn/",
  previewMode: true,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const primaryNav = [
  { href: "/collections/all", label: "Shop" },
  { href: "/pages/behind-the-scenes-dirty-rodman", label: "The Campaign" },
  { href: "/pages/journey", label: "The Journey" },
  { href: "/pages/about-undr-rated-szn", label: "Our Story" },
  { href: "/pages/members-only", label: "Members" },
];

export const menuNav = [
  { href: "/collections/all", label: "Shop the collection" },
  { href: "/pages/behind-the-scenes-dirty-rodman", label: "The campaign" },
  { href: "/pages/journey", label: "The Journey — film" },
  { href: "/pages/lookbook", label: "Lookbook" },
  { href: "/pages/about-undr-rated-szn", label: "Our story" },
  { href: "/pages/community", label: "Join the SZN" },
  { href: "/pages/members-only", label: "Members Only" },
  { href: "/pages/contact", label: "Contact" },
  { href: "/search", label: "Search" },
  { href: "/account", label: "Account" },
];
