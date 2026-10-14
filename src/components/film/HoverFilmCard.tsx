"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Film } from "@/data/films";
import { FilmPlayer } from "./FilmPlayer";

/** Lightweight silent preview; clicking retains the full accessible film player. */
export function HoverFilmCard({ film, previewSrc }: { film: Film; previewSrc: string }) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const video = preview.current;
    if (!video) return;
    if (hovered && !activated) {
      void video.play().catch(() => setPlaying(false));
    } else video.pause();
    return () => video.pause();
  }, [hovered, loaded, activated]);

  useEffect(() => {
    const stop = () => {
      preview.current?.pause();
      setHovered(false);
    };
    const onOtherPlay = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== id) stop();
    };
    const onVisibility = () => { if (document.hidden) stop(); };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => { if (reduce.matches) stop(); };
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) stop(); });
    if (root.current) observer.observe(root.current);
    window.addEventListener("undr:film-play", onOtherPlay);
    document.addEventListener("visibilitychange", onVisibility);
    reduce.addEventListener("change", onMotion);
    return () => {
      observer.disconnect();
      window.removeEventListener("undr:film-play", onOtherPlay);
      document.removeEventListener("visibilitychange", onVisibility);
      reduce.removeEventListener("change", onMotion);
    };
  }, [id]);

  return (
    <div
      ref={root}
      className="hover-film"
      data-previewing={playing && hovered && !activated}
      onPointerEnter={(event) => {
        const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
        if (activated || event.pointerType !== "mouse" || connection?.saveData ||
          !matchMedia("(hover: hover) and (pointer: fine)").matches ||
          matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        setLoaded(true);
        setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onClickCapture={() => {
        preview.current?.pause();
        setHovered(false);
        setActivated(true);
      }}
    >
      <FilmPlayer film={film} variant="card" showMeta={false} />
      {loaded && !activated && (
        <video
          ref={preview}
          className="hover-film__preview"
          src={previewSrc}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => {
            setPlaying(true);
            window.dispatchEvent(new CustomEvent("undr:film-play", { detail: id }));
          }}
          onPause={() => setPlaying(false)}
          onError={() => setPlaying(false)}
        />
      )}
      {!activated && <span className="hover-film__hint" aria-hidden="true">
        {playing && hovered ? "Silent preview · Click for sound ↗" : "Play film ↗"}
      </span>}
    </div>
  );
}
