import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import {
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@/components/ui/Icons";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto — Cotiza tu proyecto con JSD",
  description:
    "Escríbenos por WhatsApp, teléfono o correo. Agendamos levantamiento técnico sin compromiso para HVAC, climatización y fabricación industrial.",
};

export default function ContactoPage() {
  const mapSrc = `https://www.google.com/maps?q=${site.contact.mapsQuery}&output=embed`;

  return (
    <>
      <PageHero
        kicker="Hablemos"
        title="Cotiza tu próximo proyecto"
        subtitle="¿Tienes dudas o comentarios? Llena el formulario y nuestro equipo se pondrá en contacto a la brevedad. Si lo prefieres, escríbenos directo por WhatsApp."
        image="/media/jsd/08_ducteria-expuesta-para-oficinas-comerciales_8k.jpg"
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
      />

      <Section variant="default">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr]">
            {/* Form */}
            <Reveal>
              <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-ash-200)] bg-[color:var(--color-paper)] p-6 sm:p-8 shadow-[var(--shadow-soft)]">
                <Kicker>Formulario rápido</Kicker>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold text-[color:var(--color-ink)]">
                  Cuéntanos qué necesitas
                </h2>
                <p className="mt-2 text-sm text-[color:var(--color-steel)]">
                  Te contactamos en menos de 24 horas en días hábiles.
                </p>
                <form
                  action={`mailto:${site.contact.email1}`}
                  method="post"
                  encType="text/plain"
                  className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <Field id="name" label="Nombre" type="text" required />
                  <Field id="phone" label="Teléfono" type="tel" required />
                  <Field id="email" label="Correo" type="email" required className="sm:col-span-2" />
                  <SelectField
                    id="service"
                    label="Servicio de interés"
                    options={[
                      "Instalación HVAC",
                      "Ductos metálicos",
                      "Tuberías de agua helada",
                      "Mantenimiento",
                      "Climatización industrial / comercial",
                      "Fabricación metálica / CNC",
                      "Redilas y trailas",
                      "Piezas a medida",
                      "Otro",
                    ]}
                    className="sm:col-span-2"
                  />
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-steel)]">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="mt-2 w-full rounded-[var(--radius-md)] border border-[color:var(--color-ash-200)] bg-[color:var(--color-bone)] px-4 py-3 text-sm text-[color:var(--color-ink)] placeholder:text-[color:var(--color-steel)] focus:outline-none focus-visible:border-[color:var(--color-navy)] focus-visible:bg-white"
                      placeholder="Describe brevemente el alcance del proyecto, ubicación y tiempos."
                    />
                  </div>
                  <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
                    <Button type="submit" variant="primary" size="lg">
                      Enviar mensaje
                      <ArrowRightIcon className="size-4" />
                    </Button>
                    <Button
                      href={whatsappLink()}
                      target="_blank"
                      variant="whatsapp"
                      size="lg"
                    >
                      <WhatsAppIcon className="size-5" />
                      O escríbenos por WhatsApp
                    </Button>
                  </div>
                </form>
              </div>
            </Reveal>

            {/* Datos directos + mapa */}
            <Reveal delay={0.05}>
              <div className="flex flex-col gap-6">
                <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-ash-200)] bg-[color:var(--color-bone)] p-6 sm:p-8">
                  <Kicker>Canales directos</Kicker>
                  <ul className="mt-5 space-y-5 text-[color:var(--color-ink)]">
                    <ContactItem
                      icon={<WhatsAppIcon className="size-5 text-[color:var(--color-whatsapp)]" />}
                      label="WhatsApp"
                      value={site.contact.phoneMobile}
                      href={whatsappLink()}
                      external
                    />
                    <ContactItem
                      icon={<PhoneIcon className="size-5 text-[color:var(--color-amber)]" />}
                      label="Teléfono fijo"
                      value={site.contact.phoneLandline}
                      href={site.contact.phoneLandlineHref}
                    />
                    <ContactItem
                      icon={<MailIcon className="size-5 text-[color:var(--color-amber)]" />}
                      label="Correos"
                      value={`${site.contact.email1} · ${site.contact.email2}`}
                    />
                    <ContactItem
                      icon={<MapPinIcon className="size-5 text-[color:var(--color-amber)]" />}
                      label="Ubicación"
                      value={site.contact.address}
                    />
                    <ContactItem
                      icon={<ClockIcon className="size-5 text-[color:var(--color-amber)]" />}
                      label="Horario"
                      value="Lunes a viernes — confirmar visita técnica con un día de anticipación."
                    />
                  </ul>
                </div>

                <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-ash-200)]">
                  <iframe
                    title="Ubicación JSD Air Systems"
                    src={mapSrc}
                    width="100%"
                    height="280"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block w-full h-72"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Field({
  id,
  label,
  type,
  required,
  className,
}: {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-steel)]">
        {label}
        {required && <span className="ml-1 text-[color:var(--color-amber)]">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-2 h-11 w-full rounded-[var(--radius-md)] border border-[color:var(--color-ash-200)] bg-[color:var(--color-bone)] px-4 text-sm text-[color:var(--color-ink)] placeholder:text-[color:var(--color-steel)] focus:outline-none focus-visible:border-[color:var(--color-navy)] focus-visible:bg-white"
      />
    </div>
  );
}

function SelectField({
  id,
  label,
  options,
  className,
}: {
  id: string;
  label: string;
  options: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-steel)]">
        {label}
      </label>
      <select
        id={id}
        name={id}
        defaultValue=""
        className="mt-2 h-11 w-full rounded-[var(--radius-md)] border border-[color:var(--color-ash-200)] bg-[color:var(--color-bone)] px-4 text-sm text-[color:var(--color-ink)] focus:outline-none focus-visible:border-[color:var(--color-navy)] focus-visible:bg-white"
      >
        <option value="" disabled>
          Selecciona una opción
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white shadow-[var(--shadow-soft)]">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-steel)]">
          {label}
        </div>
        <div className="mt-0.5 text-sm font-medium text-[color:var(--color-ink)] break-words leading-relaxed">
          {value}
        </div>
      </div>
    </div>
  );
  if (href) {
    return (
      <li>
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="block hover:opacity-90"
        >
          {content}
        </a>
      </li>
    );
  }
  return <li>{content}</li>;
}
