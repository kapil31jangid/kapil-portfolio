"use client";

import { GokuBot } from "@/components/assistant/GokuBot";

export function GokuBotSection() {
  return (
    <section id="gokubot" className="storm-section env-midnight-navy py-24 relative overflow-hidden">
      {/* Energy Convergence Conductor SVG */}
      <svg className="absolute top-0 inset-x-0 w-full h-12 pointer-events-none stroke-blue-500/40">
        <line x1="10%" y1="0" x2="50%" y2="48" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="90%" y1="0" x2="50%" y2="48" strokeWidth="2" strokeDasharray="4 4" />
      </svg>

      <div className="max-w-7xl mx-auto w-full relative z-20">
        {/* Section Header */}
        <div className="mb-10">
          <span className="section-label text-blue-400">{"// SECTION 09 — ENERGY CONVERGENCE"}</span>
          <h2 className="title-oversized text-white">GOKUBOT ASSISTANT</h2>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-wider mt-2">
            Kapil Jangid’s Engineered Portfolio AI Assistant System
          </p>
        </div>

        {/* Embedded GokuBot Component Surface */}
        <div className="gunmetal-surface engraved-border rounded-2xl p-4 sm:p-8 shadow-2xl backdrop-blur-md">
          <GokuBot />
        </div>
      </div>
    </section>
  );
}
