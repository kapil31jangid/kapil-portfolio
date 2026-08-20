"use client";

import { useArmourTheme } from "@/components/context/ArmourThemeProvider";
import { GokuBot } from "@/components/assistant/GokuBot";
import { assistantKnowledge } from "@/data/portfolio";
import { Sparkles } from "lucide-react";

export function GokuBotSection() {
  const { activeSuit } = useArmourTheme();

  return (
    <section id="gokubot" className="relative w-full py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-8 pb-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 font-mono text-xs font-bold rounded uppercase tracking-wider text-slate-950 shadow"
              style={{ backgroundColor: activeSuit.energyColor }}
            >
              INTELLIGENCE // GOKUBOT
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider">
              GOKUBOT AI PORTFOLIO ASSISTANT
            </h2>
          </div>

          <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest">
            {"AI INTEGRATION: " + activeSuit.markNumber}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column — Assistant Context */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <div
              className="armour-plate-surface rounded-2xl p-6 border shadow-xl mb-4 transition-all duration-500"
              style={{ borderColor: activeSuit.secondaryColor }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} style={{ color: activeSuit.energyColor }} />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">
                  PORTFOLIO INTELLIGENCE
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4 font-sans">
                GokuBot is an engineered portfolio assistant trained on Kapil Jangid’s verified background, dual degrees, technical stack, and software projects.
              </p>
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">
                  Suggested Prompts:
                </span>
                {assistantKnowledge.suggestedQuestions.map((q) => (
                  <div
                    key={q}
                    className="p-2.5 bg-slate-900 border border-slate-800 text-xs text-slate-300 font-sans rounded-lg"
                  >
                    {q}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Conversational Gokubot Container */}
          <div className="lg:col-span-8">
            <div
              className="bg-[#0A0D15] border-2 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500"
              style={{ borderColor: activeSuit.primaryColor }}
            >
              {/* Terminal Chrome Bar */}
              <div className="flex items-center justify-between px-5 py-3 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow" />
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow" />
                </div>
                <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">
                  GOKUBOT // KJ INTELLIGENCE CORE
                </span>
                <span className="font-mono text-[10px] text-amber-400 font-bold uppercase">
                  {activeSuit.markNumber}
                </span>
              </div>

              <div className="p-4 sm:p-6">
                <GokuBot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
