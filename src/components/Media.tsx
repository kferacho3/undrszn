"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { assetSrcSet, assetUrl, getAsset, TINY_ASSETS } from "@/data/catalog";

interface MediaProps {
  id: string;
  className?: string;
  /** CSS aspect-ratio, e.g. "4 / 5". Pass "auto" to let the parent size it. */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  /** CSS object-position, e.g. "50% 20%". */
  focus?: string;
  packshot?: boolean;
  width?: number;
}

/**
 * Original brand photography served from the Shopify CDN with responsive widths.
 * Fades in once decoded; if a source can't load, a labelled fallback keeps the
 * layout intact and still describes the frame.
 */
export function Media({
  id,
  className = "",
  ratio,
  sizes = "(max-width: 760px) 92vw, 50vw",
  priority = false,
  focus,
  packshot = false,
  width = 1200,
}: MediaProps) {
  const asset = getAsset(id);
  const tiny = TINY_ASSETS.has(id);
  const imgRef = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) setState(img.naturalWidth > 0 ? "loaded" : "error");
  }, []);

  const style = {
    ...(ratio ? { "--ar": ratio } : {}),
    ...(focus ? { "--focus-pos": focus } : {}),
  } as CSSProperties;

  const classes = ["media", packshot && "media--packshot", tiny && "media--tiny", className].filter(Boolean).join(" ");

  return (
    <div className={classes} style={style} data-loaded={state !== "loading"} data-media-id={id}>
      {state === "error" ? (
        <div className="media-fallback" role="img" aria-label={asset.alt}>
          <span>{asset.alt}</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={assetUrl(asset, width)}
          srcSet={assetSrcSet(asset)}
          sizes={tiny ? undefined : sizes}
          alt={asset.alt}
          width={800}
          height={1000}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
        />
      )}
    </div>
  );
}
