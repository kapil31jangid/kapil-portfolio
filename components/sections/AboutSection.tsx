"use client";

import { useArmourTheme } from "@/components/context/ArmourThemeProvider";
import { GraduationCap, Award, ShieldCheck, Download } from "lucide-react";
import { siteConfig } from "@/data/portfolio";

export function AboutSection() {
  const { activeSuit } = useArmourTheme();

  return (
    <section id="about" className="relative w-full py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Label */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 font-mono text-xs font-bold rounded uppercase tracking-wider text-slate-950 shadow"
              style={{ backgroundColor: activeSuit.energyColor }}
            >
              DOSSIER // ABOUT
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider">
              WORKSHOP DOSSIER & FOUNDATION
            </h2>
          </div>

          <span className="hidden sm:inline font-mono text-xs text-slate-400 uppercase tracking-widest">
            THEME: {activeSuit.markNumber} — {activeSuit.material}
          </span>
        </div>

        {/* Dossier Card Surface adaptively styled by activeSuit */}
        <div
          className="armour-plate-surface rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-500"
          style={{ borderColor: activeSuit.secondaryColor }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Main Statement Column */}
            <div className="lg:col-span-8 flex flex-col items-start">
              <span className="font-mono text-xs font-bold uppercase tracking-widest block mb-2 text-amber-400">
                {"// VERIFIED FOUNDATION RECORD"}
              </span>

              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 uppercase tracking-tight">
                Bridging Computer Science & Data Science Infrastructure
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans mb-6">
                Pursuing a Bachelor of Technology in Computer Science and Engineering at Silver Oak University alongside a Bachelor of Science in Data Science and Applications at the Indian Institute of Technology Madras. My engineering practice combines full-stack architecture with Artificial Intelligence to build scalable, production-grade applications.
              </p>

              {/* Dual Degree Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-6">
                <div className="p-4 bg-slate-950/90 border border-slate-700/80 rounded-lg">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold mb-1">
                    <GraduationCap size={16} /> SILVER OAK UNIVERSITY
                  </div>
                  <h4 className="font-display font-bold text-white text-base">B.Tech Computer Science</h4>
                  <span className="text-slate-400 text-xs font-mono">2025 – 2029 · Ongoing</span>
                </div>

                <div className="p-4 bg-slate-950/90 border border-slate-700/80 rounded-lg">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold mb-1">
                    <Award size={16} /> IIT MADRAS
                  </div>
                  <h4 className="font-display font-bold text-white text-base">B.S. Data Science & Applications</h4>
                  <span className="text-slate-400 text-xs font-mono">Started 2025 · Ongoing</span>
                </div>
              </div>

              <a
                href={siteConfig.resumePath}
                download
                className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-white transition text-xs font-mono font-bold uppercase tracking-wider rounded-lg shadow-lg focus-ring"
              >
                <Download size={15} /> Download Full Dossier (PDF)
              </a>
            </div>

            {/* Engineering Specs Column */}
            <div className="lg:col-span-4 p-6 bg-slate-950/90 border border-slate-800 rounded-xl flex flex-col justify-between h-full">
              <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider mb-4 block">
                {"// ACTIVE THEME MATERIAL SPECS"}
              </span>

              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-400">MATERIAL:</span>
                  <span className="text-white font-bold">{activeSuit.material}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-400">REACTOR:</span>
                  <span className="text-cyan-400 font-bold">{activeSuit.reactorType}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                  <ShieldCheck size={14} className="text-amber-400" />
                  <span>Dual Degree Scholar</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                  <ShieldCheck size={14} className="text-amber-400" />
                  <span>Generative AI & RAG</span>
                </div>
              </div>

              <span className="text-[10px] font-mono text-slate-500 mt-6 block">
                {"SPECIFICATIONS // VERIFIED"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
