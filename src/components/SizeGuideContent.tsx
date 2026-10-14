import Link from "next/link";
import type { Product } from "@/data/catalog";

export function SizeGuideContent({ product, onNavigate }: { product?: Product; onNavigate?: () => void }) {
  return (
    <>
      <h3 className="display h-sm">Find the fit that feels right.</h3>
      <p>
        {product?.id === "black"
          ? "The live black hoodie description specifies an oversized fit."
          : "Fit can differ between garments. Confirm the measurements for your chosen hoodie before ordering."}
      </p>
      <p>
        A verified garment measurement chart and model-size details were not available in the retrieved product content. This
        site deliberately does not invent chest widths, lengths, model heights, or size recommendations.
      </p>
      <div className="notice">
        Before launch: add measured chest width, body length and sleeve length for each size, with inches/centimeters and a clear
        measurement diagram.
      </div>
      <Link className="btn btn--wide" href="/pages/contact" onClick={onNavigate}>
        Ask a sizing question <span aria-hidden="true">↗</span>
      </Link>
    </>
  );
}
