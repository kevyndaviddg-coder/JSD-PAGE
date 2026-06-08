import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tienda industrial — Próximamente",
  description:
    "Próximamente: refacciones, filtros, bases, soportes y productos industriales. Mientras tanto, escríbenos por WhatsApp.",
};

export default function TiendaPage() {
  return (
    <Section variant="bone" className="min-h-[80vh] flex items-center pt-32">
      <Container size="narrow">
        <Reveal>
          <div className="text-center">
            <Kicker>Próximamente</Kicker>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
              Tienda industrial
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--color-steel)]">
              Refacciones, filtros, bases, soportes y productos industriales
              llegarán al catálogo en línea. Mientras tanto, escríbenos por
              WhatsApp para cotizar piezas y partes a la medida — nuestro
              equipo te atiende directo.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                href={whatsappLink("Hola JSD, quiero cotizar refacciones / partes industriales.")}
                target="_blank"
                variant="whatsapp"
                size="lg"
              >
                <WhatsAppIcon className="size-5" /> Cotizar por WhatsApp
              </Button>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-navy)] hover:text-[color:var(--color-amber)]"
              >
                Ver servicios <ArrowRightIcon className="size-3.5" />
              </Link>
            </div>
            <p className="mt-10 text-xs uppercase tracking-[0.22em] text-[color:var(--color-steel)]">
              Catálogo en desarrollo · sin productos publicados todavía
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
