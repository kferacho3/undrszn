import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-intro">
              <span className="eyebrow eyebrow--red">{site.name}</span>
              <p className="display footer-lead">
                Uncomfortable nights
                <br />
                develop resilience.
              </p>
            </div>
            <div className="footer-col">
              <h3>The collection</h3>
              <Link href="/collections/all">Shop all</Link>
              <Link href="/products/dirty-rodman-hoodie">Dirty Rodman / Black</Link>
              <Link href="/products/deluxe-dirty-rodamn">Dirty Rodman / Cream</Link>
              <Link href="/pages/lookbook">Lookbook</Link>
            </div>
            <div className="footer-col">
              <h3>The brand</h3>
              <Link href="/pages/journey">The Journey — film</Link>
              <Link href="/pages/about-undr-rated-szn">Our story</Link>
              <Link href="/pages/behind-the-scenes-dirty-rodman">Behind the scenes</Link>
              <Link href="/pages/community">Join the SZN</Link>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                Instagram ↗
              </a>
            </div>
            <div className="footer-col">
              <h3>Here to help</h3>
              <Link href="/pages/contact">Contact</Link>
              <Link href="/pages/size-guide">Sizing &amp; fit</Link>
              <Link href="/pages/help">Help</Link>
              <Link href="/policies/shipping-policy">Shipping</Link>
              <Link href="/policies/refund-policy">Exchanges</Link>
            </div>
          </div>
          <Link href="/" className="footer-mark" aria-label={`${site.name} home`}>
            UNDR<span>.</span>RATED<span>.</span>SZN
          </Link>
          <div className="footer-bottom">
            <span>© 2026 {site.name}</span>
            <nav aria-label="Legal">
              <Link href="/policies/privacy-policy">Privacy</Link>
              <Link href="/policies/terms-of-service">Terms</Link>
              <Link href="/policies/contact-information">Contact info</Link>
              <Link href="/preview-notes">Site notes</Link>
            </nav>
          </div>
        </div>
      </footer>
      {site.previewMode && (
        <div className="preview-band">
          Preview build · Imagery loads from the brand’s store · No live orders or submissions.{" "}
          <Link href="/preview-notes">What is connected?</Link>
        </div>
      )}
    </>
  );
}
