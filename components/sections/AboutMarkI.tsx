"use client";

import { GraduationCap, Award, ShieldCheck, Download } from "lucide-react";
import { siteConfig } from "@/data/portfolio";

export function AboutMarkI() {
  return (
    <div className="relative w-full py-8">
      {/* Heavy Rough Iron Panel Surface with Welding Marks & Rivets */}
      <div className="bg-[#1A202C] border-4 border-[#3A4556] rounded-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative Rivet Bolts in Corners */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-amber-600/80 border border-amber-400 shadow-sm" />
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-amber-600/80 border border-amber-400 shadow-sm" />
        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-amber-600/80 border border-amber-400 shadow-sm" />
        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-amber-600/80 border border-amber-400 shadow-sm" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Engraved Statement Column */}
          <div className="lg:col-span-8 flex flex-col items-start">
            <span className="font-mono text-xs font-bold text-amber-500 uppercase tracking-widest block mb-2">
              {"// FORGED FOUNDATION RECORD"}
            </span>

            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 uppercase tracking-tight">
              Bridging Computer Science & Data Science Infrastructure
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans mb-6">
              Pursuing a Bachelor of Technology in Computer Science and Engineering at Silver Oak University alongside a Bachelor of Science in Data Science and Applications at the Indian Institute of Technology Madras. My engineering practice combines full-stack architecture with Artificial Intelligence to build scalable, production-grade applications.
            </p>

            {/* Dual Degree Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-6">
              <div className="p-4 bg-slate-900/90 border border-amber-600/40 rounded-lg">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold mb-1">
                  <GraduationCap size={16} /> SILVER OAK UNIVERSITY
                </div>
                <h4 className="font-display font-bold text-white text-base">B.Tech Computer Science</h4>
                <span className="text-slate-400 text-xs font-mono">2025 – 2029 · Ongoing</span>
              </div>

              <div className="p-4 bg-slate-900/90 border border-amber-600/40 rounded-lg">
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
              className="inline-flex items-center gap-2 px-5 py-3 bg-amber-600 hover:bg-amber-500 text-slate-950 transition text-xs font-mono font-bold uppercase tracking-wider rounded-lg shadow-lg"
            >
              <Download size={15} /> Download Full Mark I Dossier
            </a>
          </div>

          {/* Rough Iron Engineering Diagram Overlay */}
          <div className="lg:col-span-4 p-6 bg-slate-950/80 border border-slate-700 rounded-lg flex flex-col justify-between h-full">
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider mb-4 block">
              {"// FORGED CAPABILITIES"}
            </span>

            <div className="space-y-3 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800">
                <ShieldCheck size={14} className="text-amber-400" />
                <span>Dual Degree Scholar</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800">
                <ShieldCheck size={14} className="text-amber-400" />
                <span>Generative AI & RAG</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800">
                <ShieldCheck size={14} className="text-amber-400" />
                <span>FastAPI & Supabase/Neon</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800">
                <ShieldCheck size={14} className="text-amber-400" />
                <span>IEEE SIGHT Leadership</span>
              </div>
            </div>

            <span className="text-[10px] font-mono text-slate-500 mt-6 block">
              MARK I SCHEMA // VERIFIED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
