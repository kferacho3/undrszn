import type { Metadata } from "next";
import Link from "next/link";
import { FilmPlayer } from "@/components/film/FilmPlayer";
import { Newsletter } from "@/components/Newsletter";
import { ProductShowcase } from "@/components/ProductShowcase";
import { SectionHead } from "@/components/ui";
import { films } from "@/data/films";

export const metadata: Metadata = {
  title: "The Journey — a film",
  description: "The Journey: the product, the brand and the vision of UNDR.RATED.SZN, told in six minutes.",
};

const pillars = [
  {
    n: "01",
    title: "The product",
    body: "How the Dirty Rodman pieces were made: the artwork, the colorways, and the detail that carries through to the back.",
  },
  {
    n: "02",
    title: "The brand",
    body: "Where UNDR.RATED.SZN comes from, and what Uncomfortable Nights Develop Resilience means to the people building it.",
  },
  {
    n: "03",
    title: "The vision",
    body: "What comes after one last dance: the community, the collaborators and the next chapters of the brand.",
  },
];

export default function JourneyPage() {
  const journey = films.journey;
  return (
    <>
      <section className="container journey-hero">
        <span className="eyebrow eyebrow--red">
          {journey.kicker} · {journey.durationLabel}
        </span>
        <h1 className="display journey-hero__title">
          The <span className="outline-text">Journey</span>
          <span className="red-text">.</span>
        </h1>
        <div className="journey-hero__row">
          <p>{journey.description}</p>
          <Link className="btn btn--red" href="/collections/all">
            Shop the collection <span className="arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: "clamp(64px, 9vw, 144px)" }} aria-label="The Journey film">
        <FilmPlayer film={journey} showChapters priority />
      </section>

      <section className="roles" aria-label="What the film covers" style={{ borderTop: "1px solid var(--rule)" }}>
        {pillars.map((p) => (
          <article className="role reveal" key={p.n} style={{ minHeight: 0 }}>
            <span className="micro red-text">{p.n}</span>
            <h2>{p.title}</h2>
            <p>{p.body}</p>
          </article>
        ))}
        <article className="role reveal" style={{ minHeight: 0 }}>
          <span className="micro red-text">04</span>
          <h2>Your part</h2>
          <p>Ambassadors, models, sales and creators: the next chapter is open to the people who connect with the message.</p>
          <Link className="link-arrow" href="/pages/community">
            Join the SZN ↗
          </Link>
        </article>
      </section>

      <section className="container section">
        <SectionHead kicker="More from the shoot" title="Companion films.">
          <Link className="link-arrow" href="/pages/behind-the-scenes-dirty-rodman">
            Inside the campaign ↗
          </Link>
        </SectionHead>
        <div className="film-grid">
          {[films["campaign-cut"], films["bts-reel"], films.interview].map((film) => (
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
        <ProductShowcase kicker="Wear the journey" title="The pieces in the film." />
      </section>

      <Newsletter />
    </>
  );
}
