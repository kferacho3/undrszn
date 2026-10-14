export interface Role {
  slug: string;
  title: string;
  text: string;
  extra: string;
  needsPortfolio: boolean;
}

export const roles: Role[] = [
  {
    slug: "brand-ambassador",
    title: "Brand ambassador",
    text: "Represent the brand through a genuine connection to its message, your community, and the clothes.",
    extra: "Tell us where and how you would represent UNDR.",
    needsPortfolio: false,
  },
  {
    slug: "model",
    title: "Model",
    text: "Bring personality, confidence, and your own way of wearing the collection to future campaigns.",
    extra: "Share a portfolio or a small set of recent photographs via a link.",
    needsPortfolio: true,
  },
  {
    slug: "sales-representative",
    title: "Sales representative",
    text: "Help introduce the collection through direct conversations and relationships.",
    extra: "Tell us about your sales experience and the communities you reach.",
    needsPortfolio: false,
  },
  {
    slug: "content-creator",
    title: "Content creator",
    text: "Give the brand a fresh perspective through original photographs, films, styling, or storytelling.",
    extra: "Share a portfolio link and one idea you would bring to the brand.",
    needsPortfolio: true,
  },
];

export const applicationPath = (r: Role) => `/pages/${r.slug}-application`;
export const getRoleByPageSlug = (slug: string) => roles.find((r) => `${r.slug}-application` === slug);
