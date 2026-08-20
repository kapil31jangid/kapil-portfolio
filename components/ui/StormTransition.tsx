"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export type TransitionMode =
  | "thunder-split"
  | "forged-descent"
  | "energy-gate"
  | "storm-blackout"
  | "electrical-continuity"
  | "timeline-compression"
  | "silver-reveal"
  | "energy-convergence";

interface StormTransitionProps {
  children: ReactNode;
  mode: TransitionMode;
  className?: string;
  id?: string;
}

export function StormTransition({ children, mode, className = "", id }: StormTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Transform values for transitions
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [ shouldReduceMotion ? 0 : 80, 0 ]);
  const scale = useTransform(scrollYProgress, [0, 1], [ shouldReduceMotion ? 1 : 0.94, 1 ]);
  
  const forgedDescentY = useTransform(scrollYProgress, [0, 1], [shouldReduceMotion ? "0%" : "25%", "0%"]);
  const energyGateScale = useTransform(scrollYProgress, [0, 0.8], [0.3, 1]);

  if (shouldReduceMotion) {
    return (
      <section id={id} className={`storm-section-wrapper ${className}`}>
        {children}
      </section>
    );
  }

  return (
    <section ref={containerRef} id={id} className={`storm-section-wrapper relative ${className}`}>
      {/* Mode 1: Thunder Split Transition Overlay */}
      {mode === "thunder-split" && (
        <div className="absolute top-0 inset-x-0 h-24 z-30 pointer-events-none overflow-hidden">
          <svg className="w-full h-full text-blue-500 opacity-60" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 L350,40 L500,10 L750,90 L900,30 L1200,120" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      )}

      {/* Mode 3: Circular Energy-Gate Animation Surface */}
      {mode === "energy-gate" && (
        <motion.div
          style={{ scale: energyGateScale }}
          className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center opacity-15"
        >
          <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full border-4 border-dashed border-blue-400 animate-spin-slow" />
        </motion.div>
      )}

      {/* Main Motion Content Container */}
      <motion.div
        style={{
          opacity,
          y: mode === "forged-descent" ? forgedDescentY : y,
          scale: mode === "energy-gate" ? scale : undefined,
        }}
        className="w-full relative z-20"
      >
        {children}
      </motion.div>
    </section>
  );
}
