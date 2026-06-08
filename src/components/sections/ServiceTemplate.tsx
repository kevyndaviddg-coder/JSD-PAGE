import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ReservedMediaBlock } from "@/components/ui/ReservedMediaBlock";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { CheckIcon, WhatsAppIcon, ArrowRightIcon } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/site";

export type ServiceTemplateProps = {
  intro: { title: string; paragraphs: string[] };
  benefits: string[];
  applications: string[];
  process: { title: string; description: string }[];
  gallery: (string | null)[];
  ctaText?: string;
};

export function ServiceTemplate({
  intro,
  benefits,
  applications,
  process,
  gallery,
  ctaText = "Cotizar este servicio",
}: ServiceTemplateProps) {
  return (
    <>
      {/* Intro */}
      <Section variant="default">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <Kicker>Resumen del servicio</Kicker>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                {intro.title}
              </h2>
              <div className="mt-5 space-y-4 text-[color:var(--color-steel)]">
                {intro.paragraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-ash-200)] bg-[color:var(--color-bone)] p-6 sm:p-8">
                <Kicker>Aplicaciones típicas</Kicker>
                <div className="mt-4 flex flex-wrap gap-2">
                  {applications.map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center rounded-full border border-[color:var(--color-ash-200)] bg-[color:var(--color-paper)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-navy)]"
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3">
                  <Button
                    href={whatsappLink(`Hola JSD, me interesa el servicio de ${intro.title}.`)}
                    target="_blank"
                    variant="whatsapp"
                    size="md"
                  >
                    <WhatsAppIcon className="size-4" />
                    {ctaText}
                  </Button>
                  <Button href="/contacto" variant="outline" size="md">
                    Solicitar visita técnica
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section variant="bone">
        <Container>
          <Reveal>
            <Kicker>Por qué JSD</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl max-w-2xl">
              Beneficios y entregables
            </h2>
          </Reveal>
          <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <RevealItem key={b}>
                <div className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-[color:var(--color-ash-200)] bg-[color:var(--color-paper)] p-5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[color:var(--color-navy)] text-white">
                    <CheckIcon className="size-4" />
                  </span>
                  <p className="text-sm leading-relaxed text-[color:var(--color-ink)]">{b}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* Process */}
      <Section variant="default">
        <Container>
          <Reveal>
            <Kicker>Proceso de trabajo</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl max-w-2xl">
              Cómo lo ejecutamos
            </h2>
          </Reveal>
          <RevealStagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <RevealItem key={p.title}>
                <div className="h-full rounded-[var(--radius-lg)] border border-[color:var(--color-ash-200)] bg-[color:var(--color-paper)] p-6">
                  <div className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[color:var(--color-amber)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-ink)]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-steel)]">
                    {p.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* Gallery */}
      <Section variant="bone">
        <Container>
          <Reveal>
            <Kicker>Evidencia visual</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl max-w-2xl">
              Obras y entregables
            </h2>
          </Reveal>
          <RevealStagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((img, i) => (
              <RevealItem key={i}>
                {img ? (
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-soft)]">
                    <Image
                      src={img}
                      alt="Obra ejecutada por JSD"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <ReservedMediaBlock ratio="4/3" />
                )}
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="dark" className="text-center">
        <Container>
          <Reveal>
            <Kicker tone="bone">Listo para arrancar</Kicker>
            <h2 className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              ¿Tu proyecto necesita {intro.title.toLowerCase()}?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              Un ingeniero JSD agenda contigo levantamiento técnico sin compromiso.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={whatsappLink()} target="_blank" variant="whatsapp" size="lg">
                <WhatsAppIcon className="size-5" /> Hablar por WhatsApp
              </Button>
              <Button href="/contacto" variant="outlineLight" size="lg">
                Formulario de contacto <ArrowRightIcon className="size-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
