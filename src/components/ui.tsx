import type { ReactNode } from "react";

export function PageIntro({ kicker, title, body, children }: { kicker: string; title: ReactNode; body?: ReactNode; children?: ReactNode }) {
  return (
    <section className="page-intro container">
      <span className="eyebrow eyebrow--red">{kicker}</span>
      <div className="page-intro__row">
        <h1 className="display h-xl">{title}</h1>
        {body ? <p>{body}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function Accordion({ title, children, open = false }: { title: string; children: ReactNode; open?: boolean }) {
  return (
    <details className="accordion" open={open}>
      <summary>{title}</summary>
      <div className="accordion__body">{children}</div>
    </details>
  );
}

export function Price({ price, compareAt }: { price: number; compareAt: number | null }) {
  const fmt = (c: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(c / 100);
  return (
    <div className="price">
      <span>{fmt(price)}</span>
      {compareAt ? (
        <>
          <del>
            <span className="sr-only">Was </span>
            {fmt(compareAt)}
          </del>
        </>
      ) : null}
    </div>
  );
}

export function SectionHead({ kicker, title, children }: { kicker: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow eyebrow--red">{kicker}</span>
        <h2 className="display h-lg">{title}</h2>
      </div>
      {children}
    </div>
  );
}
