"use client";

import Image from "next/image";
import { Download, Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import { QuickAccessTerminal } from "@/components/portfolio/QuickAccessTerminal";

export function StormfrontHero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-10 px-4 sm:px-8 lg:px-16 overflow-hidden bg-[#05070D] text-[#EAF7FF]"
    >
      {/* Background Storm Atmosphere & Layered Electrical Depth */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Deep Atmospheric Mist Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(47,140,255,0.18)_0%,rgba(8,15,31,0.6)_50%,#05070D_85%)]" />

        {/* Lightning Halo behind Shoulders (Positioned below face) */}
        <div className="absolute right-[5%] bottom-[10%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(47,140,255,0.35)_0%,rgba(79,70,186,0.2)_45%,transparent_70%)] blur-3xl opacity-80" />

        {/* Engraved Geometric Ring Grid */}
        <div className="absolute right-[10%] bottom-[5%] w-[480px] h-[480px] rounded-full border border-blue-500/20 stroke-dasharray-4 animate-spin-slow opacity-30" />

        {/* Branching Electrical Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(47,140,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(47,140,255,0.25)_1px,transparent_1px)] bg-[size:90px_90px]" />
      </div>

      {/* Main Hero Poster Staging */}
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column — Forged Typography & Command Console */}
        <div className="lg:col-span-7 flex flex-col items-start pt-6">
          {/* Availability Status Conductor */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/40 text-xs font-mono text-blue-300 mb-6 shadow-[0_0_15px_rgba(47,140,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-blue-400 -ml-4.5" />
            <span className="font-bold tracking-wider">{siteConfig.availability}</span>
          </div>

          {/* Forged Monumental Title */}
          <h1 className="metallic-forged-title mb-2 tracking-tighter">
            KAPIL JANGID
          </h1>

          {/* Professional Subtitle */}
          <p className="text-xl sm:text-2xl font-bold font-display text-blue-400 uppercase tracking-widest mb-4">
            {siteConfig.title}
          </p>

          {/* Verified Introduction */}
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mb-6 leading-relaxed font-sans">
            {siteConfig.heroIntro}
          </p>

          {/* Social Links & Resume Callout */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <a
              href="https://github.com/kapil31jangid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-900/90 border border-slate-700/80 rounded hover:border-blue-500 hover:text-blue-400 transition text-xs font-mono uppercase tracking-wider text-slate-200"
            >
              <Github size={14} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/kapil31jangid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-900/90 border border-slate-700/80 rounded hover:border-blue-500 hover:text-blue-400 transition text-xs font-mono uppercase tracking-wider text-slate-200"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900/90 border border-slate-700/80 rounded hover:border-blue-500 hover:text-blue-400 transition text-xs font-mono uppercase tracking-wider text-slate-200"
            >
              <Mail size={14} /> Email
            </a>
            <a
              href={siteConfig.resumePath}
              download
              className="flex items-center gap-2 px-4 py-2 bg-blue-600/25 border border-blue-500/60 rounded hover:bg-blue-600/40 transition text-xs font-mono uppercase tracking-wider text-blue-300 font-bold"
            >
              <Download size={14} /> Résumé
            </a>
          </div>

          {/* Integrated Forged Command Console Terminal */}
          <div className="w-full max-w-xl">
            <QuickAccessTerminal />
          </div>
        </div>

        {/* Right Column — Enlarged Cut-Out Portrait Anchored Bottom-Right */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-end min-h-[480px] lg:min-h-[640px]">
          <div className="relative w-full max-w-[480px] h-[520px] sm:h-[620px] lg:h-[680px] flex items-end">
            {/* Dual Rim Lighting: Silver Left / Blue Right */}
            <div className="absolute inset-0 z-10 pointer-events-none rounded-b-full opacity-40 bg-[radial-gradient(ellipse_at_bottom,rgba(47,140,255,0.4)_0%,transparent_70%)]" />

            <Image
              src="/profile/kapil-hero-transparent.png"
              alt="Kapil Jangid — Cut-out Storm Portrait"
              fill
              priority
              quality={100}
              sizes="(max-width: 1024px) 90vw, 500px"
              className="object-contain object-bottom filter drop-shadow-[-12px_0_20px_rgba(234,247,255,0.35)] drop-shadow-[15px_0_25px_rgba(47,140,255,0.45)]"
            />
          </div>
        </div>
      </div>

      {/* Subtle Scroll Invitation */}
      <div className="relative z-10 flex flex-col items-center mt-6 text-center text-slate-400 text-xs font-mono uppercase tracking-widest">
        <span>Scroll for Story</span>
        <ChevronDown size={16} className="animate-bounce mt-1 text-blue-400" />
      </div>
    </section>
  );
}
