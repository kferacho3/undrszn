"use client";

import { useState } from "react";
import Link from "next/link";

const meanings = [
  { letter: "U", word: "Uncomfortable", line: "Growth begins outside the familiar.", body: "The growing pains. The first attempt. The decision to create before everything feels ready." },
  { letter: "N", word: "Nights", line: "The work nobody sees.", body: "The quiet hours spent making, learning and finding a way forward. Every piece carries that process." },
  { letter: "D", word: "Develop", line: "Keep creating. Keep becoming.", body: "An idea takes shape through practice, patience and the willingness to try again." },
  { letter: "R", word: "Resilience", line: "A reason to keep going.", body: "Carry the lessons with you. Uncomfortable Nights Develop Resilience — the meaning at the center of UNDR." },
];

export function BrandMeanings() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section className="brand-meanings" aria-label="What U.N.D.R. stands for">
      <div className="brand-meanings__intro"><span className="micro">Behind the letters</span><span>Choose a letter. Discover the meaning.</span></div>
      <div className="acronym">
        {meanings.map((item, index) => (
          <button className="acronym__cell" key={item.letter} aria-expanded={selected === index} aria-controls="brand-meaning" onClick={() => setSelected(selected === index ? null : index)}>
            <span className="micro acronym__index">0{index + 1} / {selected === index ? "−" : "+"}</span>
            <span className="acronym__letter" aria-hidden="true">{item.letter}</span>
            <span className="acronym__word">{item.word}</span>
          </button>
        ))}
      </div>
      <div id="brand-meaning" className="brand-meanings__detail" hidden={selected === null} aria-live="polite">
        {selected !== null && <div className="container"><span className="eyebrow">{meanings[selected].word}</span><h3>{meanings[selected].line}</h3><p>{meanings[selected].body}</p><Link className="link-arrow" href="/pages/about-undr-rated-szn">Explore our story ↗</Link></div>}
      </div>
    </section>
  );
}
