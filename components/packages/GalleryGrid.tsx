"use client";

import { useState, useCallback, useEffect } from "react";

export default function GalleryGrid({ images }: { images: string[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => {
    if (lightbox !== null) {
      setLightbox(lightbox > 0 ? lightbox - 1 : images.length - 1);
    }
  }, [lightbox, images.length]);
  const next = useCallback(() => {
    if (lightbox !== null) {
      setLightbox(lightbox < images.length - 1 ? lightbox + 1 : 0);
    }
  }, [lightbox, images.length]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (lightbox === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, close, prev, next]);

  if (!images || images.length === 0) return null;

  const displayImages = images.slice(0, 5);
  const remaining = images.length - 5;

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px]">
        {displayImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className={`relative overflow-hidden ${
              i === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <img
              src={img}
              alt={`Gallery image ${i + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
            {i === 4 && remaining > 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-xl font-bold">+{remaining} more</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={close}>
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute top-6 right-6 text-white/80 hover:text-white"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-6 text-white/80 hover:text-white"
            aria-label="Previous"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <img
            src={images[lightbox]}
            alt={`Gallery image ${lightbox + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-6 text-white/80 hover:text-white"
            aria-label="Next"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <div className="absolute bottom-6 text-white/60 text-sm">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
