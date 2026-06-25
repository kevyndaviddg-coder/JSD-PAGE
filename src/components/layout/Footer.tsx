/**
 * Footer — Footer industrial JSD multi-columna.
 *
 * Patrón base: shadcn-blocks "Footer 7" (Magic MCP inspiration, similarity 3.158)
 * — multi-column con logo principal + sections array + social links + copyright +
 * legal links + border-top.
 *
 * Adaptación industrial JSD:
 * - Logo PNG real del cliente (no img src de blocks).
 * - 3 sections: Navegación / Servicios / Capacidades técnicas.
 * - Contact column con datos reales del cliente (no social default).
 * - Mapa Google Maps embebido al fondo.
 * - Sin social media inventado.
 */

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { site, services, nav } from "@/lib/site";
import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";

const SECTIONS: Array<{
  title: string;
  links: Array<{ name: string; href: string }>;
}> = [
  {
    title: "Navegación",
    links: nav.map((n) => ({ name: n.label, href: n.href })),
  },
  {
    title: "Servicios",
    links: services.map((s) => ({
      name: s.title,
      href: `/servicios/${s.slug}`,
    })),
  },
  {
    title: "Capacidades técnicas",
    links: [
      { name: "Chillers", href: "/servicios/instalacion-hvac" },
      { name: "Ductería metálica", href: "/servicios/ductos-metalicos" },
      { name: "Ventilación industrial", href: "/servicios/ductos-metalicos" },
      { name: "Agua helada", href: "/servicios/tuberias-agua-helada" },
      { name: "Corte CNC láser", href: "/servicios/fabricacion-metalica-cnc" },
      { name: "Estructuras y bases", href: "/servicios/piezas-a-medida" },
    ],
  },
];

const LEGAL = [
  { name: "Aviso de privacidad", href: "/aviso-de-privacidad" },
  { name: "Términos", href: "/terminos" },
];

export function Footer() {
  // Mapa relocado a la sección ContactCTA. Footer mantiene los datos de
  // contacto en un strip compacto 4-col para que la información siga viva
  // page-wide sin duplicar el iframe pesado.

  return (
    <footer className="bg-[color:var(--color-ink)] text-white">
      <Container>
        <div className="py-16 lg:py-20">
          {/* Top row — brand + sections */}
          <div className="flex w-full flex-col justify-between gap-12 lg:flex-row lg:items-start">
            {/* Brand block */}
            <div className="flex w-full max-w-md flex-col gap-5 lg:items-start">
              <Link
                href="/"
                className="inline-flex items-center"
                aria-label={`${site.name} — Inicio`}
              >
                <Image
                  src={site.brand.logoWhite}
                  alt={site.name}
                  width={200}
                  height={Math.round(200 / site.brand.logoWhiteAR)}
                  className="h-10 w-auto"
                />
              </Link>
              <p className="text-sm text-white/65 leading-relaxed">
                Diseñamos, instalamos y mantenemos sistemas HVAC, ductería y
                fabricación a la medida para proyectos industriales y
                comerciales.
              </p>
              <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--color-amber)]">
                HVAC · Climatización industrial · Fabricación a la medida
              </p>
            </div>

            {/* Sections grid */}
            <div className="grid w-full gap-8 sm:grid-cols-3 lg:gap-14 lg:max-w-3xl">
              {SECTIONS.map((section) => (
                <div key={section.title}>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55 mb-5">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name} className="font-medium">
                        <Link
                          href={link.href}
                          className="text-sm text-white/85 hover:text-[color:var(--color-amber)] transition-colors duration-200"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Mid row — contact strip 4-col (mapa relocado a ContactCTA) */}
          <div className="mt-14 border-t border-white/10 pt-10">
            <h4 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
              Contacto directo
            </h4>
            <ul className="grid gap-6 text-sm text-white/85 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/8 text-[color:var(--color-amber)]">
                  <MapPinIcon className="size-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                    Ubicación
                  </div>
                  <span className="block leading-relaxed">{site.contact.address}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/8 text-[color:var(--color-amber)]">
                  <PhoneIcon className="size-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                    Teléfono
                  </div>
                  <a href={site.contact.phoneLandlineHref} className="block hover:text-white">
                    {site.contact.phoneLandline}
                  </a>
                  <a href={site.contact.phoneMobileHref} className="block hover:text-white">
                    {site.contact.phoneMobile}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/8 text-[color:var(--color-amber)]">
                  <MailIcon className="size-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                    Correo
                  </div>
                  <a href={`mailto:${site.contact.email1}`} className="block break-all hover:text-white">
                    {site.contact.email1}
                  </a>
                  <a href={`mailto:${site.contact.email2}`} className="block break-all hover:text-white">
                    {site.contact.email2}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[color:var(--color-whatsapp)]/15 text-[color:var(--color-whatsapp)]">
                  <WhatsAppIcon className="size-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                    WhatsApp
                  </div>
                  <a
                    href={`https://wa.me/${site.contact.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-white"
                  >
                    Escríbenos por WhatsApp
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row — copyright + legal */}
        <div className="flex flex-col justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/55 md:flex-row md:items-center">
          <p className="order-2 md:order-1">{site.legal.copyright}</p>
          <ul className="order-1 flex flex-wrap gap-x-6 gap-y-2 md:order-2">
            {LEGAL.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
