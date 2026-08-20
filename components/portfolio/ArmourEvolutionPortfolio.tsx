"use client";

import { useCallback } from "react";
import { BootSequence } from "@/components/ui/BootSequence";
import { ArmourScrollEngine } from "@/components/ui/ArmourScrollEngine";

import { HeroMarkIII } from "@/components/sections/HeroMarkIII";
import { AboutMarkI } from "@/components/sections/AboutMarkI";
import { SkillsMarkII } from "@/components/sections/SkillsMarkII";
import { ProjectsMarkV } from "@/components/sections/ProjectsMarkV";
import { ExperienceMarkVII } from "@/components/sections/ExperienceMarkVII";
import { EducationHulkbuster } from "@/components/sections/EducationHulkbuster";
import { BlogsMarkXLII } from "@/components/sections/BlogsMarkXLII";
import { GokuBotMarkL } from "@/components/sections/GokuBotMarkL";
import { ContactMarkLXXXV } from "@/components/sections/ContactMarkLXXXV";

import { suitThemes } from "@/data/suitThemes";

export function ArmourEvolutionPortfolio() {
  const handleRestart = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Concise non-blocking boot sequence — 1.5s max */}
      <BootSequence />

      {/* One continuous page — 9 armour generation stages */}
      <div className="relative w-full bg-[#020305] text-[#F4FDFF] overflow-hidden">

        {/* Restrained workshop atmosphere layers */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Ambient red directional light — upper left */}
          <div className="absolute top-0 left-0 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_top_left,rgba(143,16,21,0.18),transparent_60%)]" />
          {/* Ambient gold base glow */}
          <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(214,164,59,0.12),transparent_65%)]" />
        </div>

        {/* ═══════════════════════════════════
            GEN 01 — MARK III — IDENTITY SYSTEM
            Hero is always immediately active.
            No button required to unlock theme.
            ═══════════════════════════════════ */}
        <section
          id="hero"
          className="relative z-10 w-full min-h-screen px-4 sm:px-8 lg:px-16 flex flex-col justify-center overflow-hidden"
        >
          {/* Suit generation badge */}
          <div className="absolute top-6 left-6 sm:left-12 flex items-center gap-2 pointer-events-none">
            <span className="px-3 py-1 bg-red-600/80 text-white font-mono text-[10px] font-bold uppercase tracking-widest shadow">
              {suitThemes["mark-3"].generationLabel}
            </span>
          </div>

          <div className="max-w-7xl mx-auto w-full">
            <HeroMarkIII />
          </div>
        </section>

        {/* ═══════════════════════════════════
            GEN 02 — MARK I — FOUNDATION SYSTEM
            ═══════════════════════════════════ */}
        <ArmourScrollEngine suitTheme={suitThemes["mark-1"]} id="about">
          <AboutMarkI />
        </ArmourScrollEngine>

        {/* ═══════════════════════════════════
            GEN 03 — MARK II — REFINEMENT SYSTEM
            ═══════════════════════════════════ */}
        <ArmourScrollEngine suitTheme={suitThemes["mark-2"]} id="skills">
          <SkillsMarkII />
        </ArmourScrollEngine>

        {/* ═══════════════════════════════════
            GEN 04 — MARK V — DEPLOYMENT SYSTEM
            ═══════════════════════════════════ */}
        <ArmourScrollEngine suitTheme={suitThemes["mark-5"]} id="projects">
          <ProjectsMarkV />
        </ArmourScrollEngine>

        {/* ═══════════════════════════════════
            GEN 05 — MARK VII — MISSION SYSTEM
            ═══════════════════════════════════ */}
        <ArmourScrollEngine suitTheme={suitThemes["mark-7"]} id="journey">
          <ExperienceMarkVII />
        </ArmourScrollEngine>

        {/* ═══════════════════════════════════
            GEN 06 — HULKBUSTER — IMPACT SYSTEM
            ═══════════════════════════════════ */}
        <ArmourScrollEngine suitTheme={suitThemes["hulkbuster"]} id="achievements">
          <EducationHulkbuster />
        </ArmourScrollEngine>

        {/* ═══════════════════════════════════
            GEN 07 — MARK XLII — ANALYTICAL SYSTEM
            ═══════════════════════════════════ */}
        <ArmourScrollEngine suitTheme={suitThemes["mark-42"]} id="blogs">
          <BlogsMarkXLII />
        </ArmourScrollEngine>

        {/* ═══════════════════════════════════
            GEN 08 — MARK L — NANOTECH SYSTEM
            ═══════════════════════════════════ */}
        <ArmourScrollEngine suitTheme={suitThemes["mark-50"]} id="gokubot">
          <GokuBotMarkL />
        </ArmourScrollEngine>

        {/* ═══════════════════════════════════
            GEN 09 — MARK LXXXV — CONVERGENCE SYSTEM
            Final armour — contact, footer, restart
            ═══════════════════════════════════ */}
        <ArmourScrollEngine suitTheme={suitThemes["mark-85"]} id="contact">
          <ContactMarkLXXXV onRestart={handleRestart} />
        </ArmourScrollEngine>

      </div>
    </>
  );
}
