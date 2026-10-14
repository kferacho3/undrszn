import type { Metadata } from "next";
import { PageIntro } from "@/components/ui";
import { LIVE_STORE } from "@/data/catalog";

export const metadata: Metadata = { title: "Your account" };

export default function AccountPage() {
  return (
    <>
      <PageIntro kicker="Customer account" title="Back for more?" body="Order history and sign-in stay with the brand’s secure Shopify account experience." />
      <section className="container" style={{ display: "grid", gap: 24, justifyItems: "start", paddingBlock: "64px 128px", maxWidth: 860, marginInline: 0 }}>
        <h2 className="display h-lg">
          Your orders.
          <br />
          Your account.
        </h2>
        <p className="lede">This site never collects login credentials or reads customer orders.</p>
        <a className="btn btn--red" href={`${LIVE_STORE}/customer_authentication/redirect?locale=en&region_country=US`} target="_blank" rel="noopener noreferrer">
          Open the customer account <span className="arrow" aria-hidden="true">↗</span>
        </a>
      </section>
    </>
  );
}
