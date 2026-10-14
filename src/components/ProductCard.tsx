import Link from "next/link";
import { editionOf, productPath, type Product } from "@/data/catalog";
import { Media } from "./Media";
import { Price } from "./ui";

export type ImageMode = "worn" | "studio";

export function ProductCard({ product, mode = "worn", priority = false }: { product: Product; mode?: ImageMode; priority?: boolean }) {
  const studio = mode === "studio";
  const href = productPath(product);
  return (
    <article className="product-card">
      <Link className="product-card__media zoomable" href={href} aria-label={`${product.name}, ${product.color}`}>
        <Media id={studio ? product.flat : product.lead} packshot={studio} ratio="4 / 5" sizes="(max-width: 760px) 48vw, 45vw" priority={priority} />
        <span className="product-card__label" aria-hidden="true">
          {product.color} / {editionOf(product)}
        </span>
        <span className="product-card__cta" aria-hidden="true">
          View piece ↗
        </span>
      </Link>
      <div className="product-card__info">
        <div>
          <h3 className="product-card__name">
            <Link href={href}>{product.name}</Link>
          </h3>
          <p className="product-card__variant">
            <i className={`chip chip--${product.id}`} aria-hidden="true" />
            {product.color} / {editionOf(product)}
          </p>
        </div>
        <Price price={product.price} compareAt={product.compare_at} />
      </div>
    </article>
  );
}
