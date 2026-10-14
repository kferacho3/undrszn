import type { Metadata } from "next";
import Link from "next/link";
import { Accordion, PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Help" };

export default function HelpPage() {
  return (
    <>
      <PageIntro kicker="Customer care" title="A little clarity." />
      <section className="container" style={{ maxWidth: 980, paddingBlock: "48px 120px" }}>
        <Accordion title="How do I choose a size?" open>
          <Link href="/pages/size-guide">Visit sizing &amp; fit.</Link> Verified garment measurements still need to be supplied.
        </Accordion>
        <Accordion title="When will my order ship?">
          <Link href="/policies/shipping-policy">Read shipping information.</Link> Processing and delivery are separate.
        </Accordion>
        <Accordion title="Can I exchange my size?">
          <Link href="/policies/refund-policy">Read exchange conditions.</Link> An exchange is conditional, not guaranteed.
        </Accordion>
        <Accordion title="How can I reach the brand?">
          <Link href="/pages/contact">Open customer care.</Link>
        </Accordion>
        <Accordion title="Can I apply to work with the brand?">
          <Link href="/pages/community">Explore the four role categories.</Link>
        </Accordion>
        <Accordion title="Where can I watch the Journey film?">
          <Link href="/pages/journey">On the Journey page.</Link> The campaign films live on the{" "}
          <Link href="/pages/behind-the-scenes-dirty-rodman">campaign page</Link>.
        </Accordion>
      </section>
    </>
  );
}
