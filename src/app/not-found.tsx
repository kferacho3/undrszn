import Link from "next/link";
import { PageIntro } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <PageIntro kicker="404 / Off the rack" title="Wrong turn." />
      <section className="container empty">
        <p>This page doesn’t exist. The collection is right here.</p>
        <Link className="btn btn--red" href="/collections/all">
          Back to the collection <span className="arrow" aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}
