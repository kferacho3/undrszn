"use client";

import { BagEmpty, BagLines, BagSummary } from "./BagContents";
import { useUI } from "./providers/UIProvider";
import { PageIntro } from "./ui";

export function CartView() {
  const { lines, count } = useUI();
  return (
    <>
      <PageIntro kicker="The collection / Your selection" title="Your bag." body={`${count} ${count === 1 ? "piece" : "pieces"}. No order has been placed.`} />
      <div className="container">
        {lines.length ? (
          <section className="cart-layout">
            <BagLines />
            <BagSummary showFullBagLink={false} />
          </section>
        ) : (
          <BagEmpty />
        )}
      </div>
    </>
  );
}
