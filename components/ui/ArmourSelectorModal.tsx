"use client";

import { useEffect, useRef } from "react";
import { useArmourTheme } from "@/components/context/ArmourThemeProvider";
import { suitCollection, SuitConfig } from "@/data/suitThemes";
import { X, CheckCircle, Shield, Zap } from "lucide-react";

export function ArmourSelectorModal() {
  const { activeSuit, suitId, setSuitId, isArmouryOpen, setIsArmouryOpen } =
    useArmourTheme();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsArmouryOpen(false);
      }
    };
    if (isArmouryOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isArmouryOpen, setIsArmouryOpen]);

  if (!isArmouryOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="armoury-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl bg-[#090C12] border-2 border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden my-auto"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
        }}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-600/20 border border-red-500/40 rounded text-red-400">
              <Shield size={22} />
            </div>
            <div>
              <h2
                id="armoury-modal-title"
                className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight"
              >
                KJ ARMOURY LAB // SUIT SELECTOR
              </h2>
              <p className="font-mono text-xs text-amber-400 tracking-wider uppercase">
                Select an Armour Generation to Transform the Entire Portfolio Experience
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsArmouryOpen(false)}
            className="p-2.5 bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-red-500 rounded transition focus-ring"
            aria-label="Close Armoury Lab"
          >
            <X size={20} />
          </button>
        </div>

        {/* 10 Suit Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {suitCollection.map((suit: SuitConfig) => {
            const isSelected = suit.id === suitId;
            return (
              <button
                key={suit.id}
                type="button"
                onClick={() => {
                  setSuitId(suit.id);
                  setIsArmouryOpen(false);
                }}
                className={`text-left p-4 rounded-xl border transition-all duration-300 relative group focus-ring ${
                  isSelected
                    ? "bg-slate-900/95 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-[1.02]"
                    : "bg-slate-950/80 border-slate-800 hover:border-slate-600 hover:bg-slate-900"
                }`}
              >
                {/* Selection Status Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-mono text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider text-slate-950"
                    style={{ backgroundColor: suit.energyColor }}
                  >
                    {suit.markNumber}
                  </span>
                  {isSelected ? (
                    <span className="flex items-center gap-1 font-mono text-[10px] text-amber-400 font-bold uppercase">
                      <CheckCircle size={14} /> ACTIVE THEME
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] text-slate-500 uppercase group-hover:text-slate-300 transition">
                      CLICK TO DEPLOY
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight mb-1">
                  {suit.name}
                </h3>
                <p className="text-slate-300 text-xs mb-3 font-sans leading-relaxed">
                  {suit.tagline}
                </p>

                {/* Tech Specifications */}
                <div className="space-y-1 font-mono text-[10px] text-slate-400 border-t border-slate-800/80 pt-2">
                  <div className="flex justify-between">
                    <span>MATERIAL:</span>
                    <span className="text-slate-200">{suit.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>REACTOR:</span>
                    <span className="text-cyan-400">{suit.reactorType}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-amber-400" />
            <span>CURRENTLY ACTIVE: {activeSuit.label}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setSuitId("mark-3");
              setIsArmouryOpen(false);
            }}
            className="px-4 py-2 bg-slate-900 border border-slate-700 text-amber-400 hover:border-amber-500 rounded font-bold uppercase tracking-wider transition focus-ring"
          >
            RESET TO MARK III (DEFAULT)
          </button>
        </div>
      </div>
    </div>
  );
}
