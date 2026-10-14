"use client";

import { useEffect, useRef, useState } from "react";
import { filmIsReady, type Film } from "@/data/films";
import { Media } from "../Media";

/**
 * Silent background loop. The still is always rendered first so the composition is complete
 * without video. The loop only loads after the page is idle, never on Save-Data, never
 * autoplays under reduced motion, pauses offscreen, and always exposes a visible pause control.
 */
export function AmbientLoop({ film, priority = false, sizes = "50vw", focus }: { film: Film; priority?: boolean; sizes?: string; focus?: string }) {
  const ready = filmIsReady(film);
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (conn?.saveData) return;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- honour reduced motion: start paused
      setUserPaused(true);
    }
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
    if (typeof window.requestIdleCallback === "function") idleHandle = window.requestIdleCallback(() => setLoad(true), { timeout: 2500 });
    else timeoutHandle = setTimeout(() => setLoad(true), 1200);
    return () => {
      if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
      clearTimeout(timeoutHandle);
    };
  }, [ready]);

  // Play only while on screen.
  useEffect(() => {
    const el = wrapRef.current;
    const v = videoRef.current;
    if (!el || !v || !load) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !userPaused) void v.play().catch(() => undefined);
      else v.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [load, userPaused]);

  return (
    <div className="ambient" ref={wrapRef}>
      <Media id={film.posterAsset} ratio="auto" priority={priority} sizes={sizes} focus={focus} />
      {ready && load && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          poster={film.posterSrc}
          data-playing={playing}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          {film.sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}
      {ready && load && (
        <button
          className="ambient__toggle"
          onClick={() => {
            const v = videoRef.current;
            if (!v) return;
            if (v.paused) {
              setUserPaused(false);
              v.play().catch(() => undefined);
            } else {
              setUserPaused(true);
              v.pause();
            }
          }}
          aria-label={playing ? "Pause background motion" : "Play background motion"}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {playing ? <path d="M6 4h4v16H6zM14 4h4v16h-4z" /> : <path d="M7 4.5v15l13-7.5-13-7.5Z" />}
          </svg>
          {playing ? "Pause" : "Play"}
        </button>
      )}
    </div>
  );
}
