"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SuitConfig } from "@/data/suitThemes";

interface ArmourScrollEngineProps {
  suitTheme: SuitConfig;
  children: ReactNode;
  id: string;
}

export function ArmourScrollEngine({ suitTheme, children, id }: ArmourScrollEngineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Local scroll progress transforms
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [shouldReduceMotion ? 1 : 0.92, 1, 1, shouldReduceMotion ? 1 : 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [shouldReduceMotion ? 0 : 60, 0, 0, shouldReduceMotion ? 0 : -60]);

  if (shouldReduceMotion) {
    return (
      <section id={id.replace("#", "")} className="relative w-full py-16 px-4 sm:px-8">
        {children}
      </section>
    );
  }

  return (
    <section ref={containerRef} id={id.replace("#", "")} className="relative w-full min-h-screen py-12 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Sticky Cinematic Viewport Stage */}
      <motion.div
        style={{
          opacity,
          scale,
          y,
        }}
        className="w-full h-full max-w-7xl mx-auto flex flex-col justify-center relative z-20"
      >
        {/* Suit Generation Header Badge */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 font-mono text-xs font-bold rounded uppercase tracking-wider text-slate-950 shadow"
              style={{ backgroundColor: suitTheme.energyColor }}
            >
              {suitTheme.label}
            </span>
            <span className="font-display font-bold text-lg text-white uppercase tracking-wider">
              {suitTheme.name}
            </span>
          </div>

          <span className="hidden sm:inline font-mono text-xs text-slate-400 uppercase tracking-widest">
            {suitTheme.tagline}
          </span>
        </div>

        {/* Section Main Content */}
        {children}
      </motion.div>
    </section>
  );
}
