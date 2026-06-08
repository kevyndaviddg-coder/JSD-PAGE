import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { ArrowRightIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Blog — Recursos y guías técnicas HVAC",
  description:
    "Artículos, guías y recursos sobre sistemas HVAC industriales, mantenimiento, tuberías de agua helada y fabricación metálica.",
};

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

export default function BlogPage() {
  return (
    <>
      <PageHero
        kicker="Blog y recursos"
        title="Recursos y guías técnicas HVAC"
        subtitle="Artículos breves, casos prácticos y recomendaciones del equipo técnico de JSD."
        image="/media/jsd/08_ducteria-expuesta-para-oficinas-comerciales_8k.jpg"
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Blog" }]}
      />

      <Section variant="default">
        <Container>
          <RevealStagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((p) => (
              <RevealItem key={p.title}>
                <article className={`flex h-full flex-col justify-between rounded-[var(--radius-xl)] border border-[color:var(--color-ash-200)] bg-[color:var(--color-paper)] p-6 ${p.available ? "" : "opacity-85"}`}>
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-amber)]">
                      <span>{p.category}</span>
                      <span className="text-[color:var(--color-steel)]">{p.date}</span>
                    </div>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[color:var(--color-ink)]">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm text-[color:var(--color-steel)] leading-relaxed">{p.excerpt}</p>
                  </div>
                  {p.available ? (
                    <Link
                      href={`/blog/${p.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-navy)] hover:text-[color:var(--color-amber)]"
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

          <Reveal>
            <p className="mt-12 max-w-2xl text-sm text-[color:var(--color-steel)] leading-relaxed">
              Estamos preparando más artículos. Si quieres recibir avisos cuando
              publiquemos nuevos recursos, escríbenos por WhatsApp y te
              agregamos a la lista interna.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
