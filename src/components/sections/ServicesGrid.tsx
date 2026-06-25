"use client";

/**
 * ServicesGrid v9 — Expanding editorial gallery + Tienda estable.
 *
 * ESTRUCTURA:
 *  - CapacidadesBlock:
 *      Galería editorial expansible con 3 familias en horizontal:
 *      panel activo = collage editorial (imagen principal + 2 thumbs +
 *      título + descripción breve + tags + 1 CTA); paneles colapsados =
 *      imagen dimmed + número grande + nombre vertical.
 *      Controles: flecha prev/next + indicador "01 / 03".
 *      Lógica de expansión inspirada en el Image Accordion de Le Thanh
 *      (21st.dev, similarity 6.669) pero con composición editorial propia.
 *
 *  - TiendaShowcase: visual IDÉNTICO al anterior, sólo refactorizada la
 *    interacción para usar el hook estable y resolver la oscilación.
 *
 * BUG DE OSCILACIÓN (causa raíz identificada):
 *  El componente anterior usaba `onMouseEnter` sobre el <button>, con
 *  hijos absolutos (Image, overlays) que el browser puede tratar como
 *  zonas separadas durante una animación de width de 700ms. Sin hover
 *  intent ni guard `idx === activeIdx`, cada microcruce de boundary
 *  disparaba un setState que reiniciaba la transición y oscilaba.
 *
 * FIX:
 *  Hook `useStableActiveIndex`:
 *   1. Hover intent timer (150ms) antes de activar (cancelable).
 *   2. Activation lock (220ms) tras un cambio — ignora pointer events
 *      durante la transición visual, manteniendo click/keyboard activos.
 *   3. Guard `idx === activeRef.current` evita re-renders innecesarios.
 *   4. Single source of truth: un solo `activeIdx`.
 *   5. Cleanup de timers en unmount + en `cancelHover`.
 *   6. `onPointerEnter` (no `onMouseEnter`) — pointer events unifican
 *      mouse/touch/pen y son más estables.
 *   7. Hit area = `<button>` absoluto z-20 sobre la capa visual.
 *      Hijos visuales = `pointer-events: none` → ningún hijo dispara
 *      su propio pointerenter.
 *   8. Click/keyboard/arrow → vía `setActive` (immediate, sin hover intent).
 *
 * COMPONENTES 21st.dev utilizados:
 *  - Interactive Image Accordion (Le Thanh, similarity 6.669): lógica de
 *    expansión (un panel ancho + N estrechos), caption rotada 90° en
 *    colapsados, gradiente activo. ADAPTADO con flex-grow en lugar de
 *    width fija + composición editorial diferente en active.
 *  - Sliding Tabs (similarity 0.532): mecánica del indicador "01 / 03"
 *    y arrow controls con focus visible ring.
 *
 * UI/UX Pro Max:
 *  - Hover intent (150ms) — patrón "intent-based interaction" para
 *    accordions expansibles. Evita activaciones accidentales.
 *  - Stable hit areas: la capa interactiva no compite con la capa visual.
 *  - Reduced motion: lock y hover intent → 0ms, animaciones instantáneas.
 *  - Touch: tap activa de inmediato (vía onClick). El click es prioridad
 *    sobre hover intent.
 *  - Mínimo 44×44 px en flechas (sm: 44, md+: 48).
 *  - aria-selected/controls + role="tablist"/role="tab" + keyboard nav.
 *
 * Motion:
 *  - flex-grow animado con CSS transition `cubic-bezier(0.16, 1, 0.3, 1)`
 *    400ms — soportado natively por todos los browsers modernos sin
 *    competir con motion.
 *  - AnimatePresence para overlays, thumbs y content del panel activo.
 *  - prefers-reduced-motion: transitions a 0, hover intent a 0.
 */

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { PremiumEyebrow } from "@/components/ui/PremiumEyebrow";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LayersIcon,
  WindIcon,
  ZapIcon,
} from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { serviceFamilies, type ServiceFamily } from "@/lib/site";
import { cn } from "@/lib/utils";
import { TiendaIndustrial } from "@/components/sections/TiendaIndustrial";

const FAMILY_ICONS = {
  wind: WindIcon,
  layers: LayersIcon,
  zap: ZapIcon,
} as const;

/* ════════════════ useStableActiveIndex hook ════════════════ */

interface UseStableActiveIndexOptions {
  hoverDelay?: number;
  lockDelay?: number;
}

function useStableActiveIndex(
  initial: number,
  { hoverDelay = 150, lockDelay = 220 }: UseStableActiveIndexOptions = {},
) {
  const reduce = useReducedMotion();
  const [activeIdx, setActiveIdxState] = useState(initial);

  // Stable refs to avoid stale closures inside event handlers
  const activeRef = useRef(activeIdx);
  activeRef.current = activeIdx;

  const lockedRef = useRef(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHoverTimer = useCallback(() => {
    if (hoverTimerRef.current !== null) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  const clearLockTimer = useCallback(() => {
    if (lockTimerRef.current !== null) {
      clearTimeout(lockTimerRef.current);
      lockTimerRef.current = null;
    }
  }, []);

  const applyActive = useCallback(
    (idx: number) => {
      if (idx === activeRef.current) return; // guard: no-op si ya es activo
      clearHoverTimer();
      setActiveIdxState(idx);
      // Activation lock: bloquea hover intent durante la transición
      lockedRef.current = true;
      clearLockTimer();
      lockTimerRef.current = setTimeout(() => {
        lockedRef.current = false;
        lockTimerRef.current = null;
      }, lockDelay);
    },
    [clearHoverTimer, clearLockTimer, lockDelay],
  );

  const requestHover = useCallback(
    (idx: number) => {
      if (lockedRef.current) return; // ignora hover durante lock
      if (idx === activeRef.current) return; // guard: ya activo
      if (reduce) {
        applyActive(idx);
        return;
      }
      clearHoverTimer();
      hoverTimerRef.current = setTimeout(() => {
        hoverTimerRef.current = null;
        applyActive(idx);
      }, hoverDelay);
    },
    [reduce, applyActive, clearHoverTimer, hoverDelay],
  );

  const cancelHover = useCallback(() => {
    clearHoverTimer();
  }, [clearHoverTimer]);

  const setActive = useCallback(
    (idx: number) => {
      // click/keyboard/arrow: immediate, ignora hover intent + lock
      applyActive(idx);
    },
    [applyActive],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current !== null) clearTimeout(hoverTimerRef.current);
      if (lockTimerRef.current !== null) clearTimeout(lockTimerRef.current);
    };
  }, []);

  return { activeIdx, setActive, requestHover, cancelHover };
}

/* ════════════════ Main ════════════════ */

export function ServicesGrid() {
  return <TiendaIndustrial />;
}

/* ════════════════ Capacidades — editorial gallery ════════════════ */

// Configuración específica por familia: tags cortos + CTA + captions de thumbs
const FAMILY_CONFIG: Array<{
  description: string;
  tags: string[];
  ctaLabel: string;
  ctaHref: string;
  thumbCaptions: Array<{ title: string; short: string }>;
}> = [
  {
    description:
      "Diseño, instalación y mantenimiento de sistemas térmicos industriales y comerciales.",
    tags: ["Climatización", "Instalación", "Mantenimiento"],
    ctaLabel: "Ver servicios HVAC",
    ctaHref: "/servicios/climatizacion-industrial-comercial",
    thumbCaptions: [
      {
        title: "Instalación y puesta en marcha",
        short: "Montaje y arranque de sistemas HVAC.",
      },
      {
        title: "Mantenimiento técnico",
        short: "Servicio preventivo y correctivo.",
      },
    ],
  },
  {
    description:
      "Fabricación e instalación de ductería metálica, líneas de agua helada y sistemas de ventilación industrial.",
    tags: ["Ductería", "Agua helada", "Ventilación"],
    ctaLabel: "Ver servicios de ductería",
    ctaHref: "/servicios/ductos-metalicos",
    thumbCaptions: [
      {
        title: "Agua helada",
        short: "Tuberías y sistemas centrales.",
      },
      {
        title: "Ventilación industrial",
        short: "Extracción y renovación de aire.",
      },
    ],
  },
  {
    description:
      "Corte CNC láser y plasma, piezas, bases y soportes fabricados bajo plano del cliente.",
    tags: ["CNC láser", "CNC plasma", "Piezas a medida"],
    ctaLabel: "Ver fabricación CNC",
    ctaHref: "/servicios/fabricacion-metalica-cnc",
    thumbCaptions: [
      {
        title: "Piezas a la medida",
        short: "Bases, soportes y componentes.",
      },
    ],
  },
];

export function CapacidadesBlock() {
  return (
    <div className="section-pad relative">
      {/* Textura grid sutil — mismo tratamiento continuo del video que la
          presentación de la empresa, sin capa de oscuridad adicional ni
          línea divisoria. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <Container className="relative">
        {/* Compact header */}
        <Reveal>
          <div className="max-w-3xl">
            <PremiumEyebrow>Capacidades técnicas</PremiumEyebrow>
            <h2 className="title-shadow mt-4 font-[family-name:var(--font-display)] text-[26px] font-semibold leading-[1.15] tracking-tight text-white sm:text-[32px] lg:text-[36px]">
              Todo lo necesario para llevar tu proyecto a{" "}
              <span className="text-[color:var(--color-amber)]">
                operación
              </span>
              .
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-white/70 sm:text-[15px]">
              Integramos ingeniería, fabricación e instalación para ejecutar
              cada etapa con continuidad, control y precisión.
            </p>
          </div>
        </Reveal>

        <CapacidadesGallery />
      </Container>
    </div>
  );
}

function CapacidadesGallery() {
  const { activeIdx, setActive, requestHover, cancelHover } =
    useStableActiveIndex(0);
  const reduce = useReducedMotion();
  const total = serviceFamilies.length;

  const goPrev = useCallback(() => {
    setActive((activeIdx - 1 + total) % total);
  }, [activeIdx, setActive, total]);

  const goNext = useCallback(() => {
    setActive((activeIdx + 1) % total);
  }, [activeIdx, setActive, total]);

  const handleKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(total - 1);
    }
  };

  return (
    <div className="mt-10 sm:mt-12">
      {/* Gallery */}
      <div
        role="tablist"
        aria-label="Familias de servicios"
        onKeyDown={handleKey}
        onPointerLeave={cancelHover}
        className="flex flex-row items-stretch gap-2 outline-none sm:gap-3"
      >
        {serviceFamilies.map((family, i) => (
          <FamilyPanel
            key={family.chip}
            family={family}
            index={i}
            isActive={i === activeIdx}
            onHover={() => requestHover(i)}
            onActivate={() => setActive(i)}
          />
        ))}
      </div>

      {/* Controls — arrows + indicator */}
      <div className="mt-6 flex items-center justify-between gap-4 sm:mt-8">
        <ArrowControl
          direction="prev"
          ariaLabel={`Familia anterior: ${serviceFamilies[(activeIdx - 1 + total) % total].chip}`}
          onClick={goPrev}
        />

        <div
          aria-live="polite"
          aria-atomic="true"
          className="flex items-center gap-3 sm:gap-4"
        >
          {/* Número activo con AnimatePresence — naranja protagonista */}
          <div className="relative h-7 w-8 overflow-hidden sm:h-8 sm:w-9">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={activeIdx}
                initial={reduce ? false : { opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: 14 }}
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-display)] text-[22px] font-bold tabular-nums tracking-tight text-[color:var(--color-amber)] sm:text-[26px]"
              >
                {String(activeIdx + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          {/* Línea de progreso ámbar */}
          <span
            aria-hidden
            className="h-px w-12 bg-gradient-to-r from-[color:var(--color-amber)] via-[color:var(--color-amber)]/55 to-[color:var(--color-amber)]/15 sm:w-14"
          />
          <span className="font-[family-name:var(--font-display)] text-[13px] font-semibold tabular-nums uppercase tracking-[0.32em] text-[color:var(--color-amber)]/55 sm:text-[14px]">
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <ArrowControl
          direction="next"
          ariaLabel={`Familia siguiente: ${serviceFamilies[(activeIdx + 1) % total].chip}`}
          onClick={goNext}
        />
      </div>
    </div>
  );
}

/* ──────────── FamilyPanel ──────────── */

function FamilyPanel({
  family,
  index,
  isActive,
  onHover,
  onActivate,
}: {
  family: ServiceFamily;
  index: number;
  isActive: boolean;
  onHover: () => void;
  onActivate: () => void;
}) {
  const reduce = useReducedMotion();
  const config = FAMILY_CONFIG[index];
  const Icon = FAMILY_ICONS[family.icon];
  const num = String(index + 1).padStart(2, "0");

  // Main image + secondary thumbs
  const mainImage = family.services[0].image;
  const thumbs = family.services
    .slice(1, 3)
    .map((s) => ({ src: s.image, alt: s.title }));

  return (
    <div
      role="tab"
      aria-selected={isActive}
      aria-controls={`family-panel-${index}`}
      id={`family-tab-${index}`}
      style={{
        // CSS-only flex-grow transition — no compite con Framer Motion
        // Colapsado más ancho (1.25 en lugar de 1) para que el título completo respire.
        flex: isActive ? "5 1 0%" : "1.25 1 0%",
        transition: reduce
          ? "none"
          : "flex 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={cn(
        "relative isolate h-[440px] min-w-0 overflow-hidden rounded-[var(--radius-xl)] border border-white/10 sm:h-[520px] lg:h-[580px]",
        isActive ? "shadow-[var(--shadow-lift)]" : "shadow-[var(--shadow-soft)]",
      )}
    >
      {/* Visual layer — todos los hijos pointer-events-none */}
      <div className="pointer-events-none absolute inset-0">
        {/* Photo layer — visible solo en estado expandido */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            isActive ? "opacity-100" : "opacity-0",
          )}
        >
          {/* Background image */}
          <Image
            src={mainImage}
            alt=""
            fill
            sizes={
              isActive
                ? "(max-width: 1024px) 75vw, 60vw"
                : "(max-width: 1024px) 16vw, 14vw"
            }
            className={cn(
              "object-cover transition-transform duration-700",
              isActive ? "scale-100" : "scale-[1.08]",
            )}
            priority={index === 0}
          />

          {/* Base dark veil */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[color:var(--color-ink)]/28"
          />

          {/* Bottom gradient legibilidad */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)]/95 via-[color:var(--color-ink)]/30 to-transparent"
          />

          {/* Amber wash al active */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                key="amber"
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 25% 0%, rgba(255,184,28,0.18), transparent 60%)",
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Glass layer — visible solo en estado contraído (mismo acabado
            cristal premium que las tarjetas de capacidades de la
            presentación de la empresa: .glass-card) */}
        <div
          aria-hidden
          className={cn(
            "glass-card absolute inset-0 transition-opacity duration-700",
            isActive ? "opacity-0" : "opacity-100",
          )}
        />

        {/* Top — number + icon */}
        <div className="absolute inset-x-4 top-4 z-10 flex items-start justify-between sm:inset-x-5 sm:top-5">
          <span
            className={cn(
              "font-[family-name:var(--font-display)] font-bold leading-none tabular-nums tracking-tight transition-colors duration-500",
              isActive
                ? "text-[30px] text-[color:var(--color-amber)] sm:text-[36px]"
                : "text-[24px] text-[color:var(--color-amber)] [text-shadow:0_2px_12px_rgba(11,17,32,0.6)] sm:text-[28px]",
            )}
          >
            {num}
          </span>
          <span
            className={cn(
              "items-center justify-center rounded-md p-1.5 backdrop-blur-md transition-colors duration-500",
              isActive
                ? "inline-flex border border-[color:var(--color-amber)]/55 bg-[color:var(--color-amber)]/15 text-[color:var(--color-amber)]"
                // Colapsado en móvil: oculto (saturaba el espacio junto al
                // número). Desde sm+ se conserva el comportamiento actual.
                : "hidden border border-white/25 bg-white/12 text-white sm:inline-flex",
            )}
          >
            <Icon className="size-3.5" />
          </span>
        </div>

        {/* Collapsed-only: título vertical con letras UPRIGHT (no acostadas) */}
        <AnimatePresence>
          {!isActive && (
            <motion.span
              key="vertical-title"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden
              style={{
                writingMode: "vertical-rl",
                textOrientation: "upright",
                letterSpacing: "0.04em",
              }}
              className="absolute left-1/2 top-1/2 max-h-[88%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-[family-name:var(--font-display)] text-[11px] font-bold uppercase leading-none text-white [text-shadow:0_2px_12px_rgba(11,17,32,0.6)] sm:text-[13px] lg:text-[14px]"
            >
              {family.shortLabel}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Active-only: editorial collage (thumbs + content) */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              key="active-content"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="absolute inset-0"
            >
              {/* Top-right collage — thumbs grandes con marco blanco + caption */}
              {thumbs.length > 0 && (
                <div className="absolute right-5 top-14 hidden flex-row gap-4 sm:right-6 sm:top-16 sm:flex sm:gap-5">
                  {thumbs.map((t, ti) => {
                    const caption = config.thumbCaptions[ti];
                    return (
                      <motion.div
                        key={t.src}
                        initial={
                          reduce
                            ? false
                            : { opacity: 0, x: 24, scale: 0.96 }
                        }
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={
                          reduce ? undefined : { opacity: 0, x: 24 }
                        }
                        transition={{
                          duration: 0.5,
                          delay: 0.22 + ti * 0.09,
                          ease: [0.16, 1, 0.3, 1] as [
                            number,
                            number,
                            number,
                            number,
                          ],
                        }}
                        className="pointer-events-auto relative z-30 h-32 w-48 overflow-hidden rounded-[var(--radius-md)] border border-white/15 shadow-[0_22px_46px_-14px_rgba(0,0,0,0.55)] transition-colors duration-300 hover:border-[color:var(--color-amber)]/50 sm:h-40 sm:w-56 lg:h-44 lg:w-60"
                      >
                        <Image
                          src={t.src}
                          alt={caption?.title ?? t.alt}
                          fill
                          sizes="(max-width: 1024px) 224px, 240px"
                          className="object-cover"
                        />
                        {/* Gradient overlay discreto para legibilidad */}
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)]/90 via-[color:var(--color-ink)]/25 to-transparent"
                        />
                        {/* Caption editorial */}
                        {caption && (
                          <div className="absolute inset-x-3 bottom-2.5 text-white">
                            <p className="font-[family-name:var(--font-display)] text-[11px] font-semibold leading-tight [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]">
                              {caption.title}
                            </p>
                            <p className="mt-0.5 text-[10px] leading-snug text-white/80 line-clamp-2">
                              {caption.short}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Bottom — title + desc + tags + CTA */}
              <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                <h3 className="title-shadow font-[family-name:var(--font-display)] text-[20px] font-semibold leading-tight text-white sm:text-[24px] lg:text-[28px]">
                  {family.chip}
                </h3>
                <p className="mt-2 max-w-[42rem] text-[13px] leading-relaxed text-white/85 sm:text-[14px]">
                  {config.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {config.tags.map((tag) => (
                    <li
                      key={tag}
                      className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                {/* CTA — z-30 para que esté por encima del hit area */}
                <Link
                  href={config.ctaHref}
                  className="group/cta pointer-events-auto relative z-30 mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-amber)]/55 bg-[color:var(--color-amber)]/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-amber)] backdrop-blur-md transition-all duration-300 hover:border-[color:var(--color-amber)] hover:bg-[color:var(--color-amber)]/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-amber)]/70"
                >
                  {config.ctaLabel}
                  <ArrowRightIcon className="size-3.5 transition-transform group-hover/cta:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active inset ring ámbar */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[var(--radius-xl)] transition-shadow duration-700",
            isActive
              ? "shadow-[inset_0_0_0_1px_rgba(255,184,28,0.45)]"
              : "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]",
          )}
        />
      </div>

      {/* Hit area — botón único z-20, encima de la capa visual pero debajo del CTA z-30 */}
      <button
        type="button"
        tabIndex={isActive ? 0 : -1}
        aria-label={`Familia ${num}: ${family.chip}`}
        onPointerEnter={onHover}
        onClick={onActivate}
        onFocus={onActivate}
        className={cn(
          "absolute inset-0 z-20 block w-full cursor-pointer rounded-[var(--radius-xl)] outline-none",
          "focus-visible:ring-2 focus-visible:ring-[color:var(--color-amber)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-ink)]",
        )}
      />
    </div>
  );
}

/* ──────────── ArrowControl ──────────── */

function ArrowControl({
  direction,
  ariaLabel,
  onClick,
}: {
  direction: "prev" | "next";
  ariaLabel: string;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        // Reposo: blanco + borde ámbar + icono ámbar.
        "group relative inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[color:var(--color-amber)]/45 bg-white text-[color:var(--color-amber)] outline-none transition-all duration-300",
        // Hover: fondo ámbar + icono blanco + sombra ámbar suave.
        "hover:border-[color:var(--color-amber)] hover:bg-[color:var(--color-amber)] hover:text-white hover:shadow-[0_10px_26px_-10px_rgba(255,184,28,0.55)]",
        // Pressed: ámbar más oscuro, scale leve.
        "active:scale-[0.96] active:bg-[color:var(--color-amber-700)] active:border-[color:var(--color-amber-700)]",
        // Focus visible: ring ámbar.
        "focus-visible:border-[color:var(--color-amber)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-amber)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-ink)]",
        "sm:h-12 sm:w-12",
      )}
    >
      <Icon
        className={cn(
          "size-4 transition-transform duration-300 sm:size-[18px]",
          direction === "prev"
            ? "group-hover:-translate-x-0.5 group-active:-translate-x-1"
            : "group-hover:translate-x-0.5 group-active:translate-x-1",
        )}
      />
    </button>
  );
}
