"use client";

import { useState } from "react";
import Link from "next/link";

const meanings = [
  {
    letter: "U",
    word: "Uncomfortable",
    line: "Uncomfortable is the part that makes you want to go back to what you already know.",
    paragraphs: [
      "It’s trying something before you feel ready. It’s being honest with yourself when the truth stings. It’s sitting with a feeling instead of covering it up or letting it push you into the same old habits.",
      "I’m not saying every hard thing is good for you. I’m saying discomfort can show you where you still have room to grow. When you face it and learn from it, you start becoming stronger than the version of you that always chose what felt easy.",
    ],
  },
  {
    letter: "N",
    word: "Nights",
    line: "Nights are the moments people don’t always see.",
    paragraphs: [
      "The quiet overthinking. The doubts. The times you’re trying to figure out your next move while everybody else thinks you’re fine. Those moments can feel lonely, but they can also make you look closer at yourself and what you really want.",
    ],
  },
  {
    letter: "D",
    word: "Develop",
    line: "You develop through what you do with what you go through.",
    paragraphs: [
      "You don’t change all at once. You learn, make mistakes, try again, and start making different choices. Every time you keep showing up, you’re building something in yourself—even when the progress feels slow.",
    ],
  },
  {
    letter: "R",
    word: "Resilience",
    line: "Resilience is getting back up with more understanding than you had before.",
    paragraphs: [
      "It doesn’t mean nothing hurts you. It means what you’ve been through doesn’t get to decide everything about who you become. You keep moving, keep learning, and keep finding your way forward.",
    ],
  },
];

export function BrandMeanings() {
  const [selected, setSelected] = useState<number | null>(null);
  const meaning = selected === null ? null : meanings[selected];
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
        {meaning && (
          <div className="container">
            <span className="eyebrow">{meaning.word}</span>
            <h3>{meaning.line}</h3>
            {meaning.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <Link className="link-arrow" href="/pages/about-undr-rated-szn">Explore our story ↗</Link>
          </div>
        )}
      </div>
    </section>
  );
}
