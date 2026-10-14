"use client";

import { useUI } from "./providers/UIProvider";

export function Newsletter() {
  const { openDialog } = useUI();
  return (
    <section className="container newsletter">
      <div>
        <span className="eyebrow eyebrow--red">Stay close to the next chapter</span>
        <h2 className="display h-xl" style={{ marginTop: 24 }}>
          Join the
          <br />
          <span className="outline-text">SZN.</span>
        </h2>
      </div>
      <div style={{ display: "grid", gap: 24, justifyItems: "start" }}>
        <p>First looks. Future releases. A closer look at the people and process behind UNDR.</p>
        <button className="btn btn--light" onClick={() => openDialog({ kind: "newsletter" })}>
          Get on the list <span className="arrow" aria-hidden="true">↗</span>
        </button>
      </div>
    </section>
  );
}

export function OpenDialogButton({
  kind,
  className = "btn",
  children,
}: {
  kind: "newsletter" | "bag";
  className?: string;
  children: React.ReactNode;
}) {
  const { openDialog } = useUI();
  return (
    <button className={className} onClick={() => openDialog({ kind })}>
      {children}
    </button>
  );
}

export function ZoomButton({ assetId, label, children, className = "" }: { assetId: string; label: string; children: React.ReactNode; className?: string }) {
  const { openDialog } = useUI();
  return (
    <button className={`zoomable ${className}`} onClick={() => openDialog({ kind: "zoom", assetId })} aria-label={label}>
      {children}
    </button>
  );
}
