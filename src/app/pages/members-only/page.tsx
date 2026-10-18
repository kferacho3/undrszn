import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { MembersRunway } from "@/components/members/MembersRunway";
import { MembersGallery } from "@/components/members/MembersGallery";
import { MembersGoods } from "@/components/members/MembersGoods";
import { MembersStudy } from "@/components/members/MembersStudy";
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

export default function MembersOnlyPage() {
  return (
    <article className={`members ${cormorant.variable}`}>
      <MembersRunway />

      <section id="members-knitwear" className="members-knitwear" aria-labelledby="members-knitwear-title">
        <div className="members-section-head">
          <span className="members-label">01 / Knitwear</span>
          <h2 id="members-knitwear-title">A feeling.<br /><em>In every thread.</em></h2>
          <p>Follow the cable lines. Notice the contrast.<br />Get closer to the pieces behind the look.</p>
        </div>
        <div className="members-knitwear__pair">
          <figure><MembersStudy image={getMemberImage("ivory-stripe-zip")} sizes="(max-width: 760px) 90vw, 42vw" /><figcaption><span>01 — Ivory / striped zip</span><span>Knitwear study</span></figcaption></figure>
          <figure><MembersStudy image={getMemberImage("midnight-cognac-zip")} sizes="(max-width: 760px) 90vw, 42vw" /><figcaption><span>02 — Midnight / cognac signature</span><span>Knitwear study</span></figcaption></figure>
        </div>
        <a className="members-link" href="#members-collection">Explore all five knits <span aria-hidden="true">↗</span></a>
      </section>

      <section className="members-interlude" aria-label="The collection in frame">
        <div className="members-interlude__portrait"><MembersStudy image={getMemberImage("reading-room-noir")} sizes="(max-width: 760px) 100vw, 50vw" /></div>
        <div className="members-interlude__copy"><span className="members-label">The UNDR point of view</span><h2>Wear your<br /><em>own rhythm.</em></h2><p>From the first impression<br />to the smallest detail.</p><Link className="members-link members-link--cream" href="/collections/all">Shop current releases <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section id="members-small-goods" className="members-goods members-paper" aria-labelledby="members-goods-title">
        <div className="members-goods__copy"><span className="members-label">02 / Small goods</span><h2 id="members-goods-title">Leave an<br /><em>impression.</em></h2><p>A signature in the palm of your hand.<br />Explore cognac, ivory, and scarlet.</p><span className="members-fine">Select a colour. Open it for a closer look.</span></div>
        <MembersGoods />
      </section>

      <section id="members-collection" className="members-collection members-paper" aria-labelledby="members-collection-title">
        <div className="members-collection__head"><div><span className="members-label">03 / The complete edit</span><h2 id="members-collection-title">Find your <em>expression.</em></h2></div><p>13 collection studies. Every angle, at your pace.<br /><span className="members-fine">Concept preview. Availability and product details to follow.</span></p></div>
        <MembersGallery />
      </section>

      <section className="members-invitation" aria-labelledby="members-invitation-title">
        <span className="members-label">The next chapter is taking shape.</span>
        <h2 id="members-invitation-title">Until then,<br /><em>make it yours.</em></h2>
        <Link className="members-link members-link--cream" href="/collections/all">Shop the current collection <span aria-hidden="true">↗</span></Link>
        <div className="members-invitation__bottom"><span>UNDR.RATED.SZN</span><a href="https://undrszn.com/">Visit the main store ↗</a></div>
      </section>
    </article>
  );
}
