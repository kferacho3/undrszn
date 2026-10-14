"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { assetUrl, editionOf, formatMoney, getAsset, products, productPath, type Product } from "@/data/catalog";
import { Media } from "./Media";
import { useUI } from "./providers/UIProvider";
import { Accordion, Price } from "./ui";

export function ProductDetail({ product: p }: { product: Product }) {
  const { addLine, openDialog } = useUI();
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [stickyVisible, setStickyVisible] = useState(false);
  const buyRef = useRef<HTMLButtonElement>(null);
  const sizeRef = useRef<HTMLFieldSetElement>(null);
  const current = p.images[index];

  // Show the mobile sticky bar only once the main purchase button has scrolled away.
  useEffect(() => {
    const el = buyRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setStickyVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function add() {
    if (!size) {
      setError("Choose a size before adding this piece.");
      sizeRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
      sizeRef.current?.querySelector("input")?.focus({ preventScroll: true });
      return;
    }
    if (addLine(p.id, size)) openDialog({ kind: "bag" });
  }

  function onGalleryKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") setIndex((i) => (i + 1) % p.images.length);
    if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + p.images.length) % p.images.length);
  }

  const other = products.filter((q) => q.id !== p.id);

  return (
    <>
      <nav className="container breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/collections/all">The collection</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{p.color}</span>
      </nav>

      <section className="container pdp">
        <div className="pdp__gallery" onKeyDown={onGalleryKey}>
          <button className="pdp__main zoomable" onClick={() => openDialog({ kind: "zoom", assetId: current })} aria-label="Enlarge product photograph">
            <Media key={current} id={current} ratio="4 / 5" priority sizes="(max-width: 900px) 100vw, 58vw" width={1800} />
            <span className="pdp__counter" aria-hidden="true">
              {String(index + 1).padStart(2, "0")} / {String(p.images.length).padStart(2, "0")}
            </span>
            <span className="pdp__zoom" aria-hidden="true">
              View full image +
            </span>
          </button>
          <div className="pdp__thumbs" role="group" aria-label="Product photographs. Use arrow keys to browse.">
            {p.images.map((id, i) => (
              <button key={id} aria-pressed={i === index} onClick={() => setIndex(i)} aria-label={`Photograph ${i + 1}: ${getAsset(id).alt}`}>
                <img src={assetUrl(getAsset(id), 240)} alt="" width={72} height={90} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
          <p className="micro muted">Original brand photography</p>
        </div>

        <div className="pdp__info">
          <span className="eyebrow eyebrow--red">Dirty Rodman / {editionOf(p)}</span>
          <h1 className="display pdp__title">
            {p.id === "cream" ? (
              <>
                Deluxe Dirty
                <br />
                Rodman.
              </>
            ) : (
              <>
                Dirty Rodman
                <br />
                Hoodie.
              </>
            )}
          </h1>
          <Price price={p.price} compareAt={p.compare_at} />
          <p className="pdp__desc">{p.description}</p>

          <div style={{ display: "grid", gap: 12 }}>
            <span className="micro">Color / {p.color}</span>
            <div className="color-links">
              {products.map((q) => (
                <Link key={q.id} href={productPath(q)} aria-current={q.id === p.id ? "page" : undefined}>
                  <i className={`chip chip--${q.id}`} aria-hidden="true" />
                  {q.color}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            <div className="size-head">
              <span className="micro">Select size{size ? ` / ${size}` : ""}</span>
              <button type="button" onClick={() => openDialog({ kind: "size", productId: p.id })}>
                Sizing &amp; fit
              </button>
            </div>
            <fieldset className="size-grid" ref={sizeRef} data-error={!!error} aria-describedby="size-error">
              <legend>Select a size for {p.name}</legend>
              {p.sizes.map((s) => (
                <label key={s}>
                  <input
                    type="radio"
                    name={`size-${p.id}`}
                    value={s}
                    checked={size === s}
                    onChange={() => {
                      setSize(s);
                      setError("");
                    }}
                  />
                  <span>{s}</span>
                </label>
              ))}
            </fieldset>
            <p className="form-error" id="size-error" role="status">
              {error}
            </p>
          </div>

          <button ref={buyRef} className="btn btn--red btn--wide" onClick={add}>
            Add to bag — {formatMoney(p.price)} <span className="arrow" aria-hidden="true">↗</span>
          </button>
          <p className="fineprint">
            Sizes shown are a dated snapshot, not live inventory. All sales are final under the current policy; eligible size
            exchanges are conditional. <Link href="/policies/refund-policy">Read the policy.</Link>
          </p>

          <div className="facts">
            {p.facts.map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>

          <div>
            <Accordion title="The details">{p.facts.join(" · ")}.</Accordion>
            <Accordion title="Sizing & fit">
              Verified garment measurements must be added before launch. <Link href="/pages/size-guide">See the sizing guide.</Link>
            </Accordion>
            <Accordion title="Shipping & exchanges">
              The current shipping page lists approximately 2–5 business days for processing, not delivery. The owner must confirm
              fulfillment timing and the collection’s release status. <Link href="/policies/shipping-policy">Shipping details.</Link>
            </Accordion>
          </div>
          <p className="fineprint">
            <a href={p.source} target="_blank" rel="noopener noreferrer">
              View this item on the live store ↗
            </a>
          </p>
        </div>
      </section>

      <section className="container section section--rule">
        <div className="section-head">
          <div>
            <span className="eyebrow eyebrow--red">Another expression</span>
            <h2 className="display h-lg">The other side.</h2>
          </div>
          <Link className="link-arrow" href="/collections/all">
            View collection ↗
          </Link>
        </div>
        <div className="product-grid">
          {other.map((q) => (
            <article className="product-card" key={q.id}>
              <Link className="product-card__media zoomable" href={productPath(q)} aria-label={`${q.name}, ${q.color}`}>
                <Media id={q.lead} ratio="4 / 5" />
                <span className="product-card__label" aria-hidden="true">
                  {q.color} / {editionOf(q)}
                </span>
              </Link>
              <div className="product-card__info">
                <h3 className="product-card__name">
                  <Link href={productPath(q)}>{q.name}</Link>
                </h3>
                <Price price={q.price} compareAt={q.compare_at} />
              </div>
            </article>
          ))}
          <Link className="product-card__media zoomable" href="/pages/behind-the-scenes-dirty-rodman" aria-label="Inside the campaign">
            <Media id="bts-pair" ratio="4 / 5" />
            <span className="product-card__label" aria-hidden="true">
              Inside the campaign
            </span>
          </Link>
        </div>
      </section>

      <div className={`sticky-buy ${stickyVisible ? "is-visible" : ""}`} aria-hidden={!stickyVisible}>
        <p>
          {formatMoney(p.price)}
          <br />
          <small>{size ? `Size ${size}` : "Choose your size"}</small>
        </p>
        <button className="btn btn--red" onClick={add} tabIndex={stickyVisible ? 0 : -1}>
          Add to bag ↗
        </button>
      </div>
    </>
  );
}
