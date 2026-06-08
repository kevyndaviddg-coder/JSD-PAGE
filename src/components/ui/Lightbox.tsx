"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CloseIcon, ChevronLeftIcon, ChevronRightLargeIcon } from "@/components/ui/Icons";

export type LightboxItem = {
  src: string;
  alt: string;
  caption?: string;
  category?: string;
};

/**
 * Lightbox accesible con navegación teclado (←/→/Esc).
 * Patrón: shadcn Dialog + Headless UI dialog adaptation.
 * Implementación propia con `motion`.
 */
export function Lightbox({
  items,
  startIndex,
  onClose,
}: {
  items: LightboxItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + items.length) % items.length);
      else if (e.key === "ArrowRight") setIndex((i) => (i + 1) % items.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [items.length, onClose]);

  const item = items[index];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={item.caption ?? "Imagen ampliada"}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors cursor-pointer"
        >
          <CloseIcon className="size-6" />
        </button>

        {/* Prev */}
        {items.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i - 1 + items.length) % items.length);
            }}
            aria-label="Anterior"
            className="absolute left-4 sm:left-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <ChevronLeftIcon className="size-6" />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={item.src}
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-6xl max-h-[85vh] w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full aspect-[16/10] max-h-[85vh]">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="100vw"
              className="object-contain rounded-lg"
              priority
            />
          </div>
          {(item.caption || item.category) && (
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 text-white">
              {item.category && (
                <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
                  {item.category}
                </span>
              )}
              {item.caption && (
                <p className="text-sm font-medium">{item.caption}</p>
              )}
              <span className="ml-auto text-xs text-white/60">
                {index + 1} / {items.length}
              </span>
            </div>
          )}
        </motion.div>

        {/* Next */}
        {items.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i + 1) % items.length);
            }}
            aria-label="Siguiente"
            className="absolute right-4 sm:right-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <ChevronRightLargeIcon className="size-6" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
