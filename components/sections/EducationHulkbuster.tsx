"use client";

import { education, certifications, achievements } from "@/data/portfolio";
import { ShieldCheck, Award } from "lucide-react";

export function EducationHulkbuster() {
  return (
    <div className="relative w-full py-8">
      {/* Heavy frame structure — top & bottom hydraulic rails */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-red-800 via-amber-600 to-red-800 opacity-70 rounded" />
      <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-r from-red-800 via-amber-600 to-red-800 opacity-70 rounded" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 pb-4">
        {/* Education — Large Plate Panels */}
        <div className="lg:col-span-7">
          <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest block mb-4">
            {"// EDUCATION SYSTEMS — HULKBUSTER PLATE RECORDS"}
          </span>

          <div className="space-y-4">
            {education.map((edu) => (
              <div
                key={edu.institution}
                className="relative bg-[#0F1520] border-2 border-red-700/50 p-5 hover:border-amber-500/60 transition-colors duration-300 shadow-xl"
                style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}
              >
                {/* Cut corners */}
                <div className="absolute top-0 right-0 w-5 h-5 bg-amber-600/50"
                  style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                />
                <div className="absolute bottom-0 left-0 w-5 h-5 bg-amber-600/50"
                  style={{ clipPath: "polygon(0 100%, 0 0, 100% 100%)" }}
                />

                <div className="flex items-center gap-2 mb-2">
                  <Award size={16} className="text-amber-400 shrink-0" />
                  <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${
                    edu.status === "Ongoing"
                      ? "bg-red-600/80 text-white"
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

        {/* Certifications & Achievements — Hydraulic Lock Modules */}
        <div className="lg:col-span-5 space-y-6">
          {/* Certifications */}
          <div>
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest block mb-3">
              {"// VERIFIED CREDENTIALS"}
            </span>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-start gap-3 p-3 bg-slate-950/90 border border-slate-700/70 hover:border-amber-500/40 transition-colors"
                  style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}
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

          {/* Achievements */}
          <div>
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest block mb-3">
              {"// MISSION ACHIEVEMENTS"}
            </span>
            <div className="space-y-2">
              {achievements.map((ach) => (
                <div
                  key={ach.title}
                  className="p-3 bg-red-900/20 border border-red-700/40 hover:border-red-500/50 transition-colors"
                  style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}
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
  );
}
