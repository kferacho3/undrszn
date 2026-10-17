import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { MembersGallery } from "@/components/members/MembersGallery";
import { MembersGoods } from "@/components/members/MembersGoods";
import { MembersImage } from "@/components/members/MembersImage";
import { getMemberImage } from "@/data/members";

const cormorant = localFont({
  src: [
    { path: "../../../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-members-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  title: "Members Only — A Private Viewing",
  description: "A closer look at a quieter side of UndrSzn. Enter the Members Only collection preview: knitwear, portraits, and small goods.",
  openGraph: {
    title: "UndrSzn — Members Only",
    description: "A private point of view. Explore the collection preview.",
    images: [{ url: "/media/members/reading-room-ivory-1118.webp", width: 1118, height: 1407, alt: "UndrSzn Members Only collection preview" }],
  },
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.2" /></svg>;
}

export default function MembersOnlyPage() {
  return (
    <article className={`members ${cormorant.variable}`}>
      <section className="members-hero" aria-labelledby="members-title">
        <div className="members-hero__folio members-label"><span>UndrSzn / Members Only</span><span>A private viewing</span></div>
        <div className="members-hero__layout">
          <div className="members-hero__copy">
            <p className="members-label members-hero__eyebrow">A world within the SZN</p>
            <h1 id="members-title">Members<br /><em>only.</em></h1>
            <p className="members-hero__intro">Some things deserve<br />a closer look.</p>
            <a className="members-link members-link--cream" href="#members-collection">Explore the preview <Arrow /></a>
            <div className="members-hero__note"><span className="members-hero__line" aria-hidden="true" /><p>A quieter expression of UndrSzn.<br />A first look, shared with you.</p></div>
          </div>
          <figure className="members-hero__portrait">
            <MembersImage image={getMemberImage("reading-room-ivory")} priority sizes="(max-width: 760px) 100vw, 57vw" />
            <figcaption><span>In the reading room</span><span>01 / 13</span></figcaption>
          </figure>
          <div className="members-hero__vertical" aria-hidden="true">Uncomfortable nights develop resilience</div>
        </div>
        <div className="members-hero__bottom"><span className="members-label">The Members Only collection</span><a href="#members-introduction" aria-label="Continue to the collection introduction">Scroll to discover <span aria-hidden="true">↓</span></a><span className="members-label">Preview edition</span></div>
      </section>

      <nav className="members-index" aria-label="Members Only chapters">
        <a href="#members-introduction"><span>01</span>The perspective</a>
        <a href="#members-knitwear"><span>02</span>The texture</a>
        <a href="#members-small-goods"><span>03</span>The details</a>
        <a href="#members-collection"><span>04</span>The full preview</a>
      </nav>

      <section id="members-introduction" className="members-intro members-paper" aria-labelledby="members-intro-title">
        <div className="members-intro__heading">
          <p className="members-label">01 / The perspective</p>
          <h2 id="members-intro-title">The same spirit.<br /><em>A different rhythm.</em></h2>
        </div>
        <div className="members-intro__text"><p>From the weight of a silhouette to the curve of a signature. A closer look at the ideas taking shape within UndrSzn.</p><p className="members-fine">Collection concepts shown for preview. Product details will be shared as they are confirmed.</p></div>
        <div className="members-editorial">
          <figure className="members-editorial__reading"><MembersImage image={getMemberImage("reading-room-noir")} sizes="(max-width: 760px) 92vw, 42vw" /><figcaption><span>The reading room</span><span>Noir / study 02</span></figcaption></figure>
          <div className="members-editorial__aside"><span className="members-label">Unhurried. Unmistakable.</span><p>Made of<br /><em>moments.</em></p><div className="members-editorial__portraits"><figure><MembersImage image={getMemberImage("ivory-portrait")} sizes="(max-width: 760px) 48vw, 24vw" /><figcaption>Another point of view.</figcaption></figure><figure><MembersImage image={getMemberImage("ivory-full-look")} sizes="(max-width: 760px) 34vw, 15vw" /><figcaption>The full silhouette.</figcaption></figure></div></div>
        </div>
      </section>

      <section id="members-knitwear" className="members-knitwear" aria-labelledby="members-knitwear-title">
        <div className="members-section-head"><p className="members-label">02 / The texture</p><h2 id="members-knitwear-title">Quietly<br /><em>distinct.</em></h2><p>Cable lines. Sculpted collars.<br />A signature worth a second look.</p></div>
        <div className="members-knitwear__pair"><figure><MembersImage image={getMemberImage("ivory-stripe-zip")} sizes="(max-width: 760px) 86vw, 40vw" /><figcaption><span>Ivory / stripe study</span><span>Collection preview</span></figcaption></figure><figure><MembersImage image={getMemberImage("midnight-cognac-zip")} sizes="(max-width: 760px) 86vw, 40vw" /><figcaption><span>Midnight / signature study</span><span>Collection preview</span></figcaption></figure></div>
        <a className="members-link members-link--cream" href="#members-collection">Discover every study <Arrow /></a>
      </section>

      <section id="members-small-goods" className="members-goods members-paper" aria-labelledby="members-goods-title">
        <div className="members-goods__copy"><p className="members-label">03 / The details</p><h2 id="members-goods-title">An impression.<br /><em>In the details.</em></h2><p>The curve of the monogram.<br />The richness of the colour.<br />Small forms with their own presence.</p><p className="members-fine">Explore the colour studies.</p><a className="members-link" href="#members-collection">View the full preview <Arrow /></a></div>
        <MembersGoods />
      </section>

      <section id="members-collection" className="members-collection members-paper" aria-labelledby="members-collection-title">
        <div className="members-collection__head"><div><p className="members-label">04 / The full preview</p><h2 id="members-collection-title">Take a <em>closer look.</em></h2></div><p>Thirteen frames from the collection.<br />Open a study and explore the details.</p></div>
        <MembersGallery />
      </section>

      <section className="members-invitation" aria-labelledby="members-invitation-title">
        <p className="members-label">The next chapter / UndrSzn</p>
        <h2 id="members-invitation-title">Stay <em>close.</em></h2>
        <p>For the next look, the next release,<br />and everything taking shape.</p>
        <a className="members-link members-link--cream" href="https://undrszn.com/">Join the SZN <Arrow diagonal /></a>
        <p className="members-invitation__fine">Continue to our main store for brand updates.</p>
        <div className="members-invitation__bottom"><span className="members-label">Uncomfortable nights develop resilience.</span><Link href="/collections/all">Explore the current collection <Arrow /></Link></div>
      </section>
    </article>
  );
}
