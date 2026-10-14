"use client";

import { useState } from "react";
import { products, type Product } from "@/data/catalog";
import { ProductCard, type ImageMode } from "./ProductCard";

export function ModeToggle({ mode, onChange }: { mode: ImageMode; onChange: (m: ImageMode) => void }) {
  return (
    <div className="toggle" role="group" aria-label="Product photograph style">
      <button aria-pressed={mode === "worn"} onClick={() => onChange("worn")}>
        On body
      </button>
      <button aria-pressed={mode === "studio"} onClick={() => onChange("studio")}>
        Product
      </button>
    </div>
  );
}

/** Section head + product grid with on-body / packshot switching. */
export function ProductShowcase({ kicker, title, items = products }: { kicker: string; title: React.ReactNode; items?: Product[] }) {
  const [mode, setMode] = useState<ImageMode>("worn");
  return (
    <>
      <div className="section-head">
        <div>
          <span className="eyebrow eyebrow--red">{kicker}</span>
          <h2 className="display h-lg">{title}</h2>
        </div>
        <ModeToggle mode={mode} onChange={setMode} />
      </div>
      <div className="product-grid">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} mode={mode} />
        ))}
      </div>
    </>
  );
}
