"use client";

import Link from "next/link";
import { formatMoney, getProduct, productPath } from "@/data/catalog";
import { MAX_QTY, useUI } from "./providers/UIProvider";
import { Media } from "./Media";

export function BagLines({ onNavigate }: { onNavigate?: () => void }) {
  const { lines, changeQty, removeLine } = useUI();
  return (
    <div>
      {lines.map((line, i) => {
        const p = getProduct(line.product);
        if (!p) return null;
        return (
          <article className="cart-row" key={`${line.product}-${line.size}`}>
            <Link href={productPath(p)} onClick={onNavigate} aria-label={`${p.name}, ${p.color}`}>
              <Media id={p.lead} ratio="4 / 5" sizes="96px" width={480} />
            </Link>
            <div>
              <h3>
                <Link href={productPath(p)} onClick={onNavigate}>
                  {p.name}
                </Link>
              </h3>
              <p>
                {p.color} / {line.size}
              </p>
              <div className="cart-row__actions">
                <div className="qty" role="group" aria-label={`Quantity for ${p.name} ${line.size}`}>
                  <button onClick={() => changeQty(i, -1)} aria-label={`Decrease quantity for ${p.name} ${line.size}`}>
                    −
                  </button>
                  <span aria-live="polite">{line.qty}</span>
                  <button
                    onClick={() => changeQty(i, 1)}
                    disabled={line.qty >= MAX_QTY}
                    aria-label={`Increase quantity for ${p.name} ${line.size}`}
                  >
                    +
                  </button>
                </div>
                <button className="remove-btn" onClick={() => removeLine(i)}>
                  Remove
                </button>
              </div>
            </div>
            <span className="price">{formatMoney(p.price * line.qty)}</span>
          </article>
        );
      })}
    </div>
  );
}

export function BagSummary({ showFullBagLink = true, onNavigate }: { showFullBagLink?: boolean; onNavigate?: () => void }) {
  const { subtotal, openDialog } = useUI();
  return (
    <aside className="cart-summary">
      <div className="cart-summary__total">
        <span>Item subtotal</span>
        <strong>{formatMoney(subtotal)}</strong>
      </div>
      <p>
        Shipping, tax and actual stock are not calculated here. Your bag is local to this browser and does not transfer to the
        live store.
      </p>
      <button className="btn btn--red btn--wide" onClick={() => openDialog({ kind: "checkout" })}>
        Continue to checkout <span className="arrow" aria-hidden="true">↗</span>
      </button>
      {showFullBagLink && (
        <Link className="link-arrow" href="/cart" onClick={onNavigate}>
          View full bag ↗
        </Link>
      )}
    </aside>
  );
}

export function BagEmpty({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="empty">
      <span className="eyebrow eyebrow--red">A fresh start</span>
      <h2 className="display h-md">
        Make room
        <br />
        for UNDR.
      </h2>
      <p>Your bag is empty.</p>
      <Link className="btn btn--red" href="/collections/all" onClick={onNavigate}>
        Explore the collection <span className="arrow" aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
