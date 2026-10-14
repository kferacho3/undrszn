"use client";

import { useState } from "react";
import { AUDIT_DATE, products } from "@/data/catalog";
import { ProductCard, type ImageMode } from "./ProductCard";
import { ModeToggle } from "./ProductShowcase";

const filters = [
  ["all", "All pieces"],
  ["black", "Black"],
  ["cream", "Cream"],
] as const;

export function CollectionView() {
  const [filter, setFilter] = useState<(typeof filters)[number][0]>("all");
  const [mode, setMode] = useState<ImageMode>("worn");
  const items = products.filter((p) => filter === "all" || p.id === filter);
  return (
    <section className="container">
      <div className="toolbar">
        <div className="toggle" role="group" aria-label="Filter products by color">
          {filters.map(([value, label]) => (
            <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <span className="micro muted" role="status">
            {items.length} {items.length === 1 ? "piece" : "pieces"} / USD
          </span>
          <ModeToggle mode={mode} onChange={setMode} />
        </div>
      </div>
      <div className="product-grid">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} mode={mode} priority={i < 2} />
        ))}
      </div>
      <p className="micro muted" style={{ paddingBlock: "32px 0" }}>
        Prices captured {AUDIT_DATE}. Confirm current sizes, availability and fulfillment on the live store.
      </p>
    </section>
  );
}
