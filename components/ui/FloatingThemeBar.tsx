"use client";

import { useEffect, useState } from "react";
import { useArmourTheme } from "@/components/context/ArmourThemeProvider";
import { Shield } from "lucide-react";

export function FloatingThemeBar() {
  const { activeSuit, setIsArmouryOpen } = useArmourTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show control once scrolled past 400px (outside Hero)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Armour Theme Controller"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-2.5 sm:px-4 sm:py-2.5 bg-slate-950/90 border border-slate-700/80 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 animate-fade-in"
    >
      {/* Mini Arc Reactor Core */}
      <div className="relative flex items-center justify-center">
        <span
          className="w-3 h-3 rounded-full animate-ping"
          style={{ backgroundColor: activeSuit.energyColor }}
        />
        <span
          className="w-3 h-3 rounded-full absolute"
          style={{ backgroundColor: activeSuit.energyColor }}
        />
      </div>

      <div className="hidden sm:flex flex-col">
        <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-widest leading-none">
          ACTIVE THEME
        </span>
        <span className="font-display font-bold text-xs text-white uppercase tracking-wider">
          {activeSuit.markNumber} — {activeSuit.name}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setIsArmouryOpen(true)}
        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-mono text-[10px] font-bold uppercase tracking-widest rounded-full transition shadow-[0_0_12px_rgba(209,26,34,0.4)] flex items-center gap-1.5 focus-ring"
      >
        <Shield size={12} /> <span>ARMOURY</span>
      </button>
    </aside>
  );
}
