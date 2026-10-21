import Link from "next/link";
import { AmbientLoop } from "@/components/film/AmbientLoop";
import { HoverFilmCard } from "@/components/film/HoverFilmCard";
import { FilmPlayer } from "@/components/film/FilmPlayer";
import { Media } from "@/components/Media";
import { Newsletter } from "@/components/Newsletter";
import { ProductShowcase } from "@/components/ProductShowcase";
import { formatMoney, products } from "@/data/catalog";
import { films } from "@/data/films";

const acronym = [
  ["U", "Uncomfortable"],
  ["N", "Nights"],
  ["D", "Develop"],
  ["R", "Resilience"],
] as const;

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
      {/* The Shopify opening: film first, with clear navigation over the footage. */}
      <section className="opening-film" aria-labelledby="opening-title">
        <AmbientLoop film={films["ambient-loop"]} priority sizes="100vw" focus="50% 20%" />
        <div className="opening-film__overlay">
          <nav className="opening-film__links" aria-label="Explore UNDR">
            <Link className="bubble-link" href="/products/dirty-rodman-hoodie">Dirty Rodman <span aria-hidden="true">↗</span></Link>
            <Link className="bubble-link" href="/pages/content-creator-application">Get featured <span aria-hidden="true">↗</span></Link>
            <Link className="bubble-link" href="/pages/about-undr-rated-szn">Our story <span aria-hidden="true">↗</span></Link>
          </nav>
          <div className="opening-film__copy">
            <span className="micro">UNDR.RATED.SZN / Remain authentic.</span>
            <h1 id="opening-title">One last dance<br />with Dirty Rodman.</h1>
            <a className="opening-film__scroll" href="#the-collection">Meet the collection <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      {/* Scroll from the moving campaign into the two original portraits. */}
      <section id="the-collection" className="hero" aria-labelledby="hero-title">
        <div className="hero__visual">
          <Media id="black-portrait" ratio="auto" sizes="50vw" width={1800} focus="50% 25%" />
          <Media id="cream-hood" ratio="auto" sizes="50vw" width={1800} focus="50% 25%" />
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
          <h2 id="hero-title" className="display hero__title">
            Two sides. <span className="outline-text">One SZN</span>
            <span className="red-text">.</span>
          </h2>
          <div className="hero__row">
            <p className="hero__sub">Two expressions. One unmistakable graphic. Find the one that feels like you.</p>
            <div className="hero__actions">
              <Link className="bubble-link" href="/collections/all">
                Shop the collection <span className="arrow" aria-hidden="true">↗</span>
              </Link>
              <Link className="bubble-link" href="/pages/journey">
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

      {/* The original Shopify story film follows the two portraits. */}
      <section id="the-story-film" className="journey-band" aria-labelledby="journey-title">
        <div className="container">
          <div className="journey-band__head">
            <div style={{ display: "grid", gap: 20 }}>
              <span className="eyebrow eyebrow--red">
                A film · {journey.durationLabel}
              </span>
              <h2 id="journey-title" className="display h-xl">
                The <span className="outline-text">Journey.</span>
              </h2>
            </div>
            <div style={{ display: "grid", gap: 20, justifyItems: "start" }}>
              <p>{journey.description}</p>
              <Link className="link-arrow" href="/pages/journey">
                Open the film page ↗
              </Link>
            </div>
          </div>
          <div className="reveal">
            <FilmPlayer film={journey} showChapters />
          </div>
        </div>
      </section>

      {/* 02 — The name, decoded */}
      <section className="acronym" aria-label="What U.N.D.R. stands for">
        {acronym.map(([letter, word], i) => (
          <div className="acronym__cell reveal" key={letter} style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}>
            <span className="micro acronym__index">0{i + 1}</span>
            <span className="acronym__letter" aria-hidden="true">
              {letter}
            </span>
            <span className="acronym__word">{word}</span>
          </div>
        ))}
      </section>

      {/* 03 — Merchandise first */}
      <section className="container section">
        <ProductShowcase kicker="The collection / 01—02" title="Choose your side." />
      </section>

      <section className="container section campaign-shorts" aria-labelledby="campaign-shorts-title">
        <div className="campaign-shorts__copy">
          <span className="eyebrow eyebrow--red">Dirty Rodman / In motion</span>
          <h2 id="campaign-shorts-title" className="display h-lg">
            Off the<br />hanger.<br /><span className="outline-text">Into the street.</span>
          </h2>
          <p>Two short scenes. One unmistakable graphic. Watch the Dirty Rodman collection come to life.</p>
          <Link className="link-arrow" href="/pages/behind-the-scenes-dirty-rodman">
            Explore the campaign ↗
          </Link>
        </div>
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
