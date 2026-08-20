"use client";

import { skillCategories } from "@/data/portfolio";

const subsystemIcon: Record<string, string> = {
  "Programming": "⬡",
  "Frontend Development": "◈",
  "Backend and Databases": "⬟",
  "AI and Data": "◉",
  "Tools and Platforms": "⬢",
  "Core Computer Science": "◇",
  "Communication and Documentation": "◈",
};

export function SkillsMarkII() {
  return (
    <div className="relative w-full py-8">
      {/* Blueprint overlay grid */}
      <div className="absolute inset-0 pointer-events-none carbon-grid-bg opacity-40" />

      <div className="relative z-10">
        {/* Diagnostic scan header */}
        <div className="mb-8 pb-3 border-b border-cyan-400/30 flex items-center justify-between">
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest">
            {"// MARK II SUBSYSTEM DIAGNOSTIC — ALL SYSTEMS NOMINAL"}
          </span>
          <span className="hidden sm:inline font-mono text-xs text-slate-500">7 SYSTEMS LOADED</span>
        </div>

        {/* Subsystem Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="relative bg-[#0D1117] border border-slate-700/60 p-5 rounded-none
                         clip-path-[polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,0_100%)]
                         hover:border-cyan-400/40 hover:bg-[#111827] transition-colors duration-300"
              style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)" }}
            >
              {/* Cut corner accent */}
              <div
                className="absolute top-0 right-0 w-4 h-4 bg-cyan-400/40"
                style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
              />

              <div className="flex items-center gap-2 mb-3">
                <span className="text-cyan-400 text-lg leading-none">{subsystemIcon[cat.title] ?? "◆"}</span>
                <h3 className="font-display font-bold text-base text-white uppercase tracking-wide">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-slate-900 border border-slate-700/80 text-slate-300 font-mono text-[11px] rounded-sm hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-3 h-px bg-gradient-to-r from-cyan-400/30 via-cyan-400/60 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
