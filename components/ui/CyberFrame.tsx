import React from "react";
import { cn } from "@/utils/cn";

type CyberFrameProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "subtle";
  glow?: "cyan" | "violet" | "magenta" | "none";
  clip?: "all" | "sm" | "tr" | "none";
  hudNotches?: boolean;
  as?: React.ElementType;
};

export function CyberFrame({
  children,
  className,
  variant = "secondary",
  glow = "none",
  clip = "all",
  hudNotches = false,
  as: Component = "div",
}: CyberFrameProps) {
  const clipClass = {
    all: "clip-corner",
    sm: "clip-corner-sm",
    tr: "clip-tr",
    none: "",
  }[clip];

  const glowClass = {
    cyan: "shadow-[0_0_24px_rgba(0,240,255,0.08)] border-cyan/20",
    violet: "shadow-[0_0_24px_rgba(124,58,237,0.08)] border-violet/20",
    magenta: "shadow-[0_0_24px_rgba(236,72,153,0.08)] border-magenta/20",
    none: "",
  }[glow];

  return (
    <Component
      className={cn(
        "relative transition-all duration-300",
        // Background styles
        variant === "primary" && "bg-bg-elevated border border-cyan/20",
        variant === "secondary" && "bg-bg-secondary border border-border-subtle hover:border-cyan/20",
        variant === "subtle" && "bg-bg-primary/40 border border-border-subtle/50",
        clipClass,
        glowClass,
        className
      )}
    >
      {/* HUD corner notches */}
      {hudNotches && <div className="hud-corners absolute inset-0 pointer-events-none" aria-hidden="true" />}
      
      {/* Inline decorative light streak on top edge */}
      {variant === "primary" && (
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-60" aria-hidden="true" />
      )}

      {children}
    </Component>
  );
}
