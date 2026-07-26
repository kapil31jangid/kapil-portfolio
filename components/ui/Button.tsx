"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  external?: boolean;
  download?: boolean;
};

export function Button({
  children,
  className,
  variant = "primary",
  href,
  external,
  download,
  type,
  disabled,
  ...props
}: ButtonProps) {
  const styles = cn(
    "focus-ring inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 relative overflow-hidden group select-none clip-corner-sm",
    // Primary: Electric cyan theme with subtle back glow
    variant === "primary" &&
      "bg-cyan text-bg-primary hover:bg-cyan/90 border border-transparent shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)]",
    // Secondary: Dark background, thin cyber borders, glows cyan on hover
    variant === "secondary" &&
      "border border-border-subtle bg-bg-secondary text-text-primary hover:border-cyan/50 hover:text-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.1)]",
    // Ghost: Clean HUD style text, underlines on hover
    variant === "ghost" &&
      "text-text-secondary hover:text-cyan border border-transparent bg-transparent",
    disabled && "cursor-not-allowed opacity-50",
    className
  );

  // Decorative hover glare / glint overlay
  const glareOverlay = (
    <span className="absolute inset-0 block -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out" />
  );

  if (href) {
    return (
      <a
        href={href}
        className={styles}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: true } : {})}
      >
        {glareOverlay}
        {children}
      </a>
    );
  }

  return (
    <button type={type ?? "button"} className={styles} disabled={disabled} {...props}>
      {glareOverlay}
      {children}
    </button>
  );
}

type RoleRotatorProps = {
  roles: string[];
};

export function RoleRotator({ roles }: RoleRotatorProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((current) => (current + 1) % roles.length);
        setVisible(true);
      }, 350);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [roles.length]);

  return (
    <p
      className={cn(
        "mt-3 text-xs font-mono font-bold tracking-[0.25em] text-cyan transition-opacity duration-500 uppercase",
        visible ? "opacity-100" : "opacity-0"
      )}
      aria-live="polite"
    >
      [ {roles[index]} ]
    </p>
  );
}
