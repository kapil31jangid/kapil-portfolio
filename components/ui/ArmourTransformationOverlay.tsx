"use client";

import { useArmourTheme } from "@/components/context/ArmourThemeProvider";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export function ArmourTransformationOverlay() {
  const { isTransforming, activeSuit } = useArmourTheme();
  const shouldReduceMotion = useReducedMotion();

  if (!isTransforming) return null;

  if (shouldReduceMotion) {
    return (
      <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm pointer-events-auto" />
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[110] bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
      >
        {/* Top Armour Plate Slide In */}
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#11151B] to-[#05070A] border-b-4 border-amber-400 shadow-2xl flex items-end justify-center pb-6"
        >
          <span className="font-mono text-xs font-bold text-amber-400 tracking-widest">
            {"// ARMOUR DECONSTRUCTION IN PROGRESS"}
          </span>
        </motion.div>

        {/* Bottom Armour Plate Slide In */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#11151B] to-[#05070A] border-t-4 border-amber-400 shadow-2xl flex items-start justify-center pt-6"
        >
          <span className="font-mono text-xs font-bold text-amber-400 tracking-widest">
            {"// ASSEMBLING " + activeSuit.label}
          </span>
        </motion.div>

        {/* Center Reactor Core Assembly */}
        <div className="relative z-20 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.5, rotate: 0 }}
            animate={{ scale: 1.15, rotate: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-40 h-40 rounded-full border-4 border-dashed border-cyan-400 flex items-center justify-center shadow-[0_0_50px_rgba(56,189,248,0.8)]"
          >
            <div className="w-24 h-24 rounded-full border-2 border-amber-400 flex items-center justify-center bg-cyan-400/20">
              <div className="w-12 h-12 rounded-full bg-white shadow-[0_0_35px_#ffffff]" />
            </div>
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-sm font-bold text-white tracking-widest mt-6 uppercase flex items-center gap-2"
          >
            <ShieldCheck size={18} className="text-amber-400" />
            RECONFIGURING WEBSITE THEME TO {activeSuit.name}
          </motion.span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
