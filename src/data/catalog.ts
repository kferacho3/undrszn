/**
 * Catalog + media library.
 *
 * Source of truth: ./asset-manifest.json (copied verbatim from the redesign package,
 * docs/redesign/prototype/asset-manifest.json). Prices and sizes are a dated snapshot
 * (2026-10-14) of the public store, NOT live inventory. In production these come from
 * Shopify product/variant objects.
 */
import manifest from "./asset-manifest.json";

export type AssetKind = "packshot" | "photograph" | "video_poster";

export interface Asset {
  id: string;
  original_url: string;
  alt: string;
  kind: AssetKind;
  source_page: string;
  inspection: string;
  notes: string;
  local_file: string;
}

export interface Product {
  id: "black" | "cream";
  handle: string;
  name: string;
  color: string;
  price: number; // cents
  compare_at: number | null; // cents
  lead: string;
  flat: string;
  images: string[];
  description: string;
  facts: string[];
  sizes: string[];
  source: string;
  notes: string;
}

export const AUDIT_DATE = manifest.audit_date;
export const SUPPORT_EMAIL = manifest.public_contact_email;
export const LIVE_STORE = "https://undrszn.com";

export const assets = manifest.assets as Asset[];
export const products = manifest.products as Product[];

const assetMap = new Map(assets.map((a) => [a.id, a]));
const productMap = new Map(products.map((p) => [p.id, p]));

export function getAsset(id: string): Asset {
  const asset = assetMap.get(id);
  if (!asset) throw new Error(`Unknown media asset: ${id}`);
  return asset;
}

export function getProduct(id: string): Product | undefined {
  return productMap.get(id as Product["id"]);
}

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

/** Edition label used across cards and product pages. */
export function editionOf(p: Product): string {
  return p.id === "cream" ? "Deluxe" : "Original";
}

/** Two tiny film thumbnails must never be enlarged (see manifest notes). */
export const TINY_ASSETS = new Set(["film-car", "film-arrival"]);

/** Shopify CDN supports on-the-fly width transforms via the `width` query param. */
export function assetUrl(asset: Asset, width = 1200): string {
  if (TINY_ASSETS.has(asset.id)) return asset.original_url;
  return asset.original_url.replace(/([?&])width=\d+/, `$1width=${width}`);
}

export function assetSrcSet(asset: Asset, widths = [480, 800, 1200, 1800]): string | undefined {
  if (TINY_ASSETS.has(asset.id)) return undefined;
  return widths.map((w) => `${assetUrl(asset, w)} ${w}w`).join(", ");
}

export function formatMoney(cents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export const productPath = (p: Product) => `/products/${p.handle}`;
