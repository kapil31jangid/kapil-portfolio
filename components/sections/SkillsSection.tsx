"use client";

import { useArmourTheme } from "@/components/context/ArmourThemeProvider";
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

export function SkillsSection() {
  const { activeSuit } = useArmourTheme();

  return (
    <section id="skills" className="relative w-full py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-8 pb-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 font-mono text-xs font-bold rounded uppercase tracking-wider text-slate-950 shadow"
              style={{ backgroundColor: activeSuit.energyColor }}
            >
              SUBSYSTEMS // SKILLS
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider">
              TECHNICAL CAPABILITIES & SUBSYSTEMS
            </h2>
          </div>

          <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest">
            {"// " + activeSuit.markNumber + " DIAGNOSTIC — ALL SYSTEMS NOMINAL"}
          </span>
        </div>

        {/* Skill Subsystems Grid adaptively styled by activeSuit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="relative bg-[#0D1117] border p-5 rounded-xl transition-all duration-300 shadow-xl"
              style={{ borderColor: activeSuit.secondaryColor }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg leading-none" style={{ color: activeSuit.energyColor }}>
                  {subsystemIcon[cat.title] ?? "◆"}
                </span>
                <h3 className="font-display font-bold text-base text-white uppercase tracking-wide">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-slate-900 border border-slate-700/80 text-slate-300 font-mono text-[11px] rounded-sm hover:border-amber-400 hover:text-amber-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div
                className="mt-4 h-0.5 w-full rounded"
                style={{ backgroundColor: activeSuit.primaryColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
