import Image from "next/image";

export interface GalleryImage {
  src: string;
  w: number;
  h: number;
  alt: string;
}

/**
 * Full-bleed swipeable gallery — CSS scroll-snap only, zero JS.
 *
 * The "n / N" counter is rendered per slide and travels with it, which gives
 * a live position indicator without a scroll listener. First image is
 * priority (it is the LCP on detail pages); the rest lazy-load.
 */
export default function Gallery({ images, title }: { images: GalleryImage[]; title: string }) {
  return (
    <div
      className="gt-rail flex overflow-x-auto snap-x snap-mandatory bg-[var(--gt-navy)]"
      role="region"
      aria-label={`${title} — photo gallery`}
    >
      {images.map((img, i) => (
        <div
          key={img.src}
          className="relative shrink-0 w-full snap-start h-[280px] sm:h-[380px] lg:h-[460px]"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="100vw"
            priority={i === 0}
            loading={i === 0 ? undefined : "lazy"}
            className="object-contain"
          />
          <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] tabular-nums px-2.5 py-1 rounded-sm">
            {i + 1} / {images.length}
          </span>
        </div>
      ))}
    </div>
  );
}
