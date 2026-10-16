import type { Metadata } from "next";
import Link from "next/link";
import { FilmPlayer } from "@/components/film/FilmPlayer";
import { Media } from "@/components/Media";
import { Newsletter } from "@/components/Newsletter";
import { ProductShowcase } from "@/components/ProductShowcase";
import { SectionHead } from "@/components/ui";
import { films } from "@/data/films";

export const metadata: Metadata = {
  title: "The campaign — Behind the last dance",
  description: "Behind the Dirty Rodman campaign: the clothes, the people, and the work behind the frames.",
};

export default function CampaignPage() {
  return (
    <>
      <section className="editorial-hero">
        <div className="editorial-hero__text">
          <span className="eyebrow eyebrow--red">The campaign / Dirty Rodman</span>
          <h1 className="display h-xl">
            Behind
            <br />
            the last
            <br />
            <span className="outline-text">dance.</span>
          </h1>
          <p>The frames between the final frames. A closer look at the clothes, the people, and the work behind the campaign.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn btn--red" href="/collections/all">
              Shop the collection <span className="arrow" aria-hidden="true">↗</span>
            </Link>
            <a className="btn" href="#campaign-films">
              Watch the films
            </a>
          </div>
          <dl className="credits">
            <dt>Photography</dt>
            <dd>DMOSE (credit on the live page)</dd>
            <dt>Shoot date</dt>
            <dd>September 27, 2026</dd>
          </dl>
        </div>
        <Media id="campus-celebration" className="campaign-artwork" ratio="950 / 1655" priority sizes="(max-width: 900px) 100vw, 56vw" width={950} />
      </section>

      <section className="container section" id="campaign-films">
        <SectionHead kicker="Campaign films" title="Roll the tape.">
          <p>Two short films from the Dirty Rodman shoot. Sound on, one at a time.</p>
        </SectionHead>
        <div className="film-grid">
          {[films["campaign-cut"], films["bts-reel"]].map((film) => (
            <article key={film.id} className="reveal" style={{ display: "grid", gap: 16 }}>
              <FilmPlayer film={film} variant="card" showMeta={false} />
              <span className="eyebrow eyebrow--red">
                {film.kicker} · {film.durationLabel}
              </span>
              <h3 className="film-card__title">{film.title}</h3>
              <p className="film-card__desc">{film.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section section--rule">
        <SectionHead kicker="On set" title="Before the frame.">
          <p>Studio details and campaign photographs, without losing sight of the pieces.</p>
        </SectionHead>
        <div className="product-grid">
          <figure className="reveal">
            <Link className="zoomable" href="/products/dirty-rodman-hoodie" style={{ display: "block" }}>
              <Media id="bts-black" ratio="4 / 5" />
            </Link>
            <figcaption className="caption-tag" style={{ marginTop: 12, display: "block" }}>
              Black / Original — shop this piece ↗
            </figcaption>
          </figure>
          <figure className="reveal" style={{ "--delay": "90ms" } as React.CSSProperties}>
            <Link className="zoomable" href="/products/deluxe-dirty-rodamn" style={{ display: "block" }}>
              <Media id="bts-pair" ratio="4 / 5" />
            </Link>
            <figcaption className="caption-tag" style={{ marginTop: 12, display: "block" }}>
              Black & Cream — the original studio frame ↗
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="triptych">
        <Media id="cream-back-detail" ratio="auto" sizes="(max-width: 900px) 50vw, 36vw" />
        <div className="triptych__text reveal">
          <span className="eyebrow eyebrow--plain eyebrow--red">Front. Back. Every angle.</span>
          <h2 className="display h-lg">
            Nothing
            <br />
            to hide.
          </h2>
          <p>See the full set of product photographs and campaign frames.</p>
          <Link className="link-arrow" href="/pages/lookbook">
            Open the contact sheet ↗
          </Link>
        </div>
        <Media id="bts-campaign" ratio="auto" sizes="(max-width: 900px) 50vw, 36vw" />
      </section>

      <section className="container section">
        <ProductShowcase kicker="Take it off the set" title="Make the look yours." />
      </section>

      <Newsletter />
    </>
  );
}
