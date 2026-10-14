"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import { filmIsReady, formatTime, type Film, type FilmSource } from "@/data/films";
import { site } from "@/data/site";
import { Media } from "../Media";

const PLAY_EVENT = "undr:film-play";
const IDLE_MS = 2600;

type Quality = "hd" | "sd";

function pickSources(sources: FilmSource[], quality: Quality): FilmSource[] {
  // Preferred quality first, then by codec preference (webm before mp4 at equal height).
  const score = (s: FilmSource) => (quality === "hd" ? -s.height : s.height) * 10 + (s.type === "video/webm" ? 0 : 1);
  return [...sources].sort((a, b) => score(a) - score(b));
}

function defaultQuality(sources: FilmSource[]): Quality {
  if (typeof window === "undefined") return "hd";
  const heights = new Set(sources.map((s) => s.height));
  if (heights.size < 2) return "hd";
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (conn?.saveData || /(^|-)2g|3g/.test(conn?.effectiveType ?? "")) return "sd";
  return window.innerWidth * (window.devicePixelRatio || 1) < 1400 ? "sd" : "hd";
}

const Glyph = {
  play: <path d="M7 4.5v15l13-7.5-13-7.5Z" />,
  pause: <path d="M6 4h4v16H6zM14 4h4v16h-4z" />,
  replay: <path d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7Z" />,
  volume: <path d="M4 9h4l5-4v14l-5-4H4V9Zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4Zm-2.5-8v2a7 7 0 0 1 0 12v2a9 9 0 0 0 0-16Z" />,
  muted: <path d="M4 9h4l5-4v14l-5-4H4V9Zm12.3.3 1.4-1.4L20 10.2l2.3-2.3 1.4 1.4-2.3 2.3 2.3 2.3-1.4 1.4-2.3-2.3-2.3 2.3-1.4-1.4 2.3-2.3-2.3-2.3Z" />,
  full: <path d="M4 4h6v2H6v4H4V4Zm10 0h6v6h-2V6h-4V4ZM4 14h2v4h4v2H4v-6Zm14 0h2v6h-6v-2h4v-4Z" />,
  exitFull: <path d="M8 4h2v6H4V8h4V4Zm6 0h2v4h4v2h-6V4ZM4 14h6v6H8v-4H4v-2Zm10 0h6v2h-4v4h-2v-6Z" />,
};

function Svg({ d }: { d: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {d}
    </svg>
  );
}

interface FilmPlayerProps {
  film: Film;
  /** "feature" shows the large title treatment; "card" is compact for grids. */
  variant?: "feature" | "card";
  showChapters?: boolean;
  showMeta?: boolean;
  priority?: boolean;
}

export function FilmPlayer({ film, variant = "feature", showChapters = false, showMeta = true, priority = false }: FilmPlayerProps) {
  const ready = filmIsReady(film);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const resumeAt = useRef<number | null>(null);
  const uid = useId();
  const instanceId = useRef(`${film.id}-${uid}`);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [muted, setMuted] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [idle, setIdle] = useState(false);
  const [quality, setQuality] = useState<Quality>("hd");

  const qualities = useMemo(() => new Set(film.sources.map((s) => (s.height >= 1000 ? "hd" : "sd"))), [film.sources]);
  const sources = useMemo(() => pickSources(film.sources, quality), [film.sources, quality]);
  const hasCaptions = (film.captions?.length ?? 0) > 0;
  const total = duration || 0;
  const chapters = film.chapters ?? [];
  const currentChapter = chapters.reduce<number>((acc, c, i) => (time >= c.start ? i : acc), -1);

  // Only one film plays at a time across the page.
  useEffect(() => {
    const onOtherPlay = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== instanceId.current) videoRef.current?.pause();
    };
    window.addEventListener(PLAY_EVENT, onOtherPlay);
    return () => window.removeEventListener(PLAY_EVENT, onOtherPlay);
  }, []);

  useEffect(() => {
    const onFs = () => setFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // Apply caption visibility to the native text tracks.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    for (const track of Array.from(v.textTracks)) track.mode = captionsOn ? "showing" : "hidden";
  }, [captionsOn, started, quality]);

  const wake = useCallback(() => {
    setIdle(false);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setIdle(true);
    }, IDLE_MS);
  }, []);

  function start(at?: number) {
    if (!ready) return;
    if (!started) {
      setQuality(defaultQuality(film.sources));
      if (at !== undefined) resumeAt.current = at;
      setStarted(true); // the <video> mounts with autoPlay
      return;
    }
    const v = videoRef.current;
    if (!v) return;
    if (at !== undefined) v.currentTime = at;
    v.play().catch(() => undefined);
  }

  function toggle() {
    const v = videoRef.current;
    if (!v) return start();
    if (v.paused || v.ended) v.play().catch(() => undefined);
    else v.pause();
  }

  function seek(to: number) {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(to, v.duration || to));
    setTime(v.currentTime);
  }

  function changeQuality(next: Quality) {
    const v = videoRef.current;
    if (!v || next === quality) return;
    resumeAt.current = v.currentTime;
    setQuality(next);
  }

  // When sources change (quality switch), reload and resume where we were.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !started) return;
    if (resumeAt.current !== null && v.readyState > 0) {
      v.load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quality]);

  async function toggleFullscreen() {
    const el = rootRef.current;
    if (!el) return;
    const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (el.requestFullscreen) await el.requestFullscreen().catch(() => v?.webkitEnterFullscreen?.());
    else v?.webkitEnterFullscreen?.(); // iOS Safari
  }

  function onKey(e: React.KeyboardEvent) {
    if (!started) return;
    const v = videoRef.current;
    if (!v) return;
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" && (e.key === "ArrowLeft" || e.key === "ArrowRight")) return; // range handles its own
    switch (e.key) {
      case " ":
      case "k":
        if (target.tagName === "BUTTON" && e.key === " ") return;
        e.preventDefault();
        toggle();
        break;
      case "ArrowRight":
      case "l":
        e.preventDefault();
        seek(v.currentTime + (e.key === "l" ? 10 : 5));
        break;
      case "ArrowLeft":
      case "j":
        e.preventDefault();
        seek(v.currentTime - (e.key === "j" ? 10 : 5));
        break;
      case "m":
        v.muted = !v.muted;
        break;
      case "f":
        void toggleFullscreen();
        break;
      case "c":
        if (hasCaptions) setCaptionsOn((c) => !c);
        break;
    }
    wake();
  }

  const posterNode = film.posterSrc ? (
    <div className="media" style={{ "--ar": "auto" } as CSSProperties}>
      <img src={film.posterSrc} alt={film.posterAlt} loading={priority ? "eager" : "lazy"} decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  ) : (
    <Media id={film.posterAsset} ratio="auto" sizes={variant === "feature" ? "100vw" : "(max-width: 860px) 100vw, 50vw"} priority={priority} width={variant === "feature" ? 1800 : 1200} />
  );

  const hud = (
    <div className="film__hud" aria-hidden={started}>
      <div className="film__hud-top">
        <span>{film.kicker}</span>
        <span>Runtime {film.durationLabel}</span>
      </div>
      <div className="film__center">
        {!ready && (
          <span className="status-pill">
            <span className="dot" aria-hidden="true" /> In the edit · premieres here
          </span>
        )}
      </div>
      <div className="film__hud-bottom">
        {variant === "feature" ? <span className="film__title">{film.title}</span> : <span>{film.title}</span>}
        <span>{site.name}</span>
      </div>
    </div>
  );

  const style = { "--film-ar": film.aspect } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`film film--${variant} ${ready ? "film--ready" : "film--pending"}`}
      style={style}
      data-idle={idle && playing}
      onKeyDown={onKey}
      onPointerMove={started ? wake : undefined}
      onFocusCapture={started ? wake : undefined}
    >
      <div className="film__frame" role="group" aria-label={`${film.title} — film`} aria-roledescription="video player">
        {posterNode}
        {!started && (
          <>
            <div className="film__shade" />
            <div className="film__marks" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
            {hud}
          </>
        )}

        {ready && !started && (
          <button className="film__start" onClick={() => start()} aria-label={`Play ${film.title}, ${film.durationLabel}`}>
            <span className="film__play">
              <Svg d={Glyph.play} />
            </span>
            <span className="film__start-label" aria-hidden="true">
              Play film · {film.durationLabel}
            </span>
          </button>
        )}

        {!ready && <p className="sr-only">This film is still in the edit and will premiere here. The image shown is a still from the campaign.</p>}

        {ready && started && (
          <>
            <video
              ref={videoRef}
              className="film__video"
              playsInline
              autoPlay
              preload="metadata"
              crossOrigin={film.captions?.length ? "anonymous" : undefined}
              onClick={toggle}
              onPlay={() => {
                setPlaying(true);
                setEnded(false);
                window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: instanceId.current }));
                if ("mediaSession" in navigator) {
                  navigator.mediaSession.metadata = new MediaMetadata({ title: film.title, artist: site.name, album: film.kicker });
                }
                wake();
              }}
              onPause={() => {
                setPlaying(false);
                setIdle(false);
              }}
              onEnded={() => {
                setEnded(true);
                setPlaying(false);
                setIdle(false);
              }}
              onLoadedMetadata={(e) => {
                const v = e.currentTarget;
                setDuration(v.duration);
                if (resumeAt.current !== null) {
                  v.currentTime = resumeAt.current;
                  resumeAt.current = null;
                  v.play().catch(() => undefined);
                }
              }}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              onProgress={(e) => {
                const v = e.currentTarget;
                if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1));
              }}
              onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
            >
              {sources.map((s) => (
                <source key={`${s.src}-${quality}`} src={s.src} type={s.type} />
              ))}
              {film.captions?.map((c) => (
                <track key={c.src} kind="captions" src={c.src} srcLang={c.srclang} label={c.label} default={c.default} />
              ))}
            </video>

            <span className="film__now" aria-hidden="true">
              {film.title}
              {currentChapter >= 0 ? ` — ${chapters[currentChapter].title}` : ""}
            </span>

            <div className="film__controls">
              <div className="film__scrub">
                <div className="film__track">
                  <div className="film__buffered" style={{ width: total ? `${(buffered / total) * 100}%` : 0 }} />
                  <div className="film__progress" style={{ width: total ? `${(time / total) * 100}%` : 0 }} />
                  {total > 0 &&
                    chapters
                      .filter((c) => c.start > 0 && c.start < total)
                      .map((c) => <span key={c.start} className="film__tick" style={{ left: `${(c.start / total) * 100}%` }} />)}
                </div>
                <input
                  className="film__range"
                  type="range"
                  min={0}
                  max={total || 0}
                  step={0.1}
                  value={Math.min(time, total || 0)}
                  onChange={(e) => seek(Number(e.target.value))}
                  aria-label="Seek"
                  aria-valuetext={`${formatTime(time)} of ${formatTime(total)}`}
                />
              </div>
              <div className="film__bar">
                <button className="film__btn" onClick={toggle} aria-label={ended ? "Replay" : playing ? "Pause" : "Play"}>
                  <Svg d={ended ? Glyph.replay : playing ? Glyph.pause : Glyph.play} />
                </button>
                <button
                  className="film__btn"
                  onClick={() => {
                    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
                  }}
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  <Svg d={muted ? Glyph.muted : Glyph.volume} />
                </button>
                <span className="film__time">
                  {formatTime(time)} / {total ? formatTime(total) : film.durationLabel}
                </span>
                <span className="spacer" />
                {hasCaptions && (
                  <button className="film__btn" aria-pressed={captionsOn} onClick={() => setCaptionsOn((c) => !c)} aria-label="Captions">
                    CC
                  </button>
                )}
                {qualities.size > 1 && (
                  <button
                    className="film__btn"
                    onClick={() => changeQuality(quality === "hd" ? "sd" : "hd")}
                    aria-label={`Quality: ${quality === "hd" ? "HD" : "SD"}. Switch to ${quality === "hd" ? "SD" : "HD"}`}
                  >
                    {quality === "hd" ? "HD" : "SD"}
                  </button>
                )}
                <button className="film__btn" onClick={() => void toggleFullscreen()} aria-label={fullscreen ? "Exit full screen" : "Full screen"}>
                  <Svg d={fullscreen ? Glyph.exitFull : Glyph.full} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {showMeta && (
        <div className="film__meta">
          <span>
            {film.kicker} — {film.title}
          </span>
          <span>
            {ready ? (started ? "Space to play/pause · ← → to seek · F for full screen" : `Runtime ${film.durationLabel}`) : `Runtime ${film.durationLabel} · in the edit`}
          </span>
        </div>
      )}

      {showChapters && chapters.length > 0 && (
        <ol className="film-chapters" aria-label={`${film.title} chapters`}>
          {chapters.map((c, i) => (
            <li key={c.start}>
              <button
                disabled={!ready}
                aria-current={started && i === currentChapter ? "true" : undefined}
                onClick={() => start(c.start)}
                aria-label={ready ? `Play from ${formatTime(c.start)}: ${c.title}` : `${c.title}, at ${formatTime(c.start)}`}
              >
                <span className="t">
                  {String(i + 1).padStart(2, "0")} · {formatTime(c.start)}
                </span>
                <span className="n">{c.title}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
