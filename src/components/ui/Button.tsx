import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[color:var(--color-amber)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer whitespace-nowrap active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-[color:var(--color-amber)] text-white hover:bg-[color:var(--color-amber-700)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]",
        dark: "bg-[color:var(--color-navy)] text-white hover:bg-[color:var(--color-ink)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]",
        outline:
          "border border-[color:var(--color-ink)] text-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)] hover:text-white",
        outlineLight:
          "border border-white/60 text-white hover:bg-white hover:text-[color:var(--color-navy)]",
        ghost:
          "text-[color:var(--color-ink)] hover:bg-[color:var(--color-bone)]",
        whatsapp:
          "bg-[color:var(--color-whatsapp)] text-white hover:bg-[color:var(--color-whatsapp-700)] shadow-[var(--shadow-soft)]",
        link: "text-[color:var(--color-navy)] underline-offset-4 hover:underline",
        // Glass translúcido premium para heros sobre video. Acento ámbar fino en el borde.
        glass:
          "bg-white/12 text-white border border-[color:var(--color-amber)]/45 backdrop-blur-md hover:bg-white/20 hover:border-[color:var(--color-amber)]/70 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)]",
        glassGhost:
          "bg-white/5 text-white border border-white/25 backdrop-blur-md hover:bg-white/12 hover:border-white/45",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-[var(--radius-md)]",
        md: "h-11 px-6 text-[15px] rounded-[var(--radius-md)]",
        lg: "h-13 px-8 text-base rounded-[var(--radius-lg)]",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

type AsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

export type ButtonProps = AsButton | AsLink;

export function Button(props: ButtonProps) {
  const { className, variant, size, children } = props;

  if ("href" in props && props.href) {
    const isExternal = /^https?:\/\//.test(props.href) || props.href.startsWith("mailto:") || props.href.startsWith("tel:") || props.href.startsWith("https://wa.me");
    if (isExternal) {
      return (
        <a
          href={props.href}
          target={props.target}
          rel={props.rel ?? (props.target === "_blank" ? "noopener noreferrer" : undefined)}
          aria-label={props.ariaLabel}
          className={cn(buttonVariants({ variant, size }), className)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={props.href}
        aria-label={props.ariaLabel}
        className={cn(buttonVariants({ variant, size }), className)}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = props as AsButton;
  return (
    <button
      {...buttonProps}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  );
}

export { buttonVariants };
