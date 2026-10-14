import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Media } from "@/components/Media";
import { Field, PreviewForm } from "@/components/PreviewForm";
import { PageIntro } from "@/components/ui";
import { getRoleByPageSlug, roles } from "@/data/roles";

export const dynamicParams = false;

export function generateStaticParams() {
  return roles.map((r) => ({ slug: `${r.slug}-application` }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const role = getRoleByPageSlug((await params).slug);
  return role ? { title: `${role.title} application`, description: role.text } : {};
}

export default async function ApplicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const role = getRoleByPageSlug((await params).slug);
  if (!role) notFound();
  return (
    <>
      <PageIntro kicker="Join the SZN / Application" title={`${role.title}.`} body="Your perspective matters more than a perfect pitch." />
      <section className="container form-layout">
        <div className="form-aside">
          <span className="eyebrow eyebrow--red">What to share</span>
          <h2 className="display h-md">
            Make your
            <br />
            introduction.
          </h2>
          <p>{role.text}</p>
          <p>{role.extra}</p>
          <p className="micro muted">Applications are not connected yet. Nothing is sent or stored.</p>
          <Media id="black-seated" ratio="4 / 5" sizes="(max-width: 860px) 92vw, 30vw" />
        </div>
        <PreviewForm submitLabel="Send application" consentLabel="I understand applications are not connected yet and my information will not be sent or stored.">
          <Field label="Full name" name="name" autoComplete="name" />
          <Field label="Email address" name="email" type="email" autoComplete="email" />
          <Field label="City / region" name="city" autoComplete="address-level2" />
          <Field label={role.needsPortfolio ? "Portfolio link" : "Instagram or portfolio link"} name="portfolio" type="url" required={role.needsPortfolio} placeholder="https://" />
          <Field label="What would you bring to UNDR?" name="message" type="textarea" full />
          <p className="form-note">Production: connect to an approved destination and add role-specific privacy and consent wording. Applicants are never added to the newsletter automatically.</p>
        </PreviewForm>
      </section>
    </>
  );
}
