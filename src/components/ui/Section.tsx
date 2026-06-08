import { cn } from "@/lib/utils";

type Variant = "default" | "feature" | "dark" | "petroleum" | "bone";

export function Section({
  id,
  className,
  children,
  variant = "default",
  as: Tag = "section",
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  variant?: Variant;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const variants: Record<Variant, string> = {
    default: "bg-[color:var(--color-paper)] text-[color:var(--color-ink)]",
    feature:
      "bg-gradient-to-b from-[color:var(--color-paper)] to-[color:var(--color-bone)] text-[color:var(--color-ink)]",
    dark: "bg-[color:var(--color-navy)] text-[color:var(--color-bone)]",
    petroleum: "bg-[color:var(--color-petroleum)] text-[color:var(--color-bone)]",
    bone: "bg-[color:var(--color-bone)] text-[color:var(--color-ink)]",
  };

  const Component = Tag as React.ElementType;
  return (
    <Component
      id={id}
      className={cn("section-pad", variants[variant], className)}
    >
      {children}
    </Component>
  );
}
