import type { Metadata } from "next";
import Link from "next/link";
import { FilmPlayer } from "@/components/film/FilmPlayer";
import { Media } from "@/components/Media";
import { Newsletter } from "@/components/Newsletter";
import { films } from "@/data/films";

export const metadata: Metadata = {
  title: "Our story",
  description: "Uncomfortable Nights Develop Resilience. The story behind UNDR.RATED.SZN.",
};

const chapters = [
  {
    n: "01",
    label: "How it began",
    meta: "Est. 2020",
    title: (
      <>
        Passion starts it.
        <br />
        Discipline builds it.
      </>
    ),
    body: [
      "The brand’s published story begins in 2020: hands-on making, direct connections with supporters, and the pull of creating something from the ground up.",
      "That story also describes the other side of building a brand: learning structure, accepting responsibility, and finding consistency without losing creative energy.",
    ],
  },
  {
    n: "02",
    label: "The meaning",
    meta: "U.N.D.R.",
    title: (
      <>
        Not a perfect beginning.
        <br />
        A commitment to growth.
      </>
    ),
    body: [
      "Uncomfortable Nights Develop Resilience. This is the meaning at the center of the name — the work nobody sees, and the decision to keep creating anyway.",
    ],
  },
];

export default function StoryPage() {
  return (
    <>
      <section className="editorial-hero editorial-hero--flip">
        <div className="editorial-hero__text">
          <span className="eyebrow eyebrow--red">The brand / UNDR.RATED.SZN</span>
          <h1 className="display h-xl">
            Built
            <br />
            through
            <br />
            the nights.
          </h1>
          <p>Uncomfortable Nights Develop Resilience. A message to carry. A reason to keep creating.</p>
          <Link className="link-arrow" href="/collections/all">
            Wear the message ↗
          </Link>
          <span className="caption-tag">Archive photography / previous brand pieces</span>
        </div>
        <Media id="brand-riders" ratio="auto" priority sizes="(max-width: 900px) 100vw, 56vw" width={1800} />
      </section>

      <div className="container">
        {chapters.map((c) => (
          <article className="chapter" key={c.n}>
            <div className="chapter__label">
              <span className="micro red-text">
                {c.n} / {c.label}
              </span>
              <span className="micro muted">{c.meta}</span>
            </div>
            <div className="chapter__body reveal">
              <h2 className="display h-lg">{c.title}</h2>
              {c.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="journey-band">
        <div className="container">
          <div className="journey-band__head">
            <div style={{ display: "grid", gap: 20 }}>
              <span className="eyebrow eyebrow--red">Chapter 03 / The film</span>
              <h2 className="display h-lg">See the whole journey.</h2>
            </div>
            <Link className="link-arrow" href="/pages/journey">
              Open the film page ↗
            </Link>
          </div>
          <FilmPlayer film={films.journey} />
        </div>
      </section>

      <section className="pullquote container">
        <q>
          Uncomfortable nights
          <br />
          <span className="outline-text">develop</span> resilience.
        </q>
        <cite className="micro muted">— The meaning behind U.N.D.R.</cite>
      </section>

      <section className="triptych">
        <Media id="film-interview" ratio="auto" sizes="(max-width: 900px) 50vw, 36vw" />
        <div className="triptych__text">
          <span className="eyebrow eyebrow--plain eyebrow--red">From the brand archive</span>
          <h2 className="display h-md">
            The people.
            <br />
            The process.
          </h2>
          <p>Original film stills from the brand archive.</p>
          <Link className="link-arrow" href="/pages/community">
            Be part of the next chapter ↗
          </Link>
        </div>
        <Media id="film-gallery" ratio="auto" sizes="(max-width: 900px) 50vw, 36vw" />
      </section>

      <Newsletter />
    </>
  );
}
