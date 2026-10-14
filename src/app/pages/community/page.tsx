import type { Metadata } from "next";
import Link from "next/link";
import { Media } from "@/components/Media";
import { PageIntro } from "@/components/ui";
import { applicationPath, roles } from "@/data/roles";

export const metadata: Metadata = { title: "Join the SZN", description: "Ambassadors, models, sales representatives and content creators: bring your own energy to UNDR." };

export default function CommunityPage() {
  return (
    <>
      <PageIntro
        kicker="The people behind the SZN"
        title={
          <>
            Bring your
            <br />
            own energy.
          </>
        }
        body="A place for the people who connect with the message and want to help shape what comes next."
      />
      <section className="roles" aria-label="Open roles">
        {roles.map((r, i) => (
          <article className="role reveal" key={r.slug} style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
            <span className="micro red-text">0{i + 1}</span>
            <h2>{r.title}</h2>
            <p>{r.text}</p>
            <Link className="link-arrow" href={applicationPath(r)}>
              Apply ↗
            </Link>
          </article>
        ))}
      </section>
      <section className="container section">
        <div className="split">
          <Media id="bts-pair" ratio="5 / 4" />
          <div className="split__copy reveal">
            <span className="eyebrow eyebrow--red">Wear it your way</span>
            <h2 className="display h-lg">
              The next frame
              <br />
              could be yours.
            </h2>
            <p>Show the brand your perspective. Community photographs are only featured after permission and review.</p>
            <Link className="link-arrow" href="/pages/content-creator-application">
              Share your perspective ↗
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
