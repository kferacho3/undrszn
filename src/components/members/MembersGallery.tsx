"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { memberImages, type MemberImage } from "@/data/members";
import { MembersImage } from "./MembersImage";

const filters = [
  { label: "All", category: null },
  { label: "Knitwear", category: "Knitwear" },
  { label: "Small goods", category: "Small goods" },
  { label: "In frame", category: "Editorial" },
] as const;

function Arrow({ direction = "open" }: { direction?: "open" | "previous" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      {direction === "open" ? <path d="M6 18 18 6M6 6h12v12" /> : direction === "previous" ? <path d="m13 5-7 7 7 7M6 12h14" /> : <path d="m11 5 7 7-7 7M18 12H4" />}
    </svg>
  );
}

function MembersViewer({ images, initialIndex, returnFocusTo, onClose }: { images: MemberImage[]; initialIndex: number; returnFocusTo: HTMLButtonElement; onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const image = images[index];
  const canGoBack = index > 0;
  const canGoForward = index < images.length - 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.documentElement.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      if (returnFocusTo.isConnected) returnFocusTo.focus({ preventScroll: true });
    };
  }, [returnFocusTo]);

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const target = event.target;
    if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (canGoBack) setIndex((value) => value - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      if (canGoForward) setIndex((value) => value + 1);
    }
  }

  return (
    <dialog
      className="members-viewer"
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onKeyDown={handleKeyDown}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }}
    >
      <div className="members-viewer__head">
        <div>
          <p className="members-viewer__eyebrow">Members only / The preview</p>
          <h2 id={titleId}>{image.title}</h2>
        </div>
        <button type="button" className="members-viewer__close" onClick={onClose} aria-label="Close image preview" autoFocus>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
      </div>

      <figure className="members-viewer__figure">
        <div className="members-viewer__stage">
          <img
            key={image.id}
            className="members-viewer__image"
            src={image.src}
            srcSet={image.srcSet}
            sizes="(max-width: 760px) 92vw, 80vw"
            width={image.width}
            height={image.height}
            alt={image.alt}
            decoding="async"
          />
        </div>
        <figcaption className="members-viewer__caption" id={descriptionId}>
          <span>{image.category} <span aria-hidden="true">/</span> {image.title}</span>
          <span>Preview image · Not available to purchase.</span>
        </figcaption>
      </figure>

      <div className="members-viewer__foot">
        <a href={image.src} target="_blank" rel="noopener noreferrer" className="members-viewer__original">
          Open full image <Arrow />
          <span className="sr-only"> in a new tab</span>
        </a>
        <div className="members-viewer__navigation">
          <button type="button" className="members-viewer__step" aria-label="Previous image" disabled={!canGoBack} onClick={() => setIndex((value) => Math.max(0, value - 1))}><Arrow direction="previous" /></button>
          <span className="members-viewer__position" aria-live="polite" aria-atomic="true">{String(index + 1).padStart(2, "0")} <span aria-hidden="true">/</span><span className="sr-only">of</span> {String(images.length).padStart(2, "0")}</span>
          <button type="button" className="members-viewer__step" aria-label="Next image" disabled={!canGoForward} onClick={() => setIndex((value) => Math.min(images.length - 1, value + 1))}><Arrow direction="next" /></button>
        </div>
      </div>
    </dialog>
  );
}

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
              <span className="members-gallery__open-arrow" aria-hidden="true"><Arrow /></span>
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
