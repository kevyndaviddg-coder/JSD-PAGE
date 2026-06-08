"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
  WhatsAppIcon,
  ArrowRightIcon,
} from "@/components/ui/Icons";
import { site, services, nav, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Top: muy translúcido (deja respirar el hero/video). Al scrollear: glass marino sólido.
  const surface = scrolled ? "glass-navy-strong" : "glass-navy-top";

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 text-white transition-all duration-500",
        surface,
      )}
    >
      <Container>
        <div className="flex h-18 sm:h-20 items-center justify-between gap-4">
          {/* Logo real con breathing space */}
          <Link
            href="/"
            aria-label={`${site.name} — Inicio`}
            className="flex items-center shrink-0 transition-opacity hover:opacity-90"
          >
            <Image
              src={site.brand.logoWhite}
              alt={site.name}
              width={168}
              height={Math.round(168 / site.brand.logoWhiteAR)}
              priority
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1 px-3 h-10 rounded-md text-[14px] font-medium transition-colors",
                      pathname?.startsWith("/servicios")
                        ? "text-white"
                        : "text-white/85 hover:text-white",
                    )}
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={cn(
                        "size-3.5 transition-transform duration-200",
                        dropdownOpen && "rotate-180",
                      )}
                    />
                  </Link>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={reduce ? false : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[680px] z-50"
                      >
                        <div className="rounded-[var(--radius-lg)] glass-navy-strong border border-white/10 shadow-[var(--shadow-glow)] p-6">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-amber)] mb-4">
                            Capacidades integrales
                          </p>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                            {services.map((s) => (
                              <Link
                                key={s.slug}
                                href={`/servicios/${s.slug}`}
                                className="group/item flex items-start gap-3 rounded-[var(--radius-md)] p-3 transition-colors hover:bg-white/5"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--color-amber)] group-hover/item:scale-150 transition-transform" />
                                <span className="flex-1">
                                  <span className="block text-[13.5px] font-semibold text-white leading-tight">
                                    {s.title}
                                  </span>
                                  <span className="block text-[12px] text-white/65 mt-1 leading-snug line-clamp-2">
                                    {s.short}
                                  </span>
                                </span>
                              </Link>
                            ))}
                          </div>
                          <Link
                            href="/servicios"
                            className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[color:var(--color-amber)] hover:text-white transition-colors"
                          >
                            Ver todos los servicios
                            <ArrowRightIcon className="size-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 h-10 inline-flex items-center rounded-md text-[14px] font-medium transition-colors",
                    pathname === item.href
                      ? "text-white"
                      : "text-white/85 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="whatsapp"
              size="sm"
              href={whatsappLink()}
              target="_blank"
            >
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:bg-white/10 cursor-pointer"
          >
            {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-white/10 glass-navy-strong overflow-hidden"
          >
            <Container>
              <nav className="py-4 flex flex-col">
                {nav.map((item) =>
                  item.hasDropdown ? (
                    <details key={item.href} className="group">
                      <summary className="flex items-center justify-between py-3 cursor-pointer text-[15px] font-semibold text-white border-b border-white/10">
                        {item.label}
                        <ChevronDownIcon className="size-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="pl-2 py-2 flex flex-col gap-1">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/servicios/${s.slug}`}
                            className="py-2 text-sm text-white/70 hover:text-white"
                          >
                            {s.title}
                          </Link>
                        ))}
                        <Link
                          href="/servicios"
                          className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-amber)]"
                        >
                          Ver todos <ArrowRightIcon className="size-3.5" />
                        </Link>
                      </div>
                    </details>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-3 text-[15px] font-semibold text-white border-b border-white/10"
                    >
                      {item.label}
                    </Link>
                  ),
                )}
                <Button
                  variant="whatsapp"
                  size="lg"
                  href={whatsappLink()}
                  target="_blank"
                  className="mt-5 w-full"
                >
                  <WhatsAppIcon className="size-5" />
                  Escríbenos por WhatsApp
                </Button>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
