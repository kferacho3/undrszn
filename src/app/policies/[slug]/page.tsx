import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/ui";
import { LIVE_STORE } from "@/data/catalog";
import { policies } from "@/data/policies";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const policy = policies[(await params).slug];
  return policy ? { title: policy.title } : {};
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) notFound();
  return (
    <>
      <PageIntro kicker="Customer care / Information" title={`${policy.title}.`} />
      <section className="container legal">
        <nav className="legal__nav" aria-label="Customer care policies">
          {Object.entries(policies).map(([s, p]) => (
            <Link key={s} href={`/policies/${s}`} aria-current={s === slug ? "page" : undefined}>
              {p.title}
            </Link>
          ))}
          <Link href="/pages/contact">Send an inquiry</Link>
        </nav>
        <article className="legal__body">
          <div className="notice">{policy.note}</div>
          {policy.sections.map(([h, p]) => (
            <div key={h} style={{ display: "grid", gap: 12 }}>
              <h2>{h}</h2>
              <p>{p}</p>
            </div>
          ))}
          <a className="btn" href={`${LIVE_STORE}/policies/${slug}`} target="_blank" rel="noopener noreferrer">
            Read the full current policy <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </article>
      </section>
    </>
  );
}
