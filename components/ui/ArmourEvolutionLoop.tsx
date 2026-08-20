"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type LoopPhase = "core" | "form" | "function" | "overload" | "deconstruct" | "reset";

type LoopStageProps = {
  generation: "identity" | "foundation" | "refinement" | "impact" | "deployment" | "mission" | "analysis" | "nanotech" | "convergence";
  label: string;
  children: ReactNode;
};

function phaseForScroll(delta: number, direction: number): LoopPhase {
  if (Math.abs(delta) > 42) return "overload";
  if (direction < 0) return "deconstruct";
  return "function";
}

export function ArmourLoopStage({ generation, label, children }: LoopStageProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<LoopPhase>("core");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = elementRef.current;
    if (!element || reducedMotion) return;

    let previousY = window.scrollY;
    let active = false;
    let settleTimer = 0;
    let formTimer = 0;

    const settle = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        if (active) setPhase("function");
      }, 420);
    };

    const onScroll = () => {
      if (!active) return;
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      previousY = currentY;
      setPhase(phaseForScroll(delta, Math.sign(delta)));
      settle();
    };

    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (!active) {
        window.clearTimeout(formTimer);
        window.clearTimeout(settleTimer);
        setPhase("reset");
        return;
      }
      setPhase("form");
      formTimer = window.setTimeout(() => setPhase("function"), 460);
    }, { threshold: 0.34 });

    observer.observe(element);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(formTimer);
      window.clearTimeout(settleTimer);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={elementRef}
      className="armour-loop-stage"
      data-generation={generation}
      data-phase={reducedMotion ? "function" : phase}
    >
      <div className="armour-loop-stage__memory" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <span className="armour-loop-stage__label" aria-hidden="true">{label}</span>
      {children}
    </div>
  );
}

export function ArmourBootSequence() {
  const reducedMotion = useReducedMotion();
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(() => setBooting(false), 1150);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  if (reducedMotion || !booting) return null;

  return (
    <div className="kj-boot-sequence" aria-hidden="true">
      <div className="kj-boot-sequence__core"><i /><i /><i /><b /></div>
      <p>KJ CORE SYSTEM</p>
    </div>
  );
}

export function ArmourLoopRestart() {
  const restartRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = restartRef.current;
    if (!element || reducedMotion) return;
    const observer = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting);
    }, { threshold: 0.5 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section ref={restartRef} className="armour-loop-restart" data-active={active} aria-label="Portfolio evolution cycle reset">
      <div className="armour-loop-restart__core" aria-hidden="true"><i /><i /><b /></div>
      <p>Core stabilised. Scroll to begin the next evolution.</p>
    </section>
  );
}
