"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { MemberImage } from "@/data/members";

function Arrow({ direction = "open" }: { direction?: "open" | "previous" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      {direction === "open" ? <path d="M6 18 18 6M6 6h12v12" /> : direction === "previous" ? <path d="m13 5-7 7 7 7M6 12h14" /> : <path d="m11 5 7 7-7 7M18 12H4" />}
    </svg>
  );
}

export function MembersViewer({ images, initialIndex, returnFocusTo, onClose }: { images: MemberImage[]; initialIndex: number; returnFocusTo: HTMLButtonElement; onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const [detail, setDetail] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const image = images[index];
  const canGoBack = index > 0;
  const canGoForward = index < images.length - 1;

  function changeImage(nextIndex: number) {
    setIndex(nextIndex);
    setDetail(false);
    stageRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.documentElement.style.overflow;
    const scrollPosition = { top: window.scrollY, left: window.scrollX, behavior: "instant" as const };
    if (!dialog.open) dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(scrollPosition);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      if (returnFocusTo.isConnected) returnFocusTo.focus({ preventScroll: true });
      // Native dialog focus restoration can move a control inside a sticky scene.
      window.scrollTo(scrollPosition);
    };
  }, [returnFocusTo]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!detail || !stage) return;
    // Start at the actual garment, rather than the source screenshot's black bars.
    // The 1290:1701 content window is the same one used by MembersImage.
    const contentTop = image.screenshotCrop ? (image.height - image.width * 1701 / 1290) / 2 : 0;
    stage.focus({ preventScroll: true });
    stage.scrollTo({
      top: Math.max(0, contentTop),
      left: Math.max(0, (image.width - stage.clientWidth) / 2),
      behavior: "instant",
    });
  }, [detail, image]);

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    // In detail view the arrow keys retain their native scrolling behavior.
    if (detail) return;
    const target = event.target;
    if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (canGoBack) changeImage(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      if (canGoForward) changeImage(index + 1);
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
        <div className="members-viewer__tools">
          <button type="button" className="members-viewer__detail" aria-pressed={detail} onClick={() => setDetail((value) => !value)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m14.5 14.5 5 5M7 10h6" />{!detail && <path d="M10 7v6" />}</svg>
            <span>{detail ? "Fit image" : "View details"}</span>
          </button>
          <button type="button" className="members-viewer__close" onClick={onClose} aria-label="Close image preview" autoFocus>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </div>
      </div>

      <figure className="members-viewer__figure">
        <div className={`members-viewer__stage${detail ? " members-viewer__stage--detail" : ""}`} ref={stageRef} tabIndex={detail ? 0 : undefined} aria-label={detail ? "Image details. Scroll to explore the full image." : undefined}>
          <img
            key={image.id}
            className="members-viewer__image"
            src={image.src}
            srcSet={detail ? undefined : image.srcSet}
            sizes="(max-width: 760px) 92vw, 80vw"
            width={image.width}
            height={image.height}
            alt={image.alt}
            decoding="async"
            style={{ "--member-image-width": `${image.width}px` } as CSSProperties}
          />
        </div>
        <figcaption className="members-viewer__caption" id={descriptionId}>
          <span>{image.category} <span aria-hidden="true">/</span> {image.title}</span>
          <span>Preview image · Not available to purchase.</span>
        </figcaption>
      </figure>

      <div className="members-viewer__foot">
        <div className="members-viewer__links">
          <a href={image.originalSrc ?? image.src} target="_blank" rel="noopener noreferrer" className="members-viewer__original">
            Open full image <Arrow />
            <span className="sr-only"> in a new tab</span>
          </a>
          <p className="members-viewer__hint">{detail ? "Scroll to explore" : "Arrow keys to browse"}<span aria-hidden="true"> · </span>Esc to close</p>
        </div>
        <div className="members-viewer__navigation">
          <button type="button" className="members-viewer__step" aria-label="Previous image" disabled={!canGoBack} onClick={() => changeImage(index - 1)}><Arrow direction="previous" /></button>
          <span className="members-viewer__position" aria-live="polite" aria-atomic="true">{String(index + 1).padStart(2, "0")} <span aria-hidden="true">/</span><span className="sr-only">of</span> {String(images.length).padStart(2, "0")}</span>
          <button type="button" className="members-viewer__step" aria-label="Next image" disabled={!canGoForward} onClick={() => changeImage(index + 1)}><Arrow direction="next" /></button>
        </div>
      </div>
    </dialog>
  );
}
