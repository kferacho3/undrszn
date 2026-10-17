import type { MetadataRoute } from "next";
import { products } from "@/data/catalog";
import { policies } from "@/data/policies";
import { applicationPath, roles } from "@/data/roles";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/collections/all",
    ...products.map((p) => `/products/${p.handle}`),
    "/pages/journey",
    "/pages/behind-the-scenes-dirty-rodman",
    "/pages/about-undr-rated-szn",
    "/pages/lookbook",
    "/pages/community",
    "/pages/members-only",
    ...roles.map(applicationPath),
    "/pages/contact",
    "/pages/size-guide",
    "/pages/help",
    ...Object.keys(policies).map((s) => `/policies/${s}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
