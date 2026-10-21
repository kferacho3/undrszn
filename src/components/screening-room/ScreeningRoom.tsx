"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { films } from "@/data/films";

/** The film remains a real, accessible video if WebGL is unavailable. */
export function ScreeningRoom() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const id = useId();
  const [immersive, setImmersive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [view, setView] = useState("room");
  const [failed, setFailed] = useState(false);
  const film = films["ambient-loop"];

  useEffect(() => {
    const el = root.current;
    const surface = canvas.current;
    const movie = video.current;
    if (!el || !surface || !movie) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    let visible = false;
    let pausedByUser = motion.matches || !!saveData;
    let interrupted = false;
    const update = () => {
      if (visible && !document.hidden && !pausedByUser && !interrupted) void movie.play().catch(() => undefined);
      else movie.pause();
    };
    const onPause = () => setPlaying(false);
    const onPlay = () => {
      setPlaying(true);
      window.dispatchEvent(new CustomEvent("undr:film-play", { detail: id }));
    };
    const otherPlay = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== id) { interrupted = true; movie.pause(); }
    };
    const onControl = (event: Event) => {
      pausedByUser = !(event as CustomEvent<boolean>).detail;
      interrupted = false;
      update();
    };
    const onMotion = () => { if (motion.matches) { pausedByUser = true; update(); } };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) { interrupted = false; setMuted(true); }
      update();
    }, { threshold: .12 });
    observer.observe(el);
    movie.addEventListener("playing", onPlay);
    movie.addEventListener("pause", onPause);
    el.addEventListener("screening:play", onControl);
    window.addEventListener("undr:film-play", otherPlay);
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", onMotion);

    // Save-Data devices retain the regular poster/player without downloading the scene.
    if (!saveData) {
      void import("./scene").then(async ({ createScreeningRoom }) => {
        if (cancelled) return;
        dispose = await createScreeningRoom(surface, movie, () => {
          if (!cancelled) setImmersive(true);
        }, () => { if (!cancelled) setImmersive(false); }, selected => { if (!cancelled) setView(selected); });
        if (cancelled) dispose();
      }).catch(() => { if (!cancelled) setImmersive(false); });
    }
    return () => {
      cancelled = true;
      dispose?.();
      observer.disconnect();
      movie.pause();
      movie.removeEventListener("playing", onPlay);
      movie.removeEventListener("pause", onPause);
      el.removeEventListener("screening:play", onControl);
      window.removeEventListener("undr:film-play", otherPlay);
      document.removeEventListener("visibilitychange", update);
      motion.removeEventListener("change", onMotion);
    };
  }, [id]);

  return (
    <section ref={root} className="screening-room" data-immersive={immersive} aria-labelledby="opening-title">
      <div className="screening-room__film">
        <video ref={video} muted={muted} loop playsInline preload="none" poster={film.posterSrc} aria-label="Dirty Rodman campaign film" onError={() => setFailed(true)}>
          {film.sources.map(source => <source key={source.src} src={source.src} type={source.type} />)}
        </video>
      </div>
      <canvas ref={canvas} className="screening-room__canvas" aria-hidden={!immersive} tabIndex={immersive ? 0 : -1} role="group" aria-label="Interactive monkey and portrait cinema. Drag to look around. Press Enter to greet the monkey, 1 for the room, 2 for the monkey, 3 for the film, or Escape to reset." onKeyDown={event => {
        if (event.key === "Enter") { event.preventDefault(); canvas.current?.dispatchEvent(new Event("screening:react")); }
        const next = ({ "1": "room", "2": "monkey", "3": "film", Escape: "room" } as Record<string, string>)[event.key];
        if (next) { event.preventDefault(); canvas.current?.dispatchEvent(new CustomEvent("screening:view", { detail: next })); }
      }} />
      <div className="screening-room__top">
        <nav aria-label="Explore UNDR" className="screening-room__links">
          <Link className="bubble-link" href="/products/dirty-rodman-hoodie">Dirty Rodman <span aria-hidden="true">↗</span></Link>
          <Link className="bubble-link" href="/pages/content-creator-application">Get featured <span aria-hidden="true">↗</span></Link>
          <Link className="bubble-link" href="/pages/about-undr-rated-szn">Our story <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
      <div className="screening-room__bottom">
        <h1 id="opening-title" className="sr-only">The Dirty Rodman Collection — UNDR.RATED.SZN</h1>
        <div className="screening-room__watch">
          {immersive && view !== "room" && <button className="bubble-link" onClick={() => canvas.current?.dispatchEvent(new CustomEvent("screening:view", { detail: "room" }))}>Back to room <span aria-hidden="true">↶</span></button>}
          {failed ? <p>Film unavailable. <Link href="/pages/behind-the-scenes-dirty-rodman">Explore the campaign ↗</Link></p> : <div className="screening-room__controls">
            <button className="bubble-link" onClick={() => root.current?.dispatchEvent(new CustomEvent("screening:play", { detail: !playing }))} aria-label={playing ? "Pause screening room" : "Play screening room"}>{playing ? "Pause" : "Play"} <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span></button>
            <button className="bubble-link" onClick={() => setMuted(!muted)} aria-pressed={!muted}>{muted ? "Sound off" : "Sound on"}</button>
          </div>}
        </div>
        <a className="screening-room__scroll" href="#the-collection">The story continues <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
