import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { ChevronRightIcon } from "@/components/ui/Icons";

export function PageHero({
  kicker,
  title,
  subtitle,
  image,
  crumbs = [],
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  image: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div aria-hidden className="absolute inset-0 hero-overlay" />
      </div>

      <Container className="relative z-10 pt-28 pb-16 sm:pt-36 sm:pb-24 text-white">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-white/70">
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRightIcon className="size-3" />}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {kicker && <Kicker tone="bone">{kicker}</Kicker>}
        <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
