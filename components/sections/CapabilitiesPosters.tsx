"use client";

import { skillCategories } from "@/data/portfolio";
import { Cpu, Code2, Database, Terminal, Cloud, FileText } from "lucide-react";

const categoryIcons = [Cpu, Code2, Database, Terminal, Cloud, FileText];

export function CapabilitiesPosters() {
  return (
    <section id="skills" className="storm-section env-midnight-navy py-24 relative overflow-hidden">
      {/* Forged Descent Plate Overlay Boundary */}
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-14">
          <span className="section-label text-blue-400">{"// SECTION 03 — FORGED DESCENT"}</span>
          <h2 className="title-oversized text-white">POWERS & CAPABILITIES</h2>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-wider mt-2">
            Engineered Capability Loadout & Technical Specializations
          </p>
        </div>

        {/* Large Capability Poster Frames */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => {
            const Icon = categoryIcons[idx % categoryIcons.length];
            const numStr = String(idx + 1).padStart(2, "0");

            return (
              <article
                key={category.title}
                className="gunmetal-surface engraved-border rounded-xl p-8 relative flex flex-col justify-between hover:border-blue-400 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(47,140,255,0.2)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-blue-400 tracking-widest">
                      FRAME // {numStr}
                    </span>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg group-hover:bg-blue-500 group-hover:text-slate-950 transition">
                      <Icon size={22} />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 group-hover:text-blue-300 transition">
                    {category.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 my-4">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-slate-900 text-slate-200 text-xs font-mono rounded border border-slate-700/80 group-hover:border-blue-500/40 transition"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-500">
                  <span>POSTER SPEC #{numStr}</span>
                  <span className="text-blue-400 font-bold">VERIFIED</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
