import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";

const POSTS = [
  {
    slug: "que-es-un-sistema-hvac",
    title: "¿Qué considerar antes de instalar un sistema HVAC industrial?",
    excerpt:
      "Guía práctica de decisiones técnicas: cargas térmicas, eficiencia, ductería, mantenimiento y criterios de selección de equipos.",
    date: "7 de noviembre, 2025",
    category: "Guía técnica",
    available: true,
  },
  {
    slug: "#",
    title: "Mantenimiento preventivo HVAC: cómo reducir paros y costos",
    excerpt: "Análisis editorial preparado por el equipo técnico de JSD. En preparación.",
    date: "En preparación",
    category: "Mantenimiento",
    available: false,
  },
  {
    slug: "#",
    title: "Ductería y ventilación industrial: claves de eficiencia",
    excerpt: "Buenas prácticas en diseño, fabricación e instalación de ductería metálica. En preparación.",
    date: "En preparación",
    category: "Ductería",
    available: false,
  },
];

export function BlogTeaser() {
  return (
    <section id="blog" className="section-pad bg-[color:var(--color-bone)]">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Kicker>Recursos · Guías técnicas</Kicker>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Últimos blogs de interés
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-navy)] hover:text-[color:var(--color-amber)]"
            >
              Ver todo el blog <ArrowRightIcon className="size-3.5" />
            </Link>
          </div>
        </Reveal>

        <RevealStagger className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.08}>
          {POSTS.map((p) => (
            <RevealItem key={p.title}>
              <article
                className={`group flex h-full flex-col justify-between rounded-[var(--radius-xl)] border border-[color:var(--color-ash-200)] bg-[color:var(--color-paper)] p-6 transition-shadow hover:shadow-[var(--shadow-soft)] ${
                  p.available ? "" : "opacity-90"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em]">
                    <span className="text-[color:var(--color-amber)]">{p.category}</span>
                    <span className="text-[color:var(--color-steel)]">{p.date}</span>
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[color:var(--color-ink)]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-[color:var(--color-steel)] leading-relaxed">
                    {p.excerpt}
                  </p>
                </div>
                {p.available ? (
                  <Link
                    href={`/blog/${p.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-navy)] hover:text-[color:var(--color-amber)] transition-transform group-hover:translate-x-1"
                  >
                    Leer artículo <ArrowRightIcon className="size-3.5" />
                  </Link>
                ) : (
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-steel)]">
                    Próximamente
                  </span>
                )}
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}
