import type { Metadata } from "next";
import Link from "next/link";
import { Field, PreviewForm } from "@/components/PreviewForm";
import { PageIntro } from "@/components/ui";
import { SUPPORT_EMAIL } from "@/data/catalog";

export const metadata: Metadata = { title: "Contact", description: "Questions about a piece, sizing, an order, or the brand? Start here." };

export default function ContactPage() {
  return (
    <>
      <PageIntro kicker="Customer care" title="Let’s talk." body="Questions about a piece, sizing, an order, or the brand? Start here." />
      <section className="container form-layout">
        <div className="form-aside">
          <span className="eyebrow eyebrow--red">A direct line</span>
          <h2 className="display h-md">
            Real questions.
            <br />
            Real people.
          </h2>
          <p>For an existing order, include the order number so the brand can find the details.</p>
          <p>
            <a className="link-arrow" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL} ↗
            </a>
            <br />
            <small className="muted">Email published in the brand’s current privacy policy.</small>
          </p>
          <p style={{ display: "grid", gap: 4, justifyItems: "start" }}>
            <Link className="link-arrow" href="/policies/shipping-policy">
              Shipping information ↗
            </Link>
            <Link className="link-arrow" href="/policies/refund-policy">
              Size exchanges ↗
            </Link>
            <Link className="link-arrow" href="/pages/size-guide">
              Sizing &amp; fit ↗
            </Link>
          </p>
        </div>
        <PreviewForm submitLabel="Send message" consentLabel="I understand this form is not connected yet; for a real inquiry I will use the email link.">
          <Field label="Your name" name="name" autoComplete="name" />
          <Field label="Email address" name="email" type="email" autoComplete="email" />
          <Field
            label="What is this about?"
            name="topic"
            type="select"
            full
            options={["Sizing & product details", "An existing order", "Shipping", "Size exchange", "Collaboration", "Something else"]}
          />
          <Field label="Order number (when relevant)" name="order" full required={false} />
          <Field label="Your message" name="message" type="textarea" full />
          <p className="form-note">Never send card details by message.</p>
        </PreviewForm>
      </section>
    </>
  );
}
