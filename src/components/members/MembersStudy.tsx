"use client";

import { useState } from "react";
import { memberImages, type MemberImage } from "@/data/members";
import { MembersImage } from "./MembersImage";
import { MembersViewer } from "./MembersViewer";

/** One shared viewing experience for portraits, garment studies and the archive. */
export function MembersStudy({ image, priority = false, sizes }: { image: MemberImage; priority?: boolean; sizes?: string }) {
  const [opener, setOpener] = useState<HTMLButtonElement | null>(null);
  const images = memberImages.filter((item) => item.category === image.category);

  return (
    <>
      <button
        type="button"
        className="members-study"
        aria-label={`Open ${image.title} in the image viewer`}
        aria-haspopup="dialog"
        onClick={(event) => setOpener(event.currentTarget)}
      >
        <MembersImage image={image} priority={priority} sizes={sizes} />
        <span className="members-study__open" aria-hidden="true">
          <span>View study</span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M6 18 18 6M6 6h12v12" /></svg>
        </span>
      </button>
      {opener && (
        <MembersViewer
          images={images}
          initialIndex={images.findIndex((item) => item.id === image.id)}
          returnFocusTo={opener}
          onClose={() => setOpener(null)}
        />
      )}
    </>
  );
}
