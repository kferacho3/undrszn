import Link from "next/link";
import localFont from "next/font/local";
import { BrandMeanings } from "@/components/BrandMeanings";
import { AmbientLoop } from "@/components/film/AmbientLoop";
import { HoverFilmCard } from "@/components/film/HoverFilmCard";
import { FilmPlayer } from "@/components/film/FilmPlayer";
import { Media } from "@/components/Media";
import { Newsletter } from "@/components/Newsletter";
import { ProductShowcase } from "@/components/ProductShowcase";
import { formatMoney, products } from "@/data/catalog";
import { films } from "@/data/films";

const openingFont = localFont({
  src: "../../node_modules/@fontsource/assistant/files/assistant-latin-400-normal.woff2",
  weight: "400",
});

const frames = [
  { id: "cream-full-look", href: "/products/deluxe-dirty-rodamn", caption: "Cream / Deluxe — full look" },
  { id: "black-full-look", href: "/products/dirty-rodman-hoodie", caption: "Black / Original — full look" },
  { id: "bts-pair", href: "/pages/behind-the-scenes-dirty-rodman", caption: "Both expressions — on set" },
  { id: "cream-side", href: "/products/deluxe-dirty-rodamn", caption: "Cream / Deluxe — chest art" },
];

export default function HomePage() {
  const journey = films.journey;
  return (
    <>
      {/* 01 — Opening: two expressions, one decision */}
      <section id="the-collection" className="hero" aria-labelledby="hero-title">
        <div className="hero__visual">
          <Media id="black-portrait" ratio="auto" priority sizes="50vw" width={1800} focus="50% 25%" />
          <Media id="cream-hood" ratio="auto" priority sizes="50vw" width={1800} focus="50% 25%" />
        </div>
        <span className="hero__tag hero__tag--l">
          01 / Black
          <br />
          Dirty Rodman
        </span>
        <span className="hero__tag hero__tag--r">
          02 / Cream
          <br />
          Deluxe edition
        </span>
        <div className="container hero__content">
          <span className="eyebrow eyebrow--red">The Dirty Rodman Collection</span>
          <h1 id="hero-title" className="display hero__title">
            One last <span className="outline-text">dance</span>
            <span className="red-text">.</span>
          </h1>
          <div className="hero__row">
            <p className="hero__sub">Two expressions. One unmistakable graphic. Find the one that feels like you.</p>
            <div className="hero__actions">
              <Link className="btn btn--red" href="/collections/all">
                Shop the collection <span className="arrow" aria-hidden="true">↗</span>
              </Link>
              <Link className="btn" href="/pages/journey">
                Watch the Journey <span className="arrow" aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <div className="hero__meta">
            <span>UNDR.RATED.SZN / Remain authentic.</span>
            <span>{products.map((p) => `${p.color} ${formatMoney(p.price)}`).join(" · ")}</span>
          </div>
        </div>
      </section>

      {/* The original Shopify film and its three navigation buttons. */}
      <section className={`opening-film ${openingFont.className}`} aria-labelledby="opening-title">
        <AmbientLoop film={films["ambient-loop"]} sizes="100vw" focus="50% 20%" />
        <div className="opening-film__overlay">
          <nav className="opening-film__links" aria-label="Explore UNDR">
            <Link href="/products/dirty-rodman-hoodie">Dirty Rodman</Link>
            <Link href="/pages/content-creator-application">Get featured</Link>
            <Link href="/pages/about-undr-rated-szn">Our story</Link>
          </nav>
          <h2 id="opening-title">One last dance with Dirty Rodman</h2>
        </div>
      </section>

      {/* The Journey follows the campaign film. */}
      <section id="the-story-film" className="journey-band" aria-label={journey.title}>
        <div className="container">
          <div className="reveal">
            <FilmPlayer film={journey} showChapters />
          </div>
        </div>
      </section>

      {/* 02 — The name, decoded */}
      <BrandMeanings />

      {/* 03 — Merchandise first */}
      <section className="container section">
        <ProductShowcase kicker="The collection / 01—02" title="Choose your side." />
      </section>

      <section className="container section section--rule" aria-labelledby="giveback-title">
        <div className="split giveback">
          <Media id="bahamas-giveback" ratio="1290 / 1575" sizes="(max-width: 860px) 92vw, (max-width: 1350px) 44vw, 560px" />
          <div className="split__copy">
            <span className="eyebrow eyebrow--red">Beyond the drop</span>
            <h2 id="giveback-title" className="display h-lg">Can carry more.</h2>
            <p>When we were in the Bahamas, we shared UNDR pieces with young people in the community. It reminded us that this brand should reach beyond what we wear—it should be about showing up, sharing what we create, and helping somebody feel seen.</p>
            <p>Every purchase helps UNDR.RATED.SZN keep growing.</p>
            <div className="giveback__links">
              <Link className="btn btn--red" href="/collections/all">Shop the collection</Link>
              <button className="btn giveback__pending" type="button" disabled>
                Support the next giveback
                <span className="micro">Coming soon</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container section campaign-shorts" aria-label="Dirty Rodman campaign films">
        {[films["bts-reel"], films["campaign-cut"]].map((film, index) => (
          <article className="campaign-shorts__film" key={film.id}>
            <HoverFilmCard film={film} previewSrc={film.id === "campaign-cut" ? "/videos/portrait-02-loop.mp4" : "/videos/portrait-01-loop.mp4"} />
            <div className="campaign-shorts__caption">
              <h3 className="film-card__title">{film.id === "campaign-cut" ? "The Street" : "The Ride"}</h3>
              <span className="micro">0{index + 1} / {film.durationLabel}</span>
            </div>
          </article>
        ))}
      </section>

      {/* 04 — The back tells the rest */}
      <section className="triptych">
        <Media id="cream-back-campaign" ratio="auto" sizes="(max-width: 900px) 50vw, 36vw" />
        <div className="triptych__text reveal">
          <span className="eyebrow eyebrow--plain eyebrow--red">More than the front</span>
          <h2 className="display h-lg">
            Art you
            <br />
            live in.
          </h2>
          <p>The graphic starts the conversation. The message on the back stays with you.</p>
          <Link className="link-arrow" href="/products/deluxe-dirty-rodamn">
            Explore the Cream Deluxe ↗
          </Link>
        </div>
        <Media id="black-seated" ratio="auto" sizes="(max-width: 900px) 50vw, 36vw" />
      </section>

      {/* 06 — Story teaser with archive imagery */}
      <section className="container section">
        <div className="split">
          <Link className="zoomable" href="/pages/about-undr-rated-szn" aria-label="Read our story">
            <Media id="brand-riders" ratio="5 / 4" />
          </Link>
          <div className="split__copy reveal">
            <span className="eyebrow eyebrow--red">The story behind the letters</span>
            <h2 className="display h-lg">
              Built through
              <br />
              the nights.
            </h2>
            <p>
              U.N.D.R. stands for Uncomfortable Nights Develop Resilience. A name for the work, the growing pains, and the decision to
              keep creating.
            </p>
            <Link className="link-arrow" href="/pages/about-undr-rated-szn">
              Meet UNDR.RATED.SZN ↗
            </Link>
            <span className="caption-tag">Archive image / previous brand pieces — not part of the current collection</span>
          </div>
        </div>
      </section>

      {/* 07 — Shoppable styling edit */}
      <section className="container section section--rule">
        <div className="section-head">
          <div>
            <span className="eyebrow eyebrow--red">In front of the lens</span>
            <h2 className="display h-lg">Your way to wear it.</h2>
          </div>
          <Link className="link-arrow" href="/pages/lookbook">
            Open the lookbook ↗
          </Link>
        </div>
        <div className="frames">
          {frames.map((f, i) => (
            <figure key={f.id} className="reveal" style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
              <Link className="zoomable" href={f.href} style={{ display: "block" }}>
                <Media id={f.id} ratio="3 / 4" sizes="(max-width: 760px) 48vw, 24vw" />
              </Link>
              <figcaption className="caption-tag">
                Frame {String(i + 1).padStart(2, "0")} / {f.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
