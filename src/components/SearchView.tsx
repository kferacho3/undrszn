"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { products } from "@/data/catalog";
import { ProductCard } from "./ProductCard";

export function SearchView() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = params.get("q") ?? "";
  const [draft, setDraft] = useState(query);
  const q = query.toLowerCase().trim();
  const results = products.filter((p) => `${p.name} ${p.color} ${p.facts.join(" ")} hoodie dirty rodman`.toLowerCase().includes(q));

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = draft.trim();
    router.replace(next ? `${pathname}?q=${encodeURIComponent(next)}` : pathname, { scroll: false });
  }

  return (
    <div className="container">
      <form className="search-box" role="search" onSubmit={onSubmit}>
        <label style={{ flex: 1, display: "flex" }}>
          <span className="sr-only">Search products</span>
          <input type="search" name="q" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Try ‘cream’ or ‘hoodie’" maxLength={120} autoFocus />
        </label>
        <button className="btn btn--red" type="submit">
          Search <span className="arrow" aria-hidden="true">↗</span>
        </button>
      </form>
      <p className="micro muted" role="status" style={{ marginBottom: 32 }}>
        {q ? `${results.length} ${results.length === 1 ? "result" : "results"} for “${query}”` : "Both pieces in the current collection."}
      </p>
      {results.length ? (
        <div className="product-grid" style={{ paddingBottom: 120 }}>
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2 className="display h-lg">Not here. Yet.</h2>
          <p>No products match that search. Try a color, the product name, or browse the full collection.</p>
          <Link className="btn btn--red" href="/collections/all">
            View all pieces <span className="arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      )}
    </div>
  );
}
