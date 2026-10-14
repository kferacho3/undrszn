import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui";
import { AUDIT_DATE, assets, products } from "@/data/catalog";
import { filmIsReady, films } from "@/data/films";
import { policies } from "@/data/policies";
import { applicationPath, roles } from "@/data/roles";

export const metadata: Metadata = { title: "Site notes" };

const routes = [
  "/",
  "/collections/all",
  ...products.map((p) => `/products/${p.handle}`),
  "/pages/journey",
  "/pages/behind-the-scenes-dirty-rodman",
  "/pages/lookbook",
  "/pages/about-undr-rated-szn",
  "/pages/community",
  ...roles.map(applicationPath),
  "/pages/contact",
  "/pages/size-guide",
  "/pages/help",
  ...Object.keys(policies).map((s) => `/policies/${s}`),
  "/search",
  "/cart",
  "/account",
  "/this-page-does-not-exist",
];

export default function NotesPage() {
  return (
    <>
      <PageIntro kicker={`Site notes / snapshot ${AUDIT_DATE}`} title="What’s connected." body="A complete dark-first storefront with working local interactions, built on the brand’s original published media." />
      <article className="container notes">
        <h2>What works</h2>
        <p>
          Every page and route, navigation, both product pages, photograph switching and enlargement, collection filters, on-body /
          product photograph modes, lookbook filtering, product search, size selection, a persistent local bag with quantity changes and
          removal, accordions, mobile navigation, a dark/light switch, the film player and accessible form validation.
        </p>

        <h2>Films</h2>
        <p>
          Each film has a designed slot. Until a compressed file is registered in <code>src/data/films.ts</code>, the slot shows an
          honest “in the edit” state over a still — never a fake play button. See <code>docs/VIDEO_INTEGRATION.md</code>.
        </p>
        <div className="qa-table-wrap">
          <table className="qa-table">
            <thead>
              <tr>
                <th>Film</th>
                <th>Runtime</th>
                <th>Placed on</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>journey</code> — {films.journey.title}
                </td>
                <td>{films.journey.durationLabel}</td>
                <td>Home, The Journey, Our story</td>
                <td>{filmIsReady(films.journey) ? "Live" : "Awaiting file"}</td>
              </tr>
              <tr>
                <td>
                  <code>campaign-cut</code> — {films["campaign-cut"].title}
                </td>
                <td>{films["campaign-cut"].durationLabel}</td>
                <td>Home, Campaign, The Journey</td>
                <td>{filmIsReady(films["campaign-cut"]) ? "Live" : "Awaiting file"}</td>
              </tr>
              <tr>
                <td>
                  <code>bts-reel</code> — {films["bts-reel"].title}
                </td>
                <td>{films["bts-reel"].durationLabel}</td>
                <td>Home, Campaign, The Journey</td>
                <td>{filmIsReady(films["bts-reel"]) ? "Live" : "Awaiting file"}</td>
              </tr>
              <tr>
                <td><code>interview</code> — {films.interview.title}</td>
                <td>{films.interview.durationLabel}</td>
                <td>The Journey</td>
                <td>{filmIsReady(films.interview) ? "Live" : "Awaiting file"}</td>
              </tr>
              <tr>
                <td>
                  <code>ambient-loop</code> — {films["ambient-loop"].title}
                </td>
                <td>{films["ambient-loop"].durationLabel}</td>
                <td>Available asset; photo hero retained</td>
                <td>{filmIsReady(films["ambient-loop"]) ? "Ready, not mounted" : "Awaiting file"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>What is not connected</h2>
        <p>
          Inventory, real variants, payment, shipping calculation, order creation, account login, application delivery, newsletter
          enrollment and email delivery are not integrated. Policy pages preview the presentation and link to the authoritative live text.
        </p>

        <h2>Commercial corrections before launch</h2>
        <p>
          Resolve the cream hoodie’s 400/420 GSM conflict. Reconcile XXS and 2XS without deleting real variants. Confirm whether October
          30 is a release date, a preorder date, or stale campaign copy. Remove published drafting notes and the support-email placeholder.
          Confirm the final-sale / size-exchange distinction. Supply measured size charts. Confirm image, model, artwork and film
          permissions.
        </p>

        <h2>Every route</h2>
        <div className="notes__links">
          {routes.map((r) => (
            <Link key={r} href={r}>
              {r === "/" ? "home" : r.replace(/^\/(pages|policies|products)\//, "").replace(/^\//, "").replaceAll("-", " ")}
            </Link>
          ))}
        </div>

        <h2>Media inventory</h2>
        <div className="qa-table-wrap">
          <table className="qa-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Type</th>
                <th>Review status</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr key={a.id}>
                  <td>
                    <a href={a.original_url} target="_blank" rel="noopener noreferrer">
                      <code>{a.id}</code> ↗
                    </a>
                  </td>
                  <td>{a.kind.replace("_", " ")}</td>
                  <td>
                    {a.inspection}
                    {a.notes ? (
                      <>
                        <br />
                        {a.notes}
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Production route</h2>
        <p>
          The blueprint (<code>docs/redesign/UNDRSZN_REDESIGN_BLUEPRINT.md</code>) recommends implementing this direction as a custom
          Shopify section-based theme, preserving product handles, customer records, orders, analytics and the existing checkout. Routes
          here already mirror the live Shopify handles.
        </p>
      </article>
    </>
  );
}
