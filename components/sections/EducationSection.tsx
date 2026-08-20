"use client";

import { useArmourTheme } from "@/components/context/ArmourThemeProvider";
import { education, certifications, achievements } from "@/data/portfolio";
import { ShieldCheck, Award } from "lucide-react";

export function EducationSection() {
  const { activeSuit } = useArmourTheme();

  return (
    <section id="achievements" className="relative w-full py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-8 pb-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 font-mono text-xs font-bold rounded uppercase tracking-wider text-slate-950 shadow"
              style={{ backgroundColor: activeSuit.energyColor }}
            >
              IMPACT // EDUCATION
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider">
              EDUCATION & VERIFIED CREDENTIALS
            </h2>
          </div>

          <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest">
            {"THEME: " + activeSuit.markNumber}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Education Records */}
          <div className="lg:col-span-7">
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest block mb-4">
              {"// ACADEMIC INSTITUTIONS"}
            </span>

            <div className="space-y-4">
              {education.map((edu) => (
                <div
                  key={edu.institution}
                  className="armour-plate-surface rounded-xl p-5 border transition-all duration-300 shadow-xl"
                  style={{ borderColor: activeSuit.secondaryColor }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={16} className="text-amber-400 shrink-0" />
                    <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${
                      edu.status === "Ongoing"
                        ? "bg-red-600/90 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}>
                      {edu.status}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight mb-1">
                    {edu.institution}
                  </h3>
                  <p className="text-amber-300 text-sm font-medium mb-1">{edu.qualification}</p>
                  <p className="font-mono text-xs text-slate-400">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest block mb-3">
                {"// VERIFIED CREDENTIALS"}
              </span>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="flex items-start gap-3 p-3.5 bg-slate-950/90 border border-slate-800 rounded-xl hover:border-amber-500/40 transition-colors"
                  >
                    <ShieldCheck size={16} className="text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-display font-bold text-sm text-white">{cert.name}</p>
                      <p className="font-mono text-[10px] text-slate-400">{cert.issuer}{cert.date ? ` · ${cert.date}` : ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest block mb-3">
                {"// RECOGNITION & HACKATHONS"}
              </span>
              <div className="space-y-2">
                {achievements.map((ach) => (
                  <div
                    key={ach.title}
                    className="p-3.5 bg-slate-950/90 border border-slate-800 rounded-xl hover:border-red-500/40 transition-colors"
                  >
                    <p className="font-display font-bold text-sm text-white mb-1">{ach.title}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{ach.description}</p>
                    {ach.date && (
                      <p className="font-mono text-[10px] text-amber-500 mt-1">{ach.date}</p>
                    )}
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
