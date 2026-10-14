import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { DialogHost } from "@/components/DialogHost";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { UIProvider } from "@/components/providers/UIProvider";
import { site } from "@/data/site";

import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/chrome.css";
import "@/styles/home.css";
import "@/styles/commerce.css";
import "@/styles/pages.css";
import "@/styles/film.css";

// Self-hosted OFL fonts (via @fontsource packages) so builds never depend on a network fetch.
const anton = localFont({
  src: "../../node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-anton",
  display: "swap",
  fallback: ["Impact", "Arial Narrow", "sans-serif"],
});
const archivo = localFont({
  src: [
    { path: "../../node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
    { path: "../../node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-archivo",
  display: "swap",
});
const jetbrains = localFont({
  src: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.collection}`,
    template: `%s — ${site.name}`,
  },
  description:
    "UNDR.RATED.SZN — Uncomfortable Nights Develop Resilience. The Dirty Rodman collection: two expressions, one unmistakable graphic.",
  openGraph: {
    title: site.name,
    description: "Uncomfortable Nights Develop Resilience. The Dirty Rodman collection.",
    type: "website",
  },
  robots: site.previewMode ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
  colorScheme: "dark light",
};

// Runs before paint: dark by default, light only if the visitor chose it. Also flags JS for motion styles.
const themeScript = `(function(){try{var t=localStorage.getItem('undr-theme');var r=document.documentElement;r.dataset.theme=t==='light'?'light':'dark';r.classList.add('js');}catch(e){document.documentElement.classList.add('js');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${anton.variable} ${archivo.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://undrszn.com" crossOrigin="" />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <UIProvider>
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <DialogHost />
          <RevealObserver />
        </UIProvider>
      </body>
    </html>
  );
}
