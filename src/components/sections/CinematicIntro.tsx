"use client";

/**
 * CinematicIntro v2 — Primera experiencia de la Home (arquitectura estable).
 *
 * ARQUITECTURA (Opción A acordada):
 *   <section relative>                         ← altura = suma de escenas
 *     <div sticky top-0 h-screen>              ← VIDEO de fondo, se mantiene
 *       <StickyVideoBackground />                pegado durante toda la intro
 *     </div>
 *     <div relative z-10 -mt-[100vh]>          ← contenido ENCIMA del video,
 *       <HeroScene />                            en FLUJO NORMAL (no absolute)
 *       <AboutScene />
 *       <CapacidadesBlock />
 *       <GalleryScene />
 *     </div>
 *   </section>
 *   → luego la página sigue con <CapabilitiesCNC /> (fondo claro) y un
 *     segundo bloque cinematográfico, <ProcessEvolutionBlock />, que repite
 *     la misma arquitectura (StickyVideoBackground propio) para
 *     <ProcessTimeline /> + <TimelineScene />.
 *
 * Por qué es estable (vs la versión anterior rota):
 *   - NO hay paneles `absolute inset-0` apilados → no hay empalme.
 *   - NO hay fades cruzados entre paneles → cada escena revela sola.
 *   - NO hay scroll horizontal anidado dentro del sticky → timeline funciona.
 *   - NO hay `h-[640vh]` artificial con un solo scrollYProgress global.
 *   - El video sticky acompaña Hero→About→Capacidades→Gallery de forma
 *     natural porque el contenido se monta encima con margin-top negativo.
 *
 * Performance:
 *   - Un solo <video> activo a la vez (crossfade con AnimatePresence).
 *   - preload "auto" solo el primer clip; resto "metadata".
 *   - IntersectionObserver pausa el video cuando la intro sale del viewport.
 *
 * Hero visible desde el primer paint:
 *   - El contenido crítico del Hero usa animaciones CSS (`.intro-reveal`)
 *     que corren al primer paint sin depender de la hidratación de React.
 *   - Las escenas posteriores (fuera del primer viewport) usan `Reveal`
 *     (motion whileInView), donde un initial:hidden no causa blank percibido.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  ArrowRightIcon,
  WhatsAppIcon,
  WindIcon,
  FactoryIcon,
  LayersIcon,
  ZapIcon,
  CheckIcon,
  ChevronDownIcon,
  WrenchIcon,
} from "@/components/ui/Icons";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { heroClips, heroFallback, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CapacidadesBlock } from "@/components/sections/ServicesGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";

/* ═══════════════════════ Sticky video background ═══════════════════ */

function StickyVideoBackground({
  sectionRef,
  clips = heroClips,
  fallback = heroFallback,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
  clips?: ReadonlyArray<{ src: string; label: string }>;
  fallback?: string;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const singleClip = clips.length <= 1;

  // Pausar reproducción cuando la intro sale del viewport (performance).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? true),
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [sectionRef]);

  // Avance del reel + autoplay del clip activo.
  useEffect(() => {
    if (reduce) return;
    const v = videoRef.current;
    if (!v) return;
    const next = () => setIndex((i) => (i + 1) % clips.length);
    v.addEventListener("ended", next);
    if (inView) {
      v.play().catch(() => {});
      if (tickRef.current) clearTimeout(tickRef.current);
      // Cambio más cinematográfico: 12s por clip (fail-safe; `ended` avanza antes).
      tickRef.current = setTimeout(next, 12000);
    } else {
      v.pause();
      if (tickRef.current) clearTimeout(tickRef.current);
    }
    return () => {
      v.removeEventListener("ended", next);
      if (tickRef.current) clearTimeout(tickRef.current);
    };
  }, [index, reduce, inView, clips.length]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[color:var(--color-ink)]">
      {reduce ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fallback})` }}
        />
      ) : (
        <AnimatePresence mode="wait">
          <motion.video
            key={clips[index].src}
            ref={videoRef}
            src={clips[index].src}
            poster={fallback}
            autoPlay
            muted
            loop={singleClip}
            playsInline
            preload={index === 0 ? "auto" : "metadata"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          />
        </AnimatePresence>
      )}

      {/* Overlay permanente para contraste (legibilidad del texto blanco) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-ink)]/72 via-[color:var(--color-ink)]/68 to-[color:var(--color-ink)]/88"
      />
      {/* Refuerzo lateral para los titulares a la izquierda */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-ink)]/55 via-transparent to-transparent"
      />
      {/* Textura grid sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Sin pills de selección de video en el Hero inicial (decisión de la
          iteración: no aportaban y competían con el FAB de WhatsApp). El reel
          avanza solo con crossfade. Un scroll cue invita a bajar (ver HeroScene). */}
    </div>
  );
}

/* ═══════════════════════════ Escena 1 — Hero ═══════════════════════ */

function HeroScene() {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      {/* Padding reducido en pantallas de poca altura (p.ej. 1366×768) para que
          el contenido + el scroll cue quepan holgados dentro del primer viewport. */}
      <Container className="py-32 sm:py-40 [@media(max-height:820px)]:py-20">
        {/* Composición centrada (decisión de diseño: más presencia + balance). */}
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center text-white">
          {/* Badge cápsula (patrón ruixen-ui-hero adaptado): pill glass + dot ámbar */}
          <span className="intro-reveal intro-reveal-1 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/85 backdrop-blur-md">
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-amber)] opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-amber)]" />
            </span>
            HVAC industrial y comercial · ductería · fabricación especializada
          </span>

          <h1 className="intro-blur title-shadow mt-7 font-[family-name:var(--font-display)] text-[42px] font-semibold leading-[1.04] tracking-[-0.025em] text-white sm:text-[60px] lg:text-[80px]">
            Ingeniería HVAC, ductería y{" "}
            <span className="text-[color:var(--color-amber)]">fabricación industrial</span>.
          </h1>

          <p className="intro-reveal intro-reveal-3 title-shadow mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Más de 60 años resolviendo proyectos de climatización,
            mantenimiento, agua helada, ventilación, ductería y fabricación
            CNC para operación industrial y comercial.
          </p>

          <div className="intro-reveal intro-reveal-4 mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <Button
              href={whatsappLink("Hola JSD, quiero cotizar un proyecto.")}
              target="_blank"
              variant="glass"
              size="lg"
              className="group"
            >
              <WhatsAppIcon className="size-5 text-[color:var(--color-whatsapp)]" />
              Cotizar proyecto
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              href="/servicios"
              variant="glassGhost"
              size="lg"
            >
              Ver servicios
            </Button>
          </div>
        </div>
      </Container>

      {/* Scroll cue premium — chevron con bounce (patrón Scroll Progress 21st.dev:
          motion.span animate y:[..] repeat Infinity) dentro de cápsula glass.
          Centrado abajo, se atenúa al empezar a bajar, no choca con WhatsApp. */}
      <ScrollCue />
    </div>
  );
}

function ScrollCue() {
  const reduce = useReducedMotion();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.button
      type="button"
      aria-label="Desliza para conocer más"
      onClick={() =>
        window.scrollTo({ top: window.innerHeight - 8, behavior: "smooth" })
      }
      initial={false}
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? 12 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 cursor-pointer sm:bottom-12"
      style={{ pointerEvents: hidden ? "none" : "auto" }}
    >
      <span className="text-[10px] uppercase tracking-[0.32em] text-white/55">Desliza</span>
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/8 backdrop-blur-md">
        <motion.span
          animate={reduce ? undefined : { y: [2, -2, 2] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/85"
        >
          <ChevronDownIcon className="size-4" />
        </motion.span>
      </span>
    </motion.button>
  );
}

/* ═══════════════════════════ Escena 2 — About ═════════════════════ */

const ABOUT_PILLARS = [
  { icon: WindIcon, label: "Climatización industrial y comercial" },
  { icon: LayersIcon, label: "Ductería propia y tuberías de agua helada" },
  { icon: FactoryIcon, label: "Chillers, ventilación y mantenimiento" },
  { icon: ZapIcon, label: "Fabricación metálica con CNC láser y plasma" },
];

function AboutScene() {
  return (
    <div className="relative py-24 sm:py-32">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[180px_1fr]">
          {/* Tagline lateral (patrón Hero03 editorial) */}
          <Reveal>
            <p className="hidden lg:block text-xs leading-relaxed text-white/65 lg:sticky lg:top-28">
              De climatización industrial a fabricación metálica.
              Una misma empresa, alcance ampliado.
            </p>
          </Reveal>

          <div>
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur">
                Seis décadas de oficio
              </span>
              <h2 className="title-shadow mt-5 font-[family-name:var(--font-display)] text-[40px] font-semibold leading-[1.02] tracking-[-0.02em] text-white sm:text-[56px] lg:text-[72px]">
                Una empresa consolidada que hoy también{" "}
                <span className="text-[color:var(--color-amber)]">fabrica</span>.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                Más de 60 años desarrollando proyectos de climatización y HVAC
                para plantas industriales, edificios comerciales y espacios
                especializados. Hoy ampliamos el alcance con corte CNC láser y
                plasma, ductería propia, estructuras, soportes y piezas a la
                medida bajo plano.
              </p>
            </Reveal>

            <RevealStagger className="mt-10 grid gap-3 sm:grid-cols-2" stagger={0.1}>
              {ABOUT_PILLARS.map(({ icon: Icon, label }) => (
                <RevealItem key={label}>
                  <div className="flex items-start gap-3 rounded-[var(--radius-md)] glass-card p-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[color:var(--color-amber)]/15 text-[color:var(--color-amber)]">
                      <Icon className="size-4" />
                    </span>
                    <span className="text-sm leading-snug text-white/90">{label}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ═══════════════════════════ Escena 3 — Galería ═══════════════════ */

const GALLERY: Array<{ src: string; caption: string; category: string; tall?: boolean }> = [
  {
    src: "/media/jsd/03_climatizacion-industrial-en-nave-de-produccion_8k.jpg",
    caption: "Climatización industrial en nave de producción",
    category: "HVAC INDUSTRIAL",
    tall: true,
  },
  {
    src: "/media/jsd/04_instalacion-de-ducteria-aislada-en-interior-industrial_8k.jpg",
    caption: "Ductería aislada en interior industrial",
    category: "DUCTERÍA",
  },
  {
    src: "/media/jsd/06_montaje-de-ductos-espirales-con-plataforma-elevadora_8k.jpg",
    caption: "Montaje de ductos espirales",
    category: "INSTALACIÓN",
  },
  {
    src: "/media/jsd/01_fabricacion-e-instalacion-de-bases-para-equipos-hvac_8k.jpg",
    caption: "Fabricación de bases para equipos HVAC",
    category: "FABRICACIÓN",
  },
  {
    src: "/media/jsd/02_instalacion-exterior-de-ventilacion-industrial_8k.jpg",
    caption: "Instalación exterior de ventilación industrial",
    category: "VENTILACIÓN",
  },
];

// Variants repetibles (entrada + salida) para las cards de evidencia.
// Patrón Reveal con once:false → animan al entrar y al salir del viewport,
// tanto bajando como subiendo. Reemplaza el RevealStagger (once:true) que
// solo corría una vez. Stagger se logra con delay por índice.
const galleryCardVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.985, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: i * 0.09,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

function GalleryScene() {
  return (
    <div className="relative pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <h3
              data-navbar-hide-anchor
              className="font-[family-name:var(--font-display)] text-xl font-semibold text-white sm:text-2xl"
            >
              Obra real, ejecutada por JSD
            </h3>
            <span className="hidden sm:inline text-xs uppercase tracking-[0.22em] text-white/55">
              Evidencia visual
            </span>
          </div>
        </Reveal>

        {/* Bento: 1 grande (tall) + 3 en columna. Cards premium case-study. */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:auto-rows-[200px]">
          {GALLERY.map((g, i) => (
            <GalleryCard key={g.src} item={g} index={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}

/**
 * GalleryCard — card premium de evidencia visual (case-study).
 *
 * Patrones 21st.dev adoptados:
 *  - GradientCard (similarity 0.789): coordinación de hover con variants
 *    rest/hover + badge chip con dot.
 *  - AnimatedFeatureCard: índice mono + tag chip + panel de contenido con
 *    backdrop-blur al pie.
 *
 * Animación REPETIBLE (entrada + salida):
 *  - `initial="hidden" whileInView="visible"` con
 *    `viewport={{ once: false, amount: 0.35 }}` → la card anima al entrar y
 *    al salir del viewport, bajando y subiendo. No queda estática.
 *  - Respeta `prefers-reduced-motion` (sin transform/blur, solo visible).
 */
function GalleryCard({
  item,
  index,
}: {
  item: (typeof GALLERY)[number];
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.figure
      custom={index}
      variants={reduce ? undefined : galleryCardVariants}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: false, amount: 0.35 }}
      whileHover={reduce ? undefined : { y: -5 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative h-full min-h-[200px] cursor-pointer overflow-hidden rounded-[var(--radius-lg)]",
        "border border-white/12 shadow-[var(--shadow-lift)]",
        // Borde-glow ámbar muy sutil al hover
        "transition-[border-color,box-shadow] duration-500 hover:border-[color:var(--color-amber)]/45",
        item.tall && "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2",
      )}
    >
      <Image
        src={item.src}
        alt={item.caption}
        fill
        sizes="(max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
      />

      {/* Overlay gradiente — más oscuro abajo para legibilidad */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)]/92 via-[color:var(--color-ink)]/25 to-transparent"
      />
      {/* Velo extra que se intensifica al hover */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[color:var(--color-ink)]/0 transition-colors duration-500 group-hover:bg-[color:var(--color-ink)]/15"
      />

      {/* Top row: categoría chip + índice mono */}
      <div className="absolute inset-x-3 top-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-amber)]" />
          {item.category}
        </span>
        <span className="font-[family-name:var(--font-display)] text-[11px] font-bold text-white/45">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom: panel glass con caption + "obra real" revelado al hover */}
      <figcaption className="absolute inset-x-3 bottom-3">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-amber)] opacity-0 -translate-y-1 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
          Obra real
        </span>
        <span className="mt-1 block text-[12px] font-medium leading-snug text-white title-shadow">
          {item.caption}
        </span>
      </figcaption>
    </motion.figure>
  );
}

/* ═══════════════════════ Escena 4 — Timeline vertical ═════════════ */

/**
 * ERAS — narrativa real de evolución JSD (6 etapas).
 *
 * Lenguaje concreto del cliente (sin claims inventados):
 *  · No menciona hospitales / clientes / número de proyectos / 24/7 / certificaciones
 *    / cobertura / fechas históricas que no existan en el sitio.
 *  · Cada etapa incluye 3 keywords técnicas reales que el visitante industrial
 *    reconoce (HVAC, agua helada, CNC, etc.).
 */
type Era = {
  n: string;
  era: string;
  title: string;
  body: string;
  image: string;
  icon: typeof FactoryIcon;
  keywords: [string, string, string];
};

const ERAS: Era[] = [
  {
    n: "01",
    era: "Base técnica",
    title: "Climatización industrial y comercial",
    body:
      "Origen como casa especializada en climatización. Levantamiento técnico en sitio, dimensionamiento de equipos y operación HVAC en plantas, talleres y comercios.",
    image: "/media/jsd/PHOTO-2023-03-06-11-21-00-17.jpg",
    icon: WindIcon,
    keywords: ["Levantamiento técnico", "HVAC", "Climatización"],
  },
  {
    n: "02",
    era: "Escala industrial",
    title: "Instalación y puesta en marcha",
    body:
      "Expansión a proyectos industriales y comerciales con montaje, conexión, balanceo y puesta en marcha bajo supervisión propia en obra.",
    image: "/media/jsd/03_climatizacion-industrial-en-nave-de-produccion_8k.jpg",
    icon: FactoryIcon,
    keywords: ["Instalación", "Puesta en marcha", "Supervisión en obra"],
  },
  {
    n: "03",
    era: "Integración técnica",
    title: "Ductería metálica y tuberías de agua helada",
    body:
      "Integración de ductería metálica rectangular, circular y espiral, además de tuberías de agua helada como parte del mismo alcance, fabricadas y montadas por personal técnico propio.",
    image: "/media/jsd/04_instalacion-de-ducteria-aislada-en-interior-industrial_8k.jpg",
    icon: LayersIcon,
    keywords: ["Ductería metálica", "Agua helada", "Personal propio"],
  },
  {
    n: "04",
    era: "Operación continua",
    title: "Mantenimiento preventivo y correctivo",
    body:
      "Servicios programados para clientes con operación industrial: diagnóstico, intervención correctiva y seguimiento técnico de equipos HVAC en sitio.",
    image: "/media/jsd/06_montaje-de-ductos-espirales-con-plataforma-elevadora_8k.jpg",
    icon: WrenchIcon,
    keywords: ["Preventivo", "Correctivo", "Soporte programado"],
  },
  {
    n: "05",
    era: "Nuevo alcance",
    title: "Fabricación metálica y corte CNC",
    body:
      "Incorporación de corte CNC láser y plasma para fabricar ductería propia, estructuras, soportes, bases y piezas a la medida bajo plano del cliente.",
    image: "/media/jsd/01_fabricacion-e-instalacion-de-bases-para-equipos-hvac_8k.jpg",
    icon: ZapIcon,
    keywords: ["CNC láser", "CNC plasma", "Piezas a medida"],
  },
  {
    n: "06",
    era: "Hoy",
    title: "Ingeniería, fabricación e instalación coordinadas",
    body:
      "Una sola operación coordina ingeniería, fabricación y montaje desde el mismo equipo técnico, sin proveedores intermedios y con trazabilidad completa de obra.",
    image: "/media/jsd/09_sistema-de-ductos-industriales-en-nave_8k.jpg",
    icon: CheckIcon,
    keywords: ["Ingeniería", "Fabricación", "Instalación"],
  },
];

/**
 * TimelineScene — Línea de evolución premium.
 *
 * Patrones 21st.dev adoptados (implementación real):
 *  · "Modern Timeline" — timeline vertical con línea estática + línea de
 *    progreso. Aquí la línea de progreso está **bound al scrollYProgress**
 *    del contenedor (useScroll + useTransform), no a un viewport once:true.
 *    Eso hace que la línea suba/baje fielmente con el scroll del usuario.
 *  · "Scroll Progress" — la línea ámbar es la barra de progreso de la sección.
 *  · "Active Node Detection" / "Spotlight Card" — cada etapa detecta su propio
 *    `useInView` con margin de ±40% del viewport. El ítem "activo" obtiene:
 *      – halo ámbar detrás del avatar (blur),
 *      – ring ámbar en el avatar,
 *      – número 01–06 que pasa de white/30 → ámbar,
 *      – border de la card con ámbar/30 + shadow-lift,
 *      – velo oscuro del avatar se atenúa (la foto se "ilumina").
 *  · "GradientCard hover" — radial gradient ámbar sutil en hover sobre la card.
 *  · "Animated Steps icon" — el icono del chip hace un micro tilt al activarse.
 *
 * Motion repetible:
 *  · Cada etapa: `whileInView` con `viewport={{ once: false, amount: 0.3 }}`
 *    → anima al entrar Y al salir del viewport, en ambos sentidos del scroll.
 *  · La línea de progreso reacciona en tiempo real al scroll (no se queda fija).
 *  · El active state cambia mientras el ítem entra/sale → siempre vivo.
 *
 * Reduced motion:
 *  · Todas las animaciones se desactivan (initial=false, sin scale/rotate),
 *    la línea de progreso queda llena (scaleY=1) para no parecer rota.
 */
export function TimelineScene() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Progreso de scroll local del contenedor del timeline (no de toda la página).
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 25%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative pt-14 pb-28 sm:pt-20 sm:pb-36">
      {/* Refuerzo de oscuridad local para legibilidad — gradient vertical
          que arranca transparente arriba (los videos siguen visibles y en
          movimiento, sin corte horizontal duro contra la escena previa) y
          alcanza ink/55 hacia el centro. Conserva el contraste necesario
          para el timeline sin oscurecer las cards superiores. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,17,32,0) 0%, rgba(11,17,32,0.18) 18%, rgba(11,17,32,0.42) 45%, rgba(11,17,32,0.55) 75%, rgba(11,17,32,0.55) 100%)",
        }}
      />
      <Container className="relative">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur">
            Línea de evolución
          </span>
          <h2 className="title-shadow mt-5 max-w-3xl font-[family-name:var(--font-display)] text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-[48px] lg:text-[56px]">
            De climatización industrial a{" "}
            <span className="text-[color:var(--color-amber)]">fabricación a la medida</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/65 sm:text-base">
            Seis etapas que resumen cómo JSD pasó de ser una casa de
            climatización a una operación integrada de ingeniería, fabricación
            y montaje.
          </p>
        </Reveal>

        <div ref={containerRef} className="relative mt-14 max-w-4xl sm:mt-16">
          {/* Rail: línea estática + línea de progreso bound al scroll + glow */}
          <div
            aria-hidden
            className="absolute left-[27px] top-2 bottom-2 w-px bg-white/[0.12] sm:left-[34px]"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: reduce ? 1 : lineScaleY }}
            className="absolute left-[27px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-[color:var(--color-amber)] via-[color:var(--color-amber)]/85 to-[color:var(--color-amber)]/40 sm:left-[34px]"
          />
          {/* glow blur de refuerzo */}
          <motion.div
            aria-hidden
            style={{ scaleY: reduce ? 1 : lineScaleY }}
            className="absolute left-[25px] top-2 bottom-2 w-[5px] origin-top bg-[color:var(--color-amber)]/30 blur-[3px] sm:left-[32px]"
          />

          <ul className="relative space-y-7 sm:space-y-9">
            {ERAS.map((e, i) => (
              <TimelineItem key={e.n} era={e} index={i} reduce={!!reduce} />
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}

function TimelineItem({
  era,
  index,
  reduce,
}: {
  era: Era;
  index: number;
  reduce: boolean;
}) {
  const itemRef = useRef<HTMLLIElement | null>(null);
  // Active state: el ítem está "activo" cuando su centro entra ±40% del viewport.
  // once:false → la activación entra y sale al scrollear arriba y abajo.
  const isActive = useInView(itemRef, {
    margin: "-40% 0px -40% 0px",
    once: false,
  });
  const Icon = era.icon;

  return (
    <motion.li
      ref={itemRef}
      initial={reduce ? false : { opacity: 0, x: -14, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 0.55,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="relative flex items-start gap-5 sm:gap-7"
    >
      {/* Nodo / avatar con halo activo */}
      <div className="relative z-10 shrink-0">
        {/* Halo ámbar — solo visible cuando el ítem está activo */}
        <motion.span
          aria-hidden
          animate={{
            opacity: isActive && !reduce ? 0.85 : 0,
            scale: isActive && !reduce ? 1 : 0.6,
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 -m-2 rounded-full bg-[color:var(--color-amber)]/35 blur-md"
        />
        <motion.div
          animate={{ scale: isActive && !reduce ? 1.04 : 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: 56, height: 56 }}
          className={cn(
            "relative overflow-hidden rounded-full border-2 border-[color:var(--color-ink)] shadow-[var(--shadow-soft)] ring-2 transition-[box-shadow,border-color] duration-500 sm:!h-[70px] sm:!w-[70px]",
            isActive
              ? "ring-[color:var(--color-amber)] shadow-[0_0_28px_-4px_rgba(255,184,28,0.55)]"
              : "ring-white/20",
          )}
        >
          <Image
            src={era.image}
            alt={era.title}
            fill
            sizes="70px"
            className="object-cover"
          />
          {/* Velo que se atenúa al activar — la foto "se enciende" */}
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              isActive ? "bg-[color:var(--color-ink)]/0" : "bg-[color:var(--color-ink)]/45",
            )}
          />
        </motion.div>
      </div>

      {/* Card glass premium */}
      <motion.div
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "group relative flex-1 overflow-hidden rounded-[var(--radius-xl)] glass-card p-5 transition-[border-color,box-shadow] duration-500 sm:p-7",
          isActive
            ? "border-[color:var(--color-amber)]/30 shadow-[var(--shadow-lift)]"
            : "border-white/[0.08]",
        )}
      >
        {/* Radial gradient ámbar sutil al hover (patrón GradientCard) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(255,184,28,0.10), transparent 55%)",
          }}
        />

        {/* Top row: chip era con icono + número grande */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur">
            <motion.span
              animate={{ rotate: isActive && !reduce ? [0, 14, 0] : 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-4 w-4 items-center justify-center text-[color:var(--color-amber)]"
            >
              <Icon className="size-3.5" />
            </motion.span>
            {era.era}
          </span>
          <span
            className={cn(
              "font-[family-name:var(--font-display)] text-[28px] font-bold leading-none tracking-tight transition-colors duration-500 sm:text-[34px]",
              isActive ? "text-[color:var(--color-amber)]" : "text-white/25",
            )}
          >
            {era.n}
          </span>
        </div>

        {/* Title + body */}
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold leading-tight text-white sm:text-[22px]">
          {era.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-white/75 sm:text-[15px]">
          {era.body}
        </p>

        {/* Keyword chips — lenguaje técnico real */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {era.keywords.map((k) => (
            <span
              key={k}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/65"
            >
              {k}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.li>
  );
}

/* ═══════════════════════════════ Main ═════════════════════════════ */

export function CinematicIntro() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      aria-label="Introducción JSD Air Systems"
      className="relative isolate bg-[color:var(--color-ink)] text-white"
    >
      {/* Video de fondo sticky: ocupa 100vh de flujo y queda pegado top:0
          mientras el contenido scrollea por encima. */}
      <div className="sticky top-0 h-screen w-full">
        <StickyVideoBackground sectionRef={sectionRef} />
      </div>

      {/* Contenido en FLUJO NORMAL, montado encima del video con -mt-[100vh] */}
      <div className="relative z-10 -mt-[100vh]">
        <HeroScene />
        <AboutScene />
        <CapacidadesBlock />
        <GalleryScene />
      </div>
    </section>
  );
}

/* ═══════════ Segundo bloque cinematográfico — Proceso + Evolución ═══════ */

const PROCESS_CLIPS = [
  {
    src: "/media/jsd/video/proceso-campo.mp4",
    label: "Proceso de cotización y trabajo en campo",
  },
];

/**
 * ProcessEvolutionBlock — reutiliza la misma arquitectura sticky-video que
 * CinematicIntro (StickyVideoBackground compartido) para que "Proceso de
 * cotización" y "Línea de evolución" compartan una única instancia continua
 * de video, sin reiniciarse entre ambas escenas.
 */
export function ProcessEvolutionBlock() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      aria-label="Proceso de cotización y línea de evolución JSD"
      className="relative isolate bg-[color:var(--color-ink)] text-white"
    >
      <div className="sticky top-0 h-screen w-full">
        <StickyVideoBackground sectionRef={sectionRef} clips={PROCESS_CLIPS} />
      </div>

      <div className="relative z-10 -mt-[100vh]">
        <ProcessTimeline />
        <TimelineScene />
      </div>
    </section>
  );
}
