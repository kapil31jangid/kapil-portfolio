"use client";

import { useArmourTheme } from "@/components/context/ArmourThemeProvider";
import { experience, leadershipHighlights } from "@/data/portfolio";
import { Target } from "lucide-react";

export function ExperienceSection() {
  const { activeSuit } = useArmourTheme();

  return (
    <section id="journey" className="relative w-full py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-8 pb-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 font-mono text-xs font-bold rounded uppercase tracking-wider text-slate-950 shadow"
              style={{ backgroundColor: activeSuit.energyColor }}
            >
              MISSION ROUTE // EXPERIENCE
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider">
              EXPERIENCE & LEADERSHIP TRAJECTORY
            </h2>
          </div>

          <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest">
            {"THEME: " + activeSuit.markNumber + " FLIGHT ROUTE"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Mission Waypoints Timeline */}
          <div className="lg:col-span-7">
            <div className="relative">
              <div
                className="absolute left-5 top-0 bottom-0 w-0.5"
                style={{ backgroundColor: activeSuit.primaryColor }}
              />

              <div className="space-y-8">
                {experience.map((exp, i) => (
                  <div key={`${exp.organisation}-${i}`} className="relative pl-14 group">
                    <div
                      className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-slate-950 border-2 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                      style={{ borderColor: activeSuit.secondaryColor }}
                    >
                      <Target size={16} style={{ color: activeSuit.energyColor }} />
                    </div>

                    <div
                      className="armour-plate-surface rounded-xl p-5 border transition-all duration-300 shadow-xl"
                      style={{ borderColor: activeSuit.secondaryColor }}
                    >
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                        <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide">
                          {exp.role}
                        </h3>
                        <span
                          className="font-mono text-xs text-slate-950 font-bold px-2.5 py-0.5 rounded uppercase tracking-wider"
                          style={{ backgroundColor: activeSuit.energyColor }}
                        >
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
                            className="px-2 py-0.5 bg-slate-900 border border-slate-700 text-amber-300 font-mono text-[10px] rounded-sm"
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

          {/* Leadership Intelligence Highlights */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest block mb-4">
                {"// LEADERSHIP & COMMUNITY INITIATIVES"}
              </span>

              <div className="space-y-4">
                {leadershipHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="bg-slate-950/90 border border-slate-800 p-4 rounded-xl hover:border-amber-500/50 transition-colors"
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
    </section>
  );
}
