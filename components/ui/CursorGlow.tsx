"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isDesktop = window.matchMedia("(min-width: 1024px)");

    const updateVisibility = () => {
      glow.hidden = prefersReduced.matches || !isDesktop.matches;
    };

    updateVisibility();

    const handleMove = (event: MouseEvent) => {
      glow.style.background = `radial-gradient(600px circle at ${event.clientX}px ${event.clientY}px, rgba(34, 211, 238, 0.06), transparent 45%)`;
    };

    prefersReduced.addEventListener("change", updateVisibility);
    isDesktop.addEventListener("change", updateVisibility);
    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      prefersReduced.removeEventListener("change", updateVisibility);
      isDesktop.removeEventListener("change", updateVisibility);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
    />
  );
}
