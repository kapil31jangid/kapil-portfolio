"use client";

import { achievements, certifications } from "@/data/portfolio";
import { Award, BadgeCheck, ShieldCheck } from "lucide-react";

export function AchievementsVictories() {
  return (
    <section id="achievements" className="storm-section env-lightning-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-20">
        {/* Section Header */}
        <div className="mb-14">
          <span className="section-label text-indigo-700">{"// SECTION 04 — HALL OF VICTORIES"}</span>
          <h2 className="title-oversized text-slate-950">HALL OF VICTORIES</h2>
          <p className="text-slate-700 font-mono text-sm uppercase tracking-wider mt-2">
            Verified Achievements, Certifications & Professional Credentials
          </p>
        </div>

        {/* Highlighted Gold Accent Card — IEEE Active Membership */}
        <div className="bg-amber-500/10 border-2 border-amber-500/60 rounded-xl p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-amber-500 text-slate-950 rounded-xl font-bold">
              <ShieldCheck size={32} />
            </div>
            <div>
              <span className="font-mono text-xs uppercase font-bold text-amber-800">
                ACTIVE PROFESSIONAL MEMBERSHIP
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-slate-950">
                IEEE Student Member
              </h3>
              <p className="text-slate-700 text-sm mt-1 max-w-2xl font-sans">
                Recognised as an IEEE Student Member in good standing, reflecting commitment to advancing technology through professional community participation.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <span className="px-3.5 py-1.5 bg-amber-500 text-slate-950 font-mono text-xs font-bold rounded uppercase tracking-wider shadow">
              Valid through Dec 2026
            </span>
            <span className="text-xs font-mono text-amber-900 mt-2 font-semibold">
              Issuer: IEEE
            </span>
          </div>
        </div>

        {/* Dual Column Layout: Achievements & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Column 1: Verified Achievements */}
          <div>
            <div className="flex items-center gap-2.5 mb-6 border-b border-slate-300 pb-3">
              <Award className="text-amber-600" size={22} />
              <h3 className="font-display text-2xl font-bold text-slate-950 uppercase">
                Verified Milestones
              </h3>
            </div>

            <div className="space-y-4">
              {achievements.map((item, idx) => (
                <div
                  key={item.title}
                  className="bg-white border border-slate-300 rounded-lg p-5 shadow-sm hover:border-amber-500 transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs font-bold text-indigo-700">
                      MILESTONE 0{idx + 1}
                    </span>
                    {item.date && (
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                        {item.date}
                      </span>
                    )}
                  </div>
                  <h4 className="font-display text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Certifications */}
          <div>
            <div className="flex items-center gap-2.5 mb-6 border-b border-slate-300 pb-3">
              <BadgeCheck className="text-indigo-600" size={22} />
              <h3 className="font-display text-2xl font-bold text-slate-950 uppercase">
                Certifications & Programs
              </h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, idx) => (
                <div
                  key={cert.name}
                  className="bg-white border border-slate-300 rounded-lg p-5 shadow-sm hover:border-indigo-500 transition"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      CREDENTIAL 0{idx + 1}
                    </span>
                    <span className="font-mono text-xs font-bold text-indigo-600">
                      {cert.issuer}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-slate-900 mb-2">
                    {cert.name}
                  </h4>
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {cert.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono rounded border border-slate-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
