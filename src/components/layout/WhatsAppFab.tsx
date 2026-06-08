"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Floating WhatsApp button.
 * - Microinteracción de entrada con motion.
 * - Detecta cuando el footer es visible y se sube ~96px para no tapar el bloque legal.
 * - Respeta prefers-reduced-motion (sin pulse).
 */
export function WhatsAppFab() {
  const [footerVisible, setFooterVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const obs = new IntersectionObserver(
      (entries) => setFooterVisible(entries[0]?.isIntersecting ?? false),
      { threshold: 0, rootMargin: "0px 0px -32px 0px" },
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir por WhatsApp a ${site.name}`}
      initial={reduce ? false : { opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduce ? undefined : { scale: 1.08 }}
      whileTap={reduce ? undefined : { scale: 0.95 }}
      style={{
        bottom: footerVisible ? "112px" : undefined,
      }}
      className={cn(
        "group fixed z-40 right-4 sm:right-7 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-whatsapp)] text-white shadow-[var(--shadow-lift)] transition-[bottom] duration-500",
        !footerVisible && "bottom-4 sm:bottom-7",
      )}
    >
      {!reduce && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-[color:var(--color-whatsapp)] opacity-40 motion-safe:animate-ping"
        />
      )}
      <WhatsAppIcon className="relative size-6" />
      <span className="sr-only">WhatsApp</span>
    </motion.a>
  );
}
