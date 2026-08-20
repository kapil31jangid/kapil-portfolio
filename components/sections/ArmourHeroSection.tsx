"use client";

import { Download, Github, Linkedin, Mail, ChevronDown, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import { useArmourTheme } from "@/components/context/ArmourThemeProvider";
import { IronManHeroStage } from "@/components/armour/IronManHeroStage";

export function ArmourHeroSection() {
  const { activeSuit } = useArmourTheme();

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between pt-20 pb-10 px-4 sm:px-8 lg:px-16 overflow-hidden bg-gradient-to-b from-[#020305] via-[#05070A] to-[#090C12] text-white"
    >
      {/* Background Directional Atmospheric Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute left-[-10%] top-[-10%] w-[650px] h-[650px] rounded-full blur-3xl opacity-25 transition-all duration-700"
          style={{ background: activeSuit.glowColor }}
        />
        <div className="absolute inset-0 carbon-grid-bg opacity-15" />
      </div>

      {/* Main Cinematic Poster Layout */}
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column — Monumental Forged Typography & Primary CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start pt-4">
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-amber-300 mb-6 shadow-lg">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: activeSuit.energyColor }}
            />
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

          {/* Intro Statement */}
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mb-8 leading-relaxed font-sans">
            {siteConfig.heroIntro}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <a
              href="#projects"
              className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-lg transition shadow-[0_0_20px_rgba(209,26,34,0.5)] flex items-center gap-2 focus-ring"
            >
              <Sparkles size={16} /> Explore Projects
            </a>
            <a
              href={siteConfig.resumePath}
              download
              className="px-6 py-3.5 bg-slate-900 border border-amber-500/50 hover:bg-slate-800 text-amber-300 font-mono text-xs font-bold uppercase tracking-widest rounded-lg transition flex items-center gap-2 focus-ring"
            >
              <Download size={16} /> Download Résumé
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/kapil31jangid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-amber-400 hover:border-amber-500 transition focus-ring"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/kapil31jangid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-amber-400 hover:border-amber-500 transition focus-ring"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-amber-400 hover:border-amber-500 transition focus-ring"
              aria-label="Email Kapil"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Right Column — licensed-source 2.5D armour render */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center min-h-[480px]">
          <IronManHeroStage />
        </div>
      </div>

      {/* Scroll Invitation */}
      <div className="relative z-10 flex flex-col items-center mt-6 text-center text-slate-400 text-xs font-mono uppercase tracking-widest">
        <span>Scroll to Explore Portfolio</span>
        <ChevronDown size={16} className="animate-bounce mt-1 text-amber-400" />
      </div>
    </section>
  );
}
