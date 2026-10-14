import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Brand photography is served from the Shopify CDN with explicit srcset/sizes.
      "@next/next/no-img-element": "off",
    },
  },
  { ignores: [".next/**", "node_modules/**", "docs/**", "next-env.d.ts"] },
];

export default config;
