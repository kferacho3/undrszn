"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { formatMoney, getAsset, getProduct, LIVE_STORE } from "@/data/catalog";
import { menuNav, site } from "@/data/site";
import { BagEmpty, BagLines, BagSummary } from "./BagContents";
import { Media } from "./Media";
import { Modal } from "./Modal";
import { Field, PreviewForm } from "./PreviewForm";
import { SizeGuideContent } from "./SizeGuideContent";
import { ThemeToggle } from "./ThemeToggle";
import { useUI } from "./providers/UIProvider";

export function DialogHost() {
  const { dialog, closeDialog, lines, count, subtotal, toastMessage } = useUI();
  const pathname = usePathname();

  // Any navigation closes whatever is open.
  useEffect(() => {
    closeDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  let content = null;
  if (dialog?.kind === "bag") {
    content = (
      <Modal key="bag" title={`Your bag / ${count} ${count === 1 ? "piece" : "pieces"}`} onClose={closeDialog} variant="drawer">
        {lines.length ? (
          <>
            <BagLines onNavigate={closeDialog} />
            <BagSummary onNavigate={closeDialog} />
          </>
        ) : (
          <BagEmpty onNavigate={closeDialog} />
        )}
      </Modal>
    );
  } else if (dialog?.kind === "menu") {
    content = (
      <Modal key="menu" title={site.name} onClose={closeDialog} variant="drawer-left">
        <nav className="menu-links" aria-label="Mobile navigation">
          {menuNav.map((item, i) => (
            <Link key={item.href} href={item.href} onClick={closeDialog} aria-current={pathname === item.href ? "page" : undefined}>
              {item.label}
              <span>{String(i + 1).padStart(2, "0")}</span>
            </Link>
          ))}
        </nav>
        <div className="menu-foot">
          <span className="micro muted">{site.motto}</span>
          <ThemeToggle />
        </div>
      </Modal>
    );
  } else if (dialog?.kind === "size") {
    content = (
      <Modal key="size" title="Sizing & fit" onClose={closeDialog}>
        <SizeGuideContent product={dialog.productId ? getProduct(dialog.productId) : undefined} onNavigate={closeDialog} />
      </Modal>
    );
  } else if (dialog?.kind === "zoom") {
    const a = getAsset(dialog.assetId);
    content = (
      <Modal key={`zoom-${a.id}`} title="The original frame" onClose={closeDialog} variant="lightbox">
        <figure>
          <Media id={a.id} ratio="auto" sizes="92vw" width={1800} priority />
          <figcaption>
            {a.alt}
            <br />
            <a className="inline-link micro" href={a.original_url} target="_blank" rel="noopener noreferrer">
              Open original image ↗
            </a>
          </figcaption>
        </figure>
      </Modal>
    );
  } else if (dialog?.kind === "newsletter") {
    content = (
      <Modal key="newsletter" title="Join the SZN" onClose={closeDialog}>
        <h3 className="display h-sm">Stay close to what comes next.</h3>
        <p className="muted">First looks, future releases and the next chapter of the Journey. Sign-up is not connected yet; your email will not be sent or saved.</p>
        <PreviewForm submitLabel="Join the list" consentLabel="I understand sign-up is not live yet and nothing will be stored.">
          <Field label="Email address" name="newsletter-email" type="email" full autoComplete="email" />
        </PreviewForm>
      </Modal>
    );
  } else if (dialog?.kind === "checkout") {
    content = (
      <Modal key="checkout" title="Checkout" onClose={closeDialog}>
        <h3 className="display h-sm">Subtotal {formatMoney(subtotal)}</h3>
        <p>
          This is where the production theme hands the real Shopify cart to Shopify checkout. No payment details are requested
          here, and no order has been placed.
        </p>
        <div className="notice">
          Your bag will not transfer. Current price, selected variants, availability, shipping and taxes must be checked on the live
          store.
        </div>
        <a className="btn btn--red btn--wide" href={`${LIVE_STORE}/collections/all`} target="_blank" rel="noopener noreferrer">
          Visit the live collection <span className="arrow" aria-hidden="true">↗</span>
        </a>
      </Modal>
    );
  }

  return (
    <>
      {content}
      <div className={`toast ${toastMessage ? "show" : ""}`} role="status" aria-live="polite">
        {toastMessage}
      </div>
    </>
  );
}
