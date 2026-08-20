"use client";

import { experience, leadershipHighlights } from "@/data/portfolio";
import { Target } from "lucide-react";

export function ExperienceMarkVII() {
  return (
    <div className="relative w-full py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Mission Route — Central Timeline */}
        <div className="lg:col-span-7">
          <div className="relative">
            {/* Central trajectory line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-red-600 via-amber-500 to-transparent" />

            <div className="space-y-8">
              {experience.map((exp, i) => (
                <div key={`${exp.organisation}-${i}`} className="relative pl-14 group">
                  {/* Mission waypoint marker */}
                  <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-slate-950 border-2 border-red-600 flex items-center justify-center shadow-[0_0_12px_rgba(209,26,34,0.4)] group-hover:shadow-[0_0_20px_rgba(209,26,34,0.6)] transition-shadow">
                    <Target size={16} className="text-amber-400" />
                  </div>

                  <div
                    className="bg-[#0B0F19] border border-slate-700/60 p-5 hover:border-red-600/40 transition-colors duration-300"
                    style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)" }}
                  >
                    {/* Period badge */}
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide">
                        {exp.role}
                      </h3>
                      <span className="font-mono text-xs text-red-400 font-bold bg-slate-900 px-2 py-0.5 border border-red-600/30">
                        {exp.start} – {exp.end}
                      </span>
                    </div>

                    <p className="font-mono text-xs text-amber-400 font-semibold mb-3 uppercase tracking-wider">
                      {exp.organisation} · {exp.location}
                    </p>

                    <ul className="space-y-1.5 mb-4">
                      {exp.responsibilities.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                          <span className="text-red-500 mt-0.5 shrink-0">▸</span>
                          {r}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 bg-slate-900 border border-amber-500/25 text-amber-300 font-mono text-[10px] rounded-sm"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership Intelligence Column */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest block mb-4">
              {"// MISSION COMMAND HIGHLIGHTS"}
            </span>

            <div className="space-y-4">
              {leadershipHighlights.map((item) => (
                <div
                  key={item.title}
                  className="bg-slate-950/80 border border-slate-800 p-4 hover:border-amber-500/40 transition-colors"
                  style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}
                >
                  <h4 className="font-display font-bold text-sm text-white uppercase tracking-wide mb-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
