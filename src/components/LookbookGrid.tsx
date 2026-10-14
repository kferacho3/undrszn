"use client";

import { useState } from "react";
import { assets, TINY_ASSETS } from "@/data/catalog";
import { Media } from "./Media";
import { useUI } from "./providers/UIProvider";

const filters = [
  ["all", "All media"],
  ["photos", "Photography"],
  ["films", "Film stills"],
] as const;

export function LookbookGrid() {
  const { openDialog } = useUI();
  const [filter, setFilter] = useState<(typeof filters)[number][0]>("all");
  const items = assets.filter((a) => filter === "all" || (filter === "photos" ? a.kind !== "video_poster" : a.kind === "video_poster"));
  return (
    <div className="container">
      <div className="toolbar">
        <div className="toggle" role="group" aria-label="Filter media">
          {filters.map(([value, label]) => (
            <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>
              {label}
            </button>
          ))}
        </div>
        <span className="micro muted" role="status">
          {items.length} frames
        </span>
      </div>
      <section className="lookbook" aria-label="Lookbook">
        {items.map((a, i) => (
          <figure key={a.id}>
            <button className="zoomable" onClick={() => openDialog({ kind: "zoom", assetId: a.id })} aria-label={`Enlarge: ${a.alt}`}>
              <Media id={a.id} ratio={TINY_ASSETS.has(a.id) ? "4 / 3" : "auto"} sizes="(max-width: 600px) 92vw, (max-width: 1100px) 45vw, 24vw" width={800} />
            </button>
            <figcaption>
              <span>
                {String(i + 1).padStart(2, "0")} / {a.kind === "video_poster" ? "film still" : a.kind}
              </span>
              <a href={a.source_page} target="_blank" rel="noopener noreferrer">
                Context ↗
              </a>
            </figcaption>
          </figure>
        ))}
      </section>
      <p className="notice" style={{ marginBottom: 96 }}>
        Film stills are stills, not playable videos — the films themselves live on the Journey and campaign pages. The two small film
        thumbnails are archive items and are never enlarged into hero media.
      </p>
    </div>
  );
}
