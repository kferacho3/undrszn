import type { Metadata } from "next";
import Link from "next/link";
import { SizeGuideContent } from "@/components/SizeGuideContent";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Sizing & fit" };

export default function SizeGuidePage() {
  return (
    <>
      <PageIntro kicker="Customer care / Sizing" title="Get the fit right." body="Clear measurements belong beside every garment — not hidden behind a guess." />
      <section className="container legal">
        <nav className="legal__nav" aria-label="Sizing links">
          <Link href="/products/dirty-rodman-hoodie">Black hoodie</Link>
          <Link href="/products/deluxe-dirty-rodamn">Cream Deluxe</Link>
          <Link href="/pages/contact">Ask a sizing question</Link>
        </nav>
        <div className="legal__body">
          <SizeGuideContent />
          <h2>What the finished guide will include</h2>
          <p>
            Measured garment width, length and sleeve length; a diagram of where to measure; a unit switch; and verified model height
            and worn size next to the relevant photograph.
          </p>
          <p>No customer measurements are collected here.</p>
        </div>
      </section>
    </>
  );
}
