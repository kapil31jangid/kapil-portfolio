"use client";

import { Download, Github, Linkedin, Mail, ChevronDown, Cpu, Database, Code2 } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import { QuickAccessTerminal } from "@/components/portfolio/QuickAccessTerminal";
import { ArcProtocolActivation } from "@/components/ui/ArcProtocolActivation";

export function ArcTechHero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-10 px-4 sm:px-8 lg:px-16 overflow-hidden bg-[#05070A] text-[#F1F5F9]"
    >
      {/* Dark Workshop Atmospheric Depth & Directional Red-Gold Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Radial Red Workshop Glow */}
        <div className="absolute left-[-10%] top-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.25)_0%,rgba(139,0,0,0.15)_45%,transparent_75%)] blur-3xl" />

        {/* Luminous Arc Blue Core Glow Right */}
        <div className="absolute right-[5%] bottom-[10%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.25)_0%,rgba(2,132,199,0.15)_50%,transparent_75%)] blur-3xl" />

        {/* Technical Carbon/Grid Texture */}
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(245,158,11,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.2)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Main Cinematic Poster Staging */}
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column — Monumental Forged Typography & KJ Core Console */}
        <div className="lg:col-span-7 flex flex-col items-start pt-4">
          {/* Protocol Activation Controller Row */}
          <div className="mb-6 flex items-center gap-4">
            <ArcProtocolActivation />
          </div>

          {/* Monumental Forged Title */}
          <h1 className="metallic-forged-title mb-2 tracking-tighter">
            KAPIL JANGID
          </h1>

          {/* Professional Subtitle */}
          <p className="text-xl sm:text-2xl font-bold font-display text-amber-400 uppercase tracking-widest mb-4">
            {siteConfig.title}
          </p>

          {/* Statement */}
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mb-6 leading-relaxed font-sans">
            {siteConfig.heroIntro}
          </p>

          {/* Social Links & Resume */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <a
              href="https://github.com/kapil31jangid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700/80 rounded hover:border-red-500 hover:text-amber-400 transition text-xs font-mono uppercase tracking-wider text-slate-200"
            >
              <Github size={14} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/kapil31jangid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700/80 rounded hover:border-red-500 hover:text-amber-400 transition text-xs font-mono uppercase tracking-wider text-slate-200"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700/80 rounded hover:border-red-500 hover:text-amber-400 transition text-xs font-mono uppercase tracking-wider text-slate-200"
            >
              <Mail size={14} /> Email
            </a>
            <a
              href={siteConfig.resumePath}
              download
              className="flex items-center gap-2 px-4 py-2 bg-red-900/40 border border-amber-500/60 rounded hover:bg-red-900/60 transition text-xs font-mono uppercase tracking-wider text-amber-300 font-bold"
            >
              <Download size={14} /> Résumé
            </a>
          </div>

          {/* Visually Renamed KJ CORE CONSOLE Terminal */}
          <div className="w-full max-w-xl">
            <QuickAccessTerminal />
          </div>
        </div>

        {/* Right Column — Original Arc-Tech Suit Schematic Composition (ZERO HUMAN PHOTOGRAPHS) */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center min-h-[440px] lg:min-h-[560px]">
          <div className="relative w-full max-w-[450px] h-[480px] sm:h-[540px] flex items-center justify-center">
            {/* Concentric Reactor Energy Rings */}
            <div className="absolute w-[360px] h-[360px] rounded-full border-2 border-dashed border-cyan-400/40 animate-spin-slow flex items-center justify-center">
              <div className="w-[280px] h-[280px] rounded-full border border-amber-500/30 flex items-center justify-center">
                <div className="w-[180px] h-[180px] rounded-full bg-cyan-400/10 border-4 border-cyan-400 flex items-center justify-center arc-reactor-glow">
                  <div className="w-16 h-16 rounded-full bg-white shadow-[0_0_40px_#ffffff]" />
                </div>
              </div>
            </div>

            {/* Technical Suit/Helmet Schematic SVG Overlay (Original Art) */}
            <svg
              className="w-full h-full relative z-10 text-amber-500/80 stroke-current fill-none"
              viewBox="0 0 500 500"
            >
              {/* Diagnostic Targeting Reticles & Angular Armor Plates */}
              <circle cx="250" cy="250" r="220" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.4" />
              <circle cx="250" cy="250" r="160" strokeWidth="1" opacity="0.6" />
              <path d="M 250,50 L 350,150 L 350,350 L 250,450 L 150,350 L 150,150 Z" strokeWidth="2" opacity="0.8" />
              <path d="M 200,180 L 300,180 L 320,280 L 250,360 L 180,280 Z" strokeWidth="2" stroke="#DC2626" fill="rgba(185, 28, 28, 0.15)" />
              <line x1="250" y1="20" x2="250" y2="480" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <line x1="20" y1="250" x2="480" y2="250" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            </svg>

            {/* Diagnostic Mechanical Callouts */}
            <div className="absolute top-6 left-0 bg-slate-900/90 border border-red-500/40 p-2.5 rounded text-[10px] font-mono text-amber-400 shadow-lg z-20 backdrop-blur-md flex items-center gap-2">
              <Cpu size={14} className="text-cyan-400" />
              <span>AI_CORE // GEMINI_RAG</span>
            </div>

            <div className="absolute bottom-12 right-0 bg-slate-900/90 border border-cyan-500/40 p-2.5 rounded text-[10px] font-mono text-cyan-300 shadow-lg z-20 backdrop-blur-md flex items-center gap-2">
              <Database size={14} className="text-amber-400" />
              <span>DB // SUPABASE_NEON</span>
            </div>

            <div className="absolute top-1/2 right-[-10px] bg-slate-900/90 border border-amber-500/40 p-2.5 rounded text-[10px] font-mono text-slate-200 shadow-lg z-20 backdrop-blur-md flex items-center gap-2">
              <Code2 size={14} className="text-red-500" />
              <span>STACK // NEXT_FASTAPI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Invitation */}
      <div className="relative z-10 flex flex-col items-center mt-6 text-center text-slate-400 text-xs font-mono uppercase tracking-widest">
        <span>Scroll to Enter Workshop</span>
        <ChevronDown size={16} className="animate-bounce mt-1 text-amber-400" />
      </div>
    </section>
  );
}
