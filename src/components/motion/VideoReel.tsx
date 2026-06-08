"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Clip = {
  src: string;
  poster?: string;
  label?: string;
};

/**
 * Reel de videos en loop cross-fade.
 * - Cada clip se reproduce completo; al terminar avanza al siguiente con fade.
 * - Solo carga `preload="auto"` para el clip activo; el resto preload="none".
 * - Pausa automáticamente cuando el reel sale del viewport (IntersectionObserver).
 * - Indicadores en la parte inferior (click para saltar).
 * - Respeta prefers-reduced-motion: muestra solo fallback estático.
 */
export function VideoReel({
  clips,
  fallback,
  className,
  showIndicators = true,
  autoAdvanceMs = 10000,
}: {
  clips: readonly Clip[];
  fallback: string;
  className?: string;
  showIndicators?: boolean;
  autoAdvanceMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(true);
  const reduce = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // IntersectionObserver: pausa cuando sale del viewport
  useEffect(() => {
    if (reduce) return;
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? true),
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduce]);

  // Reproducir + auto-avance al terminar (o por tiempo si el clip es largo)
  useEffect(() => {
    if (reduce) return;
    const v = videoRef.current;
    if (!v) return;

    const next = () => setIndex((i) => (i + 1) % clips.length);
    const onEnded = () => next();
    v.addEventListener("ended", onEnded);

    if (inView) {
      v.play().catch(() => {});
      if (tickRef.current) clearTimeout(tickRef.current);
      tickRef.current = setTimeout(next, autoAdvanceMs);
    } else {
      v.pause();
      if (tickRef.current) clearTimeout(tickRef.current);
    }

    return () => {
      v.removeEventListener("ended", onEnded);
      if (tickRef.current) clearTimeout(tickRef.current);
    };
  }, [index, clips.length, reduce, autoAdvanceMs, inView]);

  if (reduce) {
    return (
      <div
        className={className}
        style={{
          backgroundImage: `url(${fallback})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="img"
        aria-label="JSD Air Systems en operación"
      />
    );
  }

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        <motion.video
          key={clips[index].src}
          ref={videoRef}
          src={clips[index].src}
          poster={clips[index].poster ?? fallback}
          autoPlay
          muted
          playsInline
          preload={index === 0 ? "auto" : "metadata"}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {showIndicators && (
        <div className="pointer-events-auto absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full glass-card">
          {clips.map((c, i) => (
            <button
              key={c.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Mostrar clip ${i + 1}${c.label ? ": " + c.label : ""}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500 cursor-pointer",
                i === index ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
