import type { MemberImage } from "@/data/members";

type MembersImageProps = {
  image: MemberImage;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/** Local responsive derivatives. Original concept imagery is preserved without alteration. */
export function MembersImage({ image, className = "", priority = false, sizes = "(max-width: 700px) 100vw, 50vw" }: MembersImageProps) {
  return (
    <span className={`members-image ${image.screenshotCrop ? "members-image--screenshot" : ""} ${className}`}>
      <img
        className="members-image__img"
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={{ objectFit: image.fit, objectPosition: image.objectPosition }}
      />
    </span>
  );
}
