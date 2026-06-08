import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import {
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
  MapPinIcon,
} from "@/components/ui/Icons";
import { site, whatsappLink } from "@/lib/site";

export function ContactCTA() {
  return (
    <section id="contacto-cta" className="section-pad surface-petroleum relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[color:var(--color-amber)]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <Kicker tone="bone">Cotiza tu próximo proyecto</Kicker>
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
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[var(--radius-xl)] border border-white/15 bg-white/[0.06] p-6 sm:p-8 backdrop-blur-md">
              <ul className="space-y-5 text-white/90">
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
                    <WhatsAppIcon className="size-5 text-[color:var(--color-whatsapp)]" />
                  </span>
                  <div>
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
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
                    <PhoneIcon className="size-5 text-[color:var(--color-amber)]" />
                  </span>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                      Teléfono fijo
                    </div>
                    <a href={site.contact.phoneLandlineHref} className="text-base font-semibold hover:underline">
                      {site.contact.phoneLandline}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
                    <MailIcon className="size-5 text-[color:var(--color-amber)]" />
                  </span>
                  <div>
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
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
                    <MapPinIcon className="size-5 text-[color:var(--color-amber)]" />
                  </span>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                      Ubicación
                    </div>
                    <p className="text-sm leading-relaxed">{site.contact.address}</p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
