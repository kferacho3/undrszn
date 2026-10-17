"use client";

import { useCallback, useId, useState } from "react";
import { memberImages } from "@/data/members";
import { MembersImage } from "./MembersImage";
import { MembersViewer } from "./MembersViewer";

const filters = [
  { label: "All", category: null },
  { label: "Knitwear", category: "Knitwear" },
  { label: "Small goods", category: "Small goods" },
  { label: "In frame", category: "Editorial" },
] as const;

export function MembersGallery() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["label"]>("All");
  const [activeViewer, setActiveViewer] = useState<{ index: number; opener: HTMLButtonElement } | null>(null);
  const selectedCategory = filters.find((filter) => filter.label === activeFilter)?.category;
  const images = selectedCategory ? memberImages.filter((image) => image.category === selectedCategory) : memberImages;
  const gridId = useId();
  const closeViewer = useCallback(() => setActiveViewer(null), []);

  return (
    <div className="members-gallery">
      <div className="members-gallery__toolbar">
        <div className="members-gallery__filters" role="group" aria-label="Filter collection previews">
          {filters.map((filter) => {
            const count = filter.category ? memberImages.filter((image) => image.category === filter.category).length : memberImages.length;
            return (
              <button
                type="button"
                key={filter.label}
                aria-pressed={activeFilter === filter.label}
                aria-controls={gridId}
                className="members-gallery__filter"
                onClick={() => setActiveFilter(filter.label)}
              >
                {filter.label}<span className="members-gallery__filter-count">{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
        <p className="members-gallery__count" role="status" aria-live="polite" aria-atomic="true">
          {String(images.length).padStart(2, "0")} {images.length === 1 ? "view" : "views"}<span className="sr-only"> · {activeFilter}</span>
        </p>
      </div>

      <div className="members-gallery__grid" id={gridId}>
        {images.map((image, index) => (
          <figure className="members-gallery__item" key={image.id}>
            <button type="button" className="members-gallery__open" aria-label={`View ${image.title}`} aria-haspopup="dialog" onClick={(event) => setActiveViewer({ index, opener: event.currentTarget })}>
              <MembersImage image={image} className="members-gallery__image" sizes="(max-width: 380px) 92vw, (max-width: 1000px) 44vw, 23vw" />
              <span className="members-gallery__open-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M6 18 18 6M6 6h12v12" /></svg></span>
            </button>
            <figcaption className="members-gallery__caption">
              <h3>{image.title}</h3>
              <span>{image.category}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {activeViewer !== null && <MembersViewer images={images} initialIndex={activeViewer.index} returnFocusTo={activeViewer.opener} onClose={closeViewer} />}
    </div>
  );
}
