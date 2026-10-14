/**
 * FILM REGISTRY — the single place where videos are wired into the site.
 *
 * Every film below already has a designed slot on the site. While `sources` is empty the
 * slot renders an honest "in the edit" state over the poster still (no fake play button).
 * As soon as `sources` has at least one entry, the real player appears everywhere that
 * film is placed. Nothing else needs to change.
 *
 * To add a film (see docs/VIDEO_INTEGRATION.md for the full checklist):
 *   1. Compress:  npm run films:compress -- <master.mov> <film-id> [--loop]
 *      Outputs land in public/media/films/ and the script prints a ready-to-paste snippet.
 *   2. Paste the printed `sources` / `poster` values into the matching entry below.
 *   3. Optional: add captions (public/media/films/<id>.en.vtt) and real chapter timestamps.
 *
 * `src` may be a site path (/media/films/...) or an absolute CDN URL (Shopify Files,
 * Cloudflare R2/Stream, Mux, Vercel Blob...). Files over ~95 MB should live on a CDN:
 * GitHub rejects files larger than 100 MB.
 */

export type FilmId = "journey" | "campaign-cut" | "bts-reel" | "ambient-loop";

export interface FilmSource {
  src: string;
  type: "video/mp4" | "video/webm";
  /** Encoded frame height, used to choose HD vs SD. */
  height: number;
}

export interface FilmCaption {
  src: string;
  srclang: string;
  label: string;
  default?: boolean;
}

export interface FilmChapter {
  /** Seconds from the start of the film. */
  start: number;
  title: string;
}

export interface Film {
  id: FilmId;
  kicker: string;
  title: string;
  description: string;
  /** Approximate runtime shown before metadata loads, e.g. "06:00". */
  durationLabel: string;
  /** CSS aspect-ratio of the encoded picture. */
  aspect: "16 / 9" | "2.39 / 1" | "4 / 5" | "9 / 16";
  /** Poster extracted from the film (preferred once available). */
  posterSrc?: string;
  /** Fallback still from the existing media library (asset-manifest.json id). */
  posterAsset: string;
  posterAlt: string;
  /** Empty = film not delivered yet; the slot shows its "in the edit" state. */
  sources: FilmSource[];
  captions?: FilmCaption[];
  /** Working chapters — replace titles/timestamps with the final edit's real ones. */
  chapters?: FilmChapter[];
  /** Muted, looping background usage (no controls beyond pause). */
  ambient?: boolean;
  credits?: string;
}

export const films: Record<FilmId, Film> = {
  journey: {
    id: "journey",
    kicker: "A UNDR.RATED.SZN film",
    title: "The Journey",
    description:
      "The product, the brand and the vision, told in six minutes and forty seconds. From the first pieces to the Dirty Rodman collection and what comes next.",
    durationLabel: "06:40",
    aspect: "16 / 9",
    posterAsset: "bts-pair",
    posterAlt: "A person wearing a graphic backpack approaches a storefront",
    posterSrc: "/videos/film-poster.jpg",
    sources: [
      { src: "/videos/film-hd.mp4", type: "video/mp4", height: 1080 },
      { src: "/videos/film-sd.mp4", type: "video/mp4", height: 720 },
    ],
    captions: [],
    // Awaiting verified chapter timestamps from the final edit.
    chapters: [],
  },
  "campaign-cut": {
    id: "campaign-cut",
    kicker: "Campaign film",
    title: "Dirty Rodman — Street",
    description: "A short animated street scene featuring the Dirty Rodman hoodie.",
    durationLabel: "00:07",
    aspect: "9 / 16",
    posterAsset: "bts-campaign",
    posterAlt: "An animated chimpanzee wearing the Dirty Rodman hoodie on a city street",
    posterSrc: "/videos/portrait-02-poster.jpg",
    sources: [
      { src: "/videos/portrait-02-hd.mp4", type: "video/mp4", height: 1080 },
      { src: "/videos/portrait-02-sd.mp4", type: "video/mp4", height: 720 },
    ],
    captions: [],
  },
  "bts-reel": {
    id: "bts-reel",
    kicker: "Campaign short",
    title: "Dirty Rodman — The Ride",
    description: "A short animated car scene featuring the Dirty Rodman hoodie.",
    durationLabel: "00:10",
    aspect: "9 / 16",
    posterAsset: "bts-black",
    posterAlt: "A Dirty Rodman hoodie on a car seat with an animated chimpanzee outside the window",
    posterSrc: "/videos/portrait-01-poster.jpg",
    sources: [
      { src: "/videos/portrait-01-hd.mp4", type: "video/mp4", height: 1080 },
      { src: "/videos/portrait-01-sd.mp4", type: "video/mp4", height: 720 },
    ],
    captions: [],
  },
  "ambient-loop": {
    id: "ambient-loop",
    kicker: "Ambient loop",
    title: "Dirty Rodman — loop",
    description: "A short, silent loop cut from campaign footage for the homepage hero.",
    durationLabel: "00:07",
    aspect: "9 / 16",
    posterAsset: "cream-hood",
    posterAlt: "An animated chimpanzee wearing the Dirty Rodman hoodie on a city street",
    posterSrc: "/videos/portrait-02-poster.jpg",
    sources: [
      { src: "/videos/portrait-02-loop.mp4", type: "video/mp4", height: 720 },
    ],
    ambient: true,
  },
};

export const filmIsReady = (film: Film) => film.sources.length > 0;

export function formatTime(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) totalSeconds = 0;
  const s = Math.floor(totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${String(m).padStart(2, "0")}:${sec}`;
}
