"use client";

import { Download, Github, Linkedin, Mail, ChevronDown, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import { PersistentArcCore } from "@/components/ui/PersistentArcCore";
import { suitThemes } from "@/data/suitThemes";

export function HeroMarkIII() {
  const theme = suitThemes["mark-3"];

  return (
    <div className="relative w-full min-h-[90vh] flex flex-col justify-between py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column — Monumental Forged Typography & Primary Actions */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* System Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-xs font-mono text-amber-300 mb-6 shadow-[0_0_15px_rgba(214,164,59,0.25)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-cyan-400 -ml-4.5" />
            <span className="font-bold tracking-wider">{siteConfig.availability}</span>
          </div>

          {/* Monumental Forged Title */}
          <h1 className="metallic-monumental-title mb-2 tracking-tighter">
            KAPIL JANGID
          </h1>

          {/* Professional Subtitle */}
          <p className="text-xl sm:text-2xl font-bold font-display text-amber-400 uppercase tracking-widest mb-4">
            {siteConfig.title}
          </p>

          {/* Statement */}
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mb-8 leading-relaxed font-sans">
            {siteConfig.heroIntro}
          </p>

          {/* Primary Call to Action Triggers */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <a
              href="#projects"
              className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-lg transition shadow-[0_0_20px_rgba(209,26,34,0.5)] flex items-center gap-2"
            >
              <Sparkles size={16} /> Explore Projects
            </a>
            <a
              href={siteConfig.resumePath}
              download
              className="px-6 py-3.5 bg-slate-900 border border-amber-500/50 hover:bg-slate-800 text-amber-300 font-mono text-xs font-bold uppercase tracking-widest rounded-lg transition flex items-center gap-2"
            >
              <Download size={16} /> Download Résumé
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/kapil31jangid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-amber-400 hover:border-amber-500 transition"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/kapil31jangid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-amber-400 hover:border-amber-500 transition"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-amber-400 hover:border-amber-500 transition"
              aria-label="Email Kapil"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Right Column — Mark III Armour Silhouette & Persistent Reactor Core */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center min-h-[380px] sm:min-h-[480px]">
          <div className="relative w-full max-w-[420px] h-[440px] flex items-center justify-center">
            {/* Original Mark III Armour Vector Silhouette */}
            <svg
              className="w-full h-full text-red-600/80 stroke-amber-500/80 fill-none"
              viewBox="0 0 500 500"
            >
              <path
                d="M 250,60 L 340,140 L 360,320 L 250,440 L 140,320 L 160,140 Z"
                strokeWidth="2.5"
                fill="rgba(143, 16, 21, 0.25)"
              />
              <path
                d="M 200,160 L 300,160 L 320,260 L 250,340 L 180,260 Z"
                strokeWidth="2"
                stroke="#D6A43B"
                fill="rgba(214, 164, 59, 0.12)"
              />
            </svg>

            {/* Persistent Arc Reactor Positioned at Chest Center */}
            <div className="absolute z-20">
              <PersistentArcCore currentTheme={theme} intensity={1.2} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Invitation */}
      <div className="flex flex-col items-center text-center text-slate-400 text-xs font-mono uppercase tracking-widest mt-6">
        <span>Scroll to Evolve Armour</span>
        <ChevronDown size={16} className="animate-bounce mt-1 text-amber-400" />
      </div>
    </div>
  );
}
