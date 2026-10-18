"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { getMemberImage } from "@/data/members";
import { MembersImage } from "./MembersImage";
import { MembersViewer } from "./MembersViewer";

// Alternating portraits and garments connects the look to the actual piece.
const selection = ["reading-room-ivory", "ivory-stripe-zip", "reading-room-noir", "midnight-cognac-zip", "ivory-portrait", "ivory-ribbed-zip", "cognac-wallet"];
const images = selection.map(getMemberImage);
const pairings = ["ivory-stripe-zip", "reading-room-ivory", "midnight-cognac-zip", "reading-room-noir", "ivory-ribbed-zip", "ivory-portrait", "ivory-wallet"].map(getMemberImage);

export function MembersRunway() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [motion, setMotion] = useState(true);
  const [viewer, setViewer] = useState<{ index: number; opener: HTMLButtonElement } | null>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 760px) and (max-height: 650px)");
    let cleanup = () => {};
    function setup() {
      cleanup();
      if (!motion || reduced.matches || compact.matches) { section!.dataset.motion = "off"; return; }
      let disposed = false;
      let raf = 0;
      let current = 0;
      let target = 0;
      let lastTime = 0;
      let visible = true;
      function measure() {
        const rect = section!.getBoundingClientRect();
        const sticky = section!.querySelector<HTMLElement>(".members-runway__stage")!;
        const top = parseFloat(getComputedStyle(sticky).top) || 0;
        const travel = Math.max(1, section!.offsetHeight - sticky.offsetHeight);
        target = Math.max(0, Math.min(1, (top - rect.top) / travel));
        visible = rect.bottom > top && rect.top < window.innerHeight;
      }
      function frame(time: number) {
        raf = 0;
        if (disposed || document.hidden || !visible) return;
        const dt = Math.min(50, time - (lastTime || time - 16));
        lastTime = time;
        const delta = target - current;
        current += delta * (1 - Math.exp(-dt / 105));
        section!.style.setProperty("--runway-position", String(current * (images.length - 1)));
        section!.style.setProperty("--runway-progress", String(current));
        setActive(Math.round(current * (images.length - 1)));
        if (Math.abs(delta) > .0001) raf = requestAnimationFrame(frame);
      }
      function update() { measure(); if (!raf && !document.hidden && visible) raf = requestAnimationFrame(frame); }
      section!.dataset.motion = "on";
      measure(); current = target; update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      document.addEventListener("visibilitychange", update);
      const resize = new ResizeObserver(update);
      resize.observe(section!);
      cleanup = () => {
        disposed = true; cancelAnimationFrame(raf); resize.disconnect();
        window.removeEventListener("scroll", update); window.removeEventListener("resize", update);
        document.removeEventListener("visibilitychange", update);
      };
    }
    setup(); reduced.addEventListener("change", setup); compact.addEventListener("change", setup);
    return () => { cleanup(); reduced.removeEventListener("change", setup); compact.removeEventListener("change", setup); };
  }, [motion]);

  function select(index: number) {
    const section = root.current;
    if (!section) return;
    if (section.dataset.motion !== "on") { setActive(index); return; }
    const stage = section.querySelector<HTMLElement>(".members-runway__stage")!;
    const top = parseFloat(getComputedStyle(stage).top) || 0;
    window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top - top + index / (images.length - 1) * (section.offsetHeight - stage.offsetHeight), behavior: "smooth" });
  }

  return (
    <section className="members-runway" ref={root} aria-labelledby="members-title">
      <div className="members-runway__stage">
        <div className="members-runway__folio"><span>UNDR / Collection studies</span><a href="#members-collection">View all studies ↗</a></div>
        <div className="members-runway__copy">
          <h1 id="members-title">Members <em>only.</em></h1>
          <a className="members-link" href="#members-knitwear">Discover the collection <span aria-hidden="true">↓</span></a>
        </div>
        <div className="members-runway__visual">
          <div className="members-runway__fallback"><MembersImage image={images[active]} priority sizes="(max-width: 760px) 90vw, 50vw" /></div>
          <div className="members-runway__lanes" aria-hidden="true">
            {[images, pairings].map((lane, laneIndex) => <div className={`members-runway__lane members-runway__lane--${laneIndex}`} key={laneIndex}>
              {lane.map((image, index) => <div className="members-runway__frame" key={`${image.id}-${index}`} style={{ "--order": index } as CSSProperties}>
                <MembersImage image={image} priority={index === 0} sizes="(max-width: 760px) 90vw, 45vw" />
              </div>)}
            </div>)}
          </div>
        </div>
        <div className="members-runway__bottom">
          <div className="members-runway__instructions"><span className="members-label">Scroll to explore ↓</span><button type="button" aria-pressed={!motion} onClick={() => {
            const section = root.current;
            if (section) window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top - (parseFloat(getComputedStyle(section.querySelector(".members-runway__stage")!).top) || 0), behavior: "instant" });
            setMotion(value => !value);
          }}>{motion ? "Still view" : "Motion view"}</button></div>
          <div className="members-runway__selection">
            <span className="members-runway__number">0{active + 1}<small> / 07</small></span>
            <button className="members-runway__inspect" type="button" aria-haspopup="dialog" onClick={event => setViewer({ index: active, opener: event.currentTarget })}><span>{images[active].title}<small>Inspect this piece</small></span><span aria-hidden="true">↗</span></button>
          </div>
          <div className="members-runway__steps" role="group" aria-label="Featured collection studies">{images.map((image, index) => <button type="button" key={image.id} aria-label={`Show ${image.title}`} aria-pressed={active === index} onClick={() => select(index)}><span /></button>)}</div>
        </div>
        <div className="members-runway__progress" aria-hidden="true" />
      </div>
      {viewer && <MembersViewer images={images} initialIndex={viewer.index} returnFocusTo={viewer.opener} onClose={() => setViewer(null)} />}
    </section>
  );
}
