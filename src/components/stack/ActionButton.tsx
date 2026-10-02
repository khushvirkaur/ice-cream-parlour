import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "cream";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-soft hover:brightness-105 hover:-translate-y-0.5",
  outline:
    "border border-secondary/30 text-secondary hover:bg-secondary hover:text-secondary-foreground",
  cream:
    "bg-vanilla text-espresso border border-border hover:-translate-y-0.5 hover:shadow-soft",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function ActionButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  ariaLabel?: string;
}) {
  const isPlaceholder = href.startsWith("[");
  const isExternal = /^https?:/.test(href);

  return (
    <a
      href={isPlaceholder ? "#order" : href}
      aria-label={ariaLabel}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </a>
  );
}
