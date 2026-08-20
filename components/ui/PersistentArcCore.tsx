"use client";

import { motion } from "framer-motion";
import { SuitTheme } from "@/data/suitThemes";

interface PersistentArcCoreProps {
  currentTheme: SuitTheme;
  intensity?: number;
}

export function PersistentArcCore({ currentTheme, intensity = 1 }: PersistentArcCoreProps) {
  return (
    <div className="relative flex items-center justify-center pointer-events-none">
      {/* Outer Segmented Mechanical Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border-2 border-dashed flex items-center justify-center transition-colors duration-700"
        style={{ borderColor: currentTheme.secondaryMetal }}
      >
        {/* Inner Reactor Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border-2 border-solid flex items-center justify-center transition-colors duration-700"
          style={{ borderColor: currentTheme.primaryMetal }}
        >
          {/* Luminous Reactor Core Chamber */}
          <div
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 flex items-center justify-center transition-all duration-700 arc-core-glow"
            style={{
              borderColor: currentTheme.accentEnergy,
              backgroundColor: "rgba(127, 239, 255, 0.15)",
              boxShadow: `0 0 ${40 * intensity}px ${currentTheme.glowColour}`,
            }}
          >
            {/* White-Hot Center Emission */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white shadow-[0_0_35px_#ffffff]" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
