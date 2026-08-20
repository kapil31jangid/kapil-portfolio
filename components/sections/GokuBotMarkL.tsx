"use client";

import { GokuBot } from "@/components/assistant/GokuBot";
import { assistantKnowledge } from "@/data/portfolio";
import { Sparkles } from "lucide-react";

export function GokuBotMarkL() {
  return (
    <div className="relative w-full py-8">
      {/* Nanotech particle suggestion trail — restrained decorative paths */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d="M 0 50% Q 20% 30%, 50% 50% T 100% 50%" fill="none" stroke="rgba(127,239,255,0.08)" strokeWidth="2" />
          <path d="M 0 70% Q 25% 55%, 50% 70% T 100% 70%" fill="none" stroke="rgba(209,26,34,0.07)" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left — Mark L Nanotech Interface Description */}
        <div className="lg:col-span-4 flex flex-col justify-start">
          <div className="bg-[#0B0F19] border border-cyan-400/25 p-6 mb-4"
            style={{ clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-cyan-400" />
              <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
                MARK L NANOTECH AI
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              An AI portfolio assistant powered by the KJ knowledge base. Ask about projects, skills, experience, or how to collaborate with Kapil.
            </p>
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">
                Suggested:
              </span>
              {assistantKnowledge.suggestedQuestions.map((q) => (
                <div
                  key={q}
                  className="p-2 bg-slate-900/80 border border-slate-700 text-xs text-slate-300 font-sans rounded-sm"
                >
                  {q}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Accessible Conversational GokuBot Interface */}
        <div className="lg:col-span-8">
          <div
            className="bg-[#0A0D15] border-2 border-red-700/40 overflow-hidden shadow-2xl"
            style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}
          >
            {/* Interface chrome bar */}
            <div className="flex items-center justify-between px-5 py-3 bg-slate-900/90 border-b border-red-700/30">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
              </div>
              <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-widest">
                GOKUBOT // KJ INTELLIGENCE SYSTEM
              </span>
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                MARK L
              </span>
            </div>

            <div className="p-4 sm:p-6">
              <GokuBot />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
