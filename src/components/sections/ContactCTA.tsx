import { Container } from "@/components/ui/Container";
import { PremiumEyebrow } from "@/components/ui/PremiumEyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import {
  CheckIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
  MapPinIcon,
} from "@/components/ui/Icons";
import { site, whatsappLink } from "@/lib/site";

// Google Maps embed src — usa la query oficial del cliente.
const mapSrc = `https://www.google.com/maps?q=${site.contact.mapsQuery}&output=embed`;

// Tres compromisos del proceso comercial — concretos, sin claims inventados.
const COMMITMENTS = [
  "Visita técnica en sitio para entender el alcance",
  "Propuesta documentada con materiales, equipos y tiempos",
  "Supervisión propia durante la ejecución",
];

export function ContactCTA() {
  return (
    <section
      id="contacto-cta"
      className="section-pad surface-petroleum relative isolate overflow-hidden"
    >
      {/* Grid técnico tipo blueprint (sutil) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Orbs ambientales */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[color:var(--color-amber)]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl"
      />
      {/* Hairline top ámbar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-amber)]/40 to-transparent"
      />

      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <PremiumEyebrow>Cotiza tu próximo proyecto</PremiumEyebrow>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[44px]">
              Cuéntanos qué necesitas{" "}
              <span className="text-[color:var(--color-amber)]">instalar, fabricar o mantener</span>.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
              Un ingeniero JSD agenda contigo levantamiento técnico, define el
              alcance y prepara la propuesta. Sin compromiso.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={whatsappLink()}
                target="_blank"
                variant="whatsapp"
                size="lg"
              >
                <WhatsAppIcon className="size-5" />
                Cotizar por WhatsApp
              </Button>
              <Button
                href={site.contact.phoneMobileHref}
                variant="outlineLight"
                size="lg"
              >
                <PhoneIcon className="size-4" />
                {site.contact.phoneMobile}
              </Button>
              <Button
                href={`mailto:${site.contact.email1}`}
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
              >
                <MailIcon className="size-4" />
                Enviar correo
              </Button>
            </div>

            {/* Compromisos del proceso comercial */}
            <ul className="mt-10 grid gap-3 sm:max-w-md">
              {COMMITMENTS.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 text-sm text-white/80"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-amber)]/40 bg-[color:var(--color-amber)]/15 text-[color:var(--color-amber)]">
                    <CheckIcon className="size-2.5" />
                  </span>
                  <span className="leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-5">
              {/* Card de canales directos */}
              <div className="rounded-[var(--radius-xl)] border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md sm:p-7">
                <ul className="space-y-4 text-white/90">
                  <li className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/10">
                      <WhatsAppIcon className="size-5 text-[color:var(--color-whatsapp)]" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                        WhatsApp
                      </div>
                      <a
                        href={whatsappLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold hover:underline"
                      >
                        {site.contact.phoneMobile}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/10">
                      <PhoneIcon className="size-5 text-[color:var(--color-amber)]" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                        Teléfono fijo
                      </div>
                      <a href={site.contact.phoneLandlineHref} className="text-base font-semibold hover:underline">
                        {site.contact.phoneLandline}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/10">
                      <MailIcon className="size-5 text-[color:var(--color-amber)]" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                        Correo
                      </div>
                      <div className="flex flex-col">
                        <a href={`mailto:${site.contact.email1}`} className="text-sm hover:underline">{site.contact.email1}</a>
                        <a href={`mailto:${site.contact.email2}`} className="text-sm hover:underline">{site.contact.email2}</a>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/10">
                      <MapPinIcon className="size-5 text-[color:var(--color-amber)]" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                        Ubicación
                      </div>
                      <p className="text-sm leading-relaxed">{site.contact.address}</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Map panel — relocado desde el Footer */}
              <div className="overflow-hidden rounded-[var(--radius-xl)] border border-white/15 shadow-[var(--shadow-lift)]">
                <iframe
                  title="Mapa de ubicación JSD Air Systems"
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-64 w-full grayscale-[0.2] contrast-[1.05] sm:h-72"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
