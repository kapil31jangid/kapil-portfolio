"use client";

import { education, experience } from "@/data/portfolio";
import { Briefcase, GraduationCap } from "lucide-react";

export function ChroniclesTimeline() {
  return (
    <section id="journey" className="storm-section env-midnight-navy py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-20">
        {/* Section Header */}
        <div className="mb-16">
          <span className="section-label text-blue-400">{"// SECTION 07 — CHRONICLES TIMELINE"}</span>
          <h2 className="title-oversized text-white">CHRONICLES TIMELINE</h2>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-wider mt-2">
            Central Lightning-Conductor — Experience, Education & Leadership
          </p>
        </div>

        {/* Central Lightning Conductor Path */}
        <div className="relative border-l-2 border-blue-500/50 ml-4 md:ml-32 space-y-12 pl-6 md:pl-10">
          {/* Experience Section Header */}
          <div className="mb-8">
            <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-widest bg-slate-900 px-3.5 py-1.5 border border-blue-500/40 rounded inline-flex items-center gap-2 shadow-[0_0_15px_rgba(47,140,255,0.2)]">
              <Briefcase size={14} /> COMMUNITY & LEADERSHIP EXPERIENCE
            </span>
          </div>

          {experience.map((exp) => (
            <div key={exp.organisation} className="relative group">
              {/* Junction Conductor Marker */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-slate-950 border-2 border-blue-400 group-hover:bg-blue-400 transition shadow-[0_0_12px_#2F8CFF]" />

              <div className="gunmetal-surface engraved-border rounded-xl p-6 hover:border-blue-400 transition">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-blue-400">
                    {exp.start} — {exp.end}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {exp.location}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  {exp.role}
                </h3>
                <h4 className="font-mono text-sm text-blue-300 font-medium mb-3">
                  {exp.organisation}
                </h4>

                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 font-sans mb-4">
                  {exp.responsibilities.map((resp) => (
                    <li key={resp} className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 bg-slate-900 text-slate-300 text-[10px] font-mono rounded border border-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Academic Degrees Header */}
          <div className="pt-8 mb-8">
            <span className="font-mono text-xs font-bold text-indigo-300 uppercase tracking-widest bg-slate-900 px-3.5 py-1.5 border border-indigo-500/40 rounded inline-flex items-center gap-2 shadow-[0_0_15px_rgba(79,70,186,0.2)]">
              <GraduationCap size={14} /> ACADEMIC DEGREES
            </span>
          </div>

          {education.map((edu) => (
            <div key={edu.institution} className="relative group">
              {/* Junction Conductor Marker */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-slate-950 border-2 border-indigo-400 group-hover:bg-indigo-400 transition shadow-[0_0_12px_#4F46B8]" />

              <div className="gunmetal-surface engraved-border rounded-xl p-6 hover:border-indigo-400 transition">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-mono text-xs font-bold text-indigo-400">
                    {edu.period}
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded border border-indigo-800">
                    {edu.status}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  {edu.institution}
                </h3>
                <p className="font-sans text-sm text-slate-300">
                  {edu.qualification}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
